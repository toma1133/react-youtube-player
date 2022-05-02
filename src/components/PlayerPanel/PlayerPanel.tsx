import { useContext } from 'react'
import styled from 'styled-components'
import moment from 'moment'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faCirclePause,
  faCirclePlay,
} from '@fortawesome/free-regular-svg-icons'
import { parseTitleString } from '../../services/common.service'
import { PlayerContext } from '../Player/PlayerContext'
import {
  faBackwardStep,
  faForwardStep,
  faVolumeHigh,
  faVolumeLow,
  faVolumeOff,
  faVolumeXmark,
} from '@fortawesome/free-solid-svg-icons'
import { IconProp } from '@fortawesome/fontawesome-svg-core'

const PlayerPanelContainer = styled.div`
  display: flex;
  flex-direction: row;
  position: fixed;
  bottom: 0;
  left: 0;
  height: 128px;
  width: 100vw;
  border: 1px solid lightgrey;
`

const PlayerInfo = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 40%;
`

const PlayerCover = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 3%;
  height: 100%;
  width: 50%;
`

const PlayerCoverImg = styled.img`
  height: 100%;
  width: 100%;
`

const PlayerSongInfo = styled.div`
  display: flex;
  justify-content: center;
  align-items: left;
  flex-direction: column;
  padding: 3%;
  height: 100%;
  width: 50%;
`

const PlayerSonfInfoTitle = styled.h1`
  font-size: 1.5rem;
  font-weight: bold;
`

const PlayerSonfInfoArtist = styled.h5`
  color: darkgray;
`

const PlayerControl = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 15%;
`

const PlayerControlBtn = styled.button`
  margin: 0px 5px;
`

const PlayerSlider = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  text-align: center;
  width: 30%;
`

const PlayerSliderLabel = styled.span`
  font-size: 0.8rem;
  width: 15%;
`

const PlayerSliderControl = styled.input`
  width: 70%;
`

const PlayerVolumnSlider = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 15%;
  padding: 2%;
`

const PlayerVolumnSliderControl = styled.input`
  width: 100%;
`

const getPlayerVolumnIcon = (volume: number, isMuted?: boolean): IconProp => {
  if (isMuted) return faVolumeXmark
  if (volume === 0) return faVolumeOff
  if (volume <= 50) return faVolumeLow
  if (volume <= 100) return faVolumeHigh
  return faVolumeHigh
}

const PlayerPanel = (): JSX.Element => {
  const playerContext = useContext(PlayerContext)
  const {
    currTime,
    muted,
    progress,
    status,
    totalTime,
    videoInstance,
    videoId,
    videoName,
    volumn,
  } = playerContext

  return (
    <PlayerPanelContainer>
      <PlayerInfo>
        <PlayerCover>
          <PlayerCoverImg
            alt={videoName}
            src={`https://i.ytimg.com/vi_webp/${videoId}/mqdefault.webp`}
          />
        </PlayerCover>
        <PlayerSongInfo>
          <PlayerSonfInfoTitle>
            {parseTitleString(videoName).title}
          </PlayerSonfInfoTitle>
          <PlayerSonfInfoArtist>
            {parseTitleString(videoName).artist}
          </PlayerSonfInfoArtist>
        </PlayerSongInfo>
      </PlayerInfo>
      <PlayerControl>
        <PlayerControlBtn disabled={true}>
          <FontAwesomeIcon icon={faBackwardStep} size={'2x'} />
        </PlayerControlBtn>
        {status === 1 ? (
          <PlayerControlBtn
            onClick={() => {
              videoInstance?.pauseVideo()
            }}
          >
            <FontAwesomeIcon icon={faCirclePause} size={'2x'} />
          </PlayerControlBtn>
        ) : (
          <PlayerControlBtn
            onClick={() => {
              videoInstance?.playVideo()
            }}
          >
            <FontAwesomeIcon icon={faCirclePlay} size={'2x'} />
          </PlayerControlBtn>
        )}
        {/* <button
          onClick={() => {
            videoInstance?.stopVideo()
          }}
        >
          <FontAwesomeIcon icon={faCircleStop} size={'2x'} />
        </button> */}
        <PlayerControlBtn disabled={true}>
          <FontAwesomeIcon icon={faForwardStep} size={'2x'} />
        </PlayerControlBtn>
      </PlayerControl>
      <PlayerSlider>
        <PlayerSliderLabel>
          {moment.duration(currTime * 1000).hours() === 0
            ? ''
            : `${moment.utc(currTime * 1000).format('HH')}:`}
          {`${moment.utc(currTime * 1000).format('mm')}:`}
          {moment.utc(currTime * 1000).format('ss')}
        </PlayerSliderLabel>
        <PlayerSliderControl
          type="range"
          min="0"
          max="100"
          onChange={(event) => {
            videoInstance?.seekTo(
              totalTime * (Number.parseInt(event.target.value) / 100),
              true
            )
          }}
          value={progress}
        ></PlayerSliderControl>
        <PlayerSliderLabel>
          {moment.duration(totalTime * 1000).hours() === 0
            ? ''
            : `${moment.utc(totalTime * 1000).format('HH')}:`}
          {`${moment.utc(totalTime * 1000).format('mm')}:`}
          {moment.utc(totalTime * 1000).format('ss')}
        </PlayerSliderLabel>
      </PlayerSlider>
      <PlayerVolumnSlider>
        {muted ? (
          <PlayerControlBtn
            onClick={() => {
              videoInstance?.unMute()
            }}
          >
            <FontAwesomeIcon
              icon={getPlayerVolumnIcon(volumn, muted)}
              size={'2x'}
            />
          </PlayerControlBtn>
        ) : (
          <PlayerControlBtn
            onClick={() => {
              videoInstance?.mute()
            }}
          >
            <FontAwesomeIcon
              icon={getPlayerVolumnIcon(volumn, muted)}
              size={'2x'}
            />
          </PlayerControlBtn>
        )}
        {/* <button
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
        </button> */}
        <PlayerVolumnSliderControl
          type="range"
          min="0"
          max="100"
          onChange={(event) => {
            videoInstance?.setVolume(event.target.valueAsNumber)
          }}
          value={volumn}
        ></PlayerVolumnSliderControl>
      </PlayerVolumnSlider>
    </PlayerPanelContainer>
  )
}

export default PlayerPanel
