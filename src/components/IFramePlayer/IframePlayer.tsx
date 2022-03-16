import { useCallback, useContext, useEffect, useRef } from 'react'
import { IPlayerEvent, PlayerContext } from '../Player/PlayerContext'

const IFramePlayer = (): JSX.Element => {
  const playerContainer = useRef<HTMLDivElement | null>(null)
  const playerContext = useContext(PlayerContext)
  const { videoInstance, videoId, updateVideoInstance, updateVideoInfo } =
    playerContext

  const onIframeMessageEvent = useCallback(
    (event: MessageEvent) => {
      if (
        typeof event.data === 'string' &&
        !event.data.startsWith('webpackHotUpdate')
      ) {
        const tmpVideoEvent: IPlayerEvent = JSON.parse(event.data)

        if (tmpVideoEvent && tmpVideoEvent.info) {
          const {
            videoData,
            playerState,
            currentTime,
            duration,
            volume,
            muted,
          } = tmpVideoEvent.info

          if (updateVideoInfo) {
            updateVideoInfo(
              videoData?.video_id,
              videoData?.title,
              playerState,
              currentTime,
              duration,
              volume,
              muted
            )
          }
        }
      }
    },
    [updateVideoInfo]
  )

  const onIframeApiReady = useCallback(() => {
    if (updateVideoInstance && playerContainer.current) {
      updateVideoInstance(playerContainer.current)
    }

    window.addEventListener('message', onIframeMessageEvent)
  }, [onIframeMessageEvent, updateVideoInstance])

  useEffect(() => {
    if (!window.YT) {
      const script = document.createElement('script')
      script.src = 'https://www.youtube.com/iframe_api'
      script.async = true
      document.body.appendChild(script)
    }

    window.onYouTubeIframeAPIReady = onIframeApiReady
  }, [onIframeApiReady])

  useEffect(() => {
    if (videoInstance && videoId)
      videoInstance?.loadVideoById(videoId?.toString())
  }, [videoId, videoInstance])

  return <div ref={playerContainer}></div>
}

export default IFramePlayer
