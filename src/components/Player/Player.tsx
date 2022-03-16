import { useEffect, useState } from 'react'
import IFramePlayer from '../IFramePlayer'
import PlayerPanel from '../PlayerPanel'
import PopularList from '../PopularList'
import { PlayerContext } from './PlayerContext'

const Player = (): JSX.Element => {
  const [videoInstance, setVideoInstance] = useState<YT.Player | undefined>()
  const [videoId, setVideoId] = useState<string | undefined>()
  const [videoName, setVideoName] = useState<string | undefined>()
  const [status, setStatus] = useState<YT.PlayerState | undefined>()
  const [currentTime, setCurrentTime] = useState<number | undefined>()
  const [duration, setDuration] = useState<number | undefined>()
  const [volumn, setVolumn] = useState<number | undefined>()
  const [muted, setMuted] = useState<boolean | undefined>()

  useEffect(() => {
    return () => {
      if (videoInstance) {
        videoInstance.destroy()
      }
    }
  }, [videoInstance])

  const updateVideoInfo = (
    tmpVideoId?: string,
    tmpVideoName?: string,
    tmpStatus?: YT.PlayerState,
    tmpCurrentTime?: number,
    tmpDuration?: number,
    tmpVolumn?: number,
    tmpMuted?: boolean
  ): void => {
    if (tmpVideoId !== undefined) setVideoId(() => tmpVideoId)
    if (tmpVideoName !== undefined) setVideoName(() => tmpVideoName)
    if (tmpStatus !== undefined) setStatus(() => tmpStatus)
    if (tmpCurrentTime !== undefined) setCurrentTime(() => tmpCurrentTime)
    if (tmpDuration !== undefined) setDuration(() => tmpDuration)
    if (tmpVolumn !== undefined) setVolumn(() => tmpVolumn)
    if (tmpMuted !== undefined) setMuted(() => tmpMuted)
  }

  const updateVideoInstance = (tmpContainer?: HTMLDivElement): void => {
    if (tmpContainer) {
      const tmpPlayerOption: YT.PlayerOptions = {
        width: 640,
        height: 480,
        videoId: 'Il0S8BoucSA',
        playerVars: {
          autohide: 1, // 1 = YT.AutoHide.HideAllControls
          // autoplay: 1, // 1 = YT.AutoPlay.AutoPlay,
          cc_load_policy: 1, // 1 = YT.ClosedCaptionsLoadPolicy.ForceOn,
          cc_lang_pref: 'zh',
          // color: undefined,
          controls: 0, // 0 = YT.Controls.Hide,
          disablekb: 1, // 1 = YT.KeyboardControls.Disable,
          enablejsapi: 1, // 1 = YT.JsApi.Enable,
          // end: undefined,
          fs: 0, // 0 = YT.FullscreenButton.Hide,
          hl: 'zh',
          iv_load_policy: 3, // 3 = YT.IvLoadPolicy.Hide,
          // list: undefined,
          // listType: undefined,
          loop: 0, // 0 = YT.Loop.SinglePlay,
          modestbranding: 1, // 1 = YT.ModestBranding.Modest,
          mute: 0, // 0 = YT.Mute.NotMuted, 1 = YT.Mute.Muted
          // origin: window.location.hostname,
          // playlist: undefined,
          playsinline: 1, // 1 = YT.PlaysInline.Inline,
          rel: 0, // 0 = YT.RelatedVideos.Hide,
          showinfo: 0, // 0 = YT.ShowInfo.Hide,
          // start: undefined,
        } as YT.PlayerVars,
      }

      setVideoInstance(new window.YT.Player(tmpContainer, tmpPlayerOption))
    }
  }

  return (
    <PlayerContext.Provider
      value={{
        videoInstance,
        videoId,
        videoName,
        status,
        currentTime,
        duration,
        volumn,
        muted,
        updateVideoInstance,
        updateVideoInfo,
        // updateVideoTime,
      }}
    >
      <IFramePlayer />
      <PopularList />
      <PlayerPanel />
    </PlayerContext.Provider>
  )
}

export default Player
