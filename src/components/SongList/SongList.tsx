import {
  faCirclePause,
  faCirclePlay,
} from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import styled from 'styled-components'
import { PlayerContext } from '../../interfaces/PlayerContext'
import { getPopularList, ISongResult } from '../../services/youtube.service'

const SongListContainer = styled.div`
  overflow-x: hidden;
  overflow-y: auto;
  padding: 1%;
`

const SongListTable = styled.table`
  table-layout: fixed;
  border-collapse: collapse;
  font-size: 0.9em;
  width: 100%;
`

const SongListTableHead = styled.thead`
  line-height: 32px;
  border-bottom: 1px solid darkgray;
`

const SongListTableHeadRow = styled.tr`
  color: black;
`

const SongListTableHeadCol = styled.th`
  padding: 12px 15px;
  vertical-align: middle;
`

const SongListTableBody = styled.tbody``

const SongListTableBodyRow = styled.tr`
  &:hover {
    background: rgba(128, 128, 128, 0.2);

    button {
      display: initial;
    }
  }
`

const SongListTableBodyCol = styled.td`
  padding: 12px 15px;
  vertical-align: middle;
`

const SongListTablePlayPauseBtn = styled.button`
  display: none;
`

const SongListTableTitle = styled.h2.attrs(
  (props: { isActive: boolean }) => props
)`
  font-size: 1.5rem;
  color: ${(props) => `${props.isActive ? 'lightblue' : 'black'}`};
`

const SongListTableArtist = styled.h5.attrs(
  (props: { isActive: boolean }) => props
)`
  font-size: 0.8rem;
  color: ${(props) => `${props.isActive ? 'darkgray' : 'darkgray'}`};
`

const SongList = (): JSX.Element => {
  const params = useParams()
  const [songList, setSongList] = useState<ISongResult[]>()
  const playerContext = useContext(PlayerContext)
  const { status, videoId, videoInstance, updateVideoInfo } = playerContext

  useEffect(() => {
    const fetchPopularList = async () => {
      const result = await getPopularList(params.regionCode)
      setSongList(result)
    }

    fetchPopularList()

    return () => {
      setSongList([])
    }
  }, [params.regionCode])

  return (
    <SongListContainer>
      <SongListTable>
        <SongListTableHead>
          <SongListTableHeadRow>
            <SongListTableHeadCol
              style={{ width: '10%' }}
            ></SongListTableHeadCol>
            <SongListTableHeadCol style={{ width: '50%' }}>
              Title
            </SongListTableHeadCol>
            <SongListTableHeadCol style={{ width: '20%' }}>
              Time
            </SongListTableHeadCol>
            <SongListTableHeadCol style={{ width: '20%' }}>
              Play
            </SongListTableHeadCol>
          </SongListTableHeadRow>
        </SongListTableHead>
        <SongListTableBody>
          {songList?.map((item: ISongResult) => (
            <SongListTableBodyRow key={item.id}>
              <SongListTableBodyCol style={{ textAlign: 'center' }}>
                {videoId === item.id && status === 1 ? (
                  <SongListTablePlayPauseBtn
                    onClick={() => {
                      videoInstance?.pauseVideo()
                    }}
                  >
                    <FontAwesomeIcon icon={faCirclePause} size={'lg'} />
                  </SongListTablePlayPauseBtn>
                ) : (
                  <>
                    <SongListTablePlayPauseBtn
                      onClick={() => {
                        if (videoId === item.id) {
                          videoInstance?.playVideo()
                        } else {
                          updateVideoInfo(item.id)
                        }
                      }}
                    >
                      <FontAwesomeIcon icon={faCirclePlay} size={'lg'} />
                    </SongListTablePlayPauseBtn>
                  </>
                )}
              </SongListTableBodyCol>
              <SongListTableBodyCol>
                <SongListTableTitle isActive={videoId === item.id}>
                  {item.title}
                </SongListTableTitle>
                <SongListTableArtist isActive={videoId === item.id}>
                  {item.artist}
                </SongListTableArtist>
              </SongListTableBodyCol>
              <SongListTableBodyCol>{item.duration}</SongListTableBodyCol>
              <SongListTableBodyCol>{item.viewCount}</SongListTableBodyCol>
            </SongListTableBodyRow>
          ))}
        </SongListTableBody>
      </SongListTable>
    </SongListContainer>
  )
}

export default SongList
