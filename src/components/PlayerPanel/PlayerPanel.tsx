import { useContext } from 'react'
import { PlayerContext } from '../Player/PlayerContext'
import './PlayerPanel.scss'

const PlayerPanel = (): JSX.Element => {
  const playerContext = useContext(PlayerContext)
  const { videoInstance, videoId, videoName, volumn } = playerContext

  return (
    <div className="player-panel-container">
      <img
        className="player-panel-conver"
        alt={videoName}
        src={`https://i.ytimg.com/vi_webp/${videoId}/mqdefault.webp`}
      ></img>
      <span>{videoName}</span>
      <button>Prev</button>
      <button
        onClick={() => {
          videoInstance?.playVideo()
        }}
      >
        Play
      </button>
      <button
        onClick={() => {
          videoInstance?.pauseVideo()
        }}
      >
        Pause
      </button>
      <button
        onClick={() => {
          videoInstance?.stopVideo()
        }}
      >
        Stop
      </button>
      <button
        onClick={() => {
          videoInstance?.mute()
        }}
      >
        Muted
      </button>
      <button
        onClick={() => {
          videoInstance?.unMute()
        }}
      >
        UnMuted
      </button>
      <button
        onClick={() => {
          if (volumn !== undefined) videoInstance?.setVolume(volumn - 5)
        }}
      >
        Volumn-
      </button>
      <button
        onClick={() => {
          if (volumn !== undefined) videoInstance?.setVolume(volumn + 5)
        }}
      >
        Volumn+
      </button>
      <button>Next</button>
    </div>
  )
}

export default PlayerPanel
