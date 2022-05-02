import { useContext } from 'react'
import { PlayerContext } from '../Player/PlayerContext'

const PopularList = (): JSX.Element => {
  const playerContext = useContext(PlayerContext)
  const { updateVideoInfo } = playerContext

  return (
    <>
      <button
        onClick={() => {
          if (updateVideoInfo) updateVideoInfo('Il0S8BoucSA')
        }}
      >
        Shiver
      </button>
      <button
        onClick={() => {
          if (updateVideoInfo) updateVideoInfo('orJSJGHjBLI')
        }}
      >
        Bad Habits
      </button>
      <button
        onClick={() => {
          if (updateVideoInfo) updateVideoInfo('Y2ge3KrdeWs')
        }}
      >
        華語
      </button>
    </>
  )
}

export default PopularList
