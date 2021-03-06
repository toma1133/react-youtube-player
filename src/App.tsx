import { useEffect, useState } from 'react'
import { Routes, Route, Navigate, BrowserRouter } from 'react-router-dom'
import styled from 'styled-components'
import IFramePlayer from './components/IFramePlayer'
import NavBar from './components/NavBar'
import PlayerPanel from './components/PlayerPanel'
import PopularList from './components/PopularList'
import SongList from './components/SongList'
import TopBar from './components/TopBar'
import { PlayerContext } from './interfaces/PlayerContext'

const MainContainer = styled.main`
  display: flex;
  flex-direction: row;
  height: calc(100% - 128px);
`

const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 80%;
`

const App = () => {
  const [videoInstance, setVideoInstance] = useState<YT.Player | undefined>()
  const [videoId, setVideoId] = useState<string | undefined>()
  const [videoName, setVideoName] = useState<string | undefined>()
  const [status, setStatus] = useState<YT.PlayerState | undefined>()
  const [currTime, setCurrTime] = useState<number>(0)
  const [totalTime, setTotalTime] = useState<number>(0)
  const [progress, setProgress] = useState<number>(0)
  const [volumn, setVolumn] = useState<number>(50)
  const [muted, setMuted] = useState<boolean | undefined>()

  useEffect(() => {
    return () => {
      if (videoInstance) {
        videoInstance.destroy()
      }
    }
  }, [videoInstance])

  const updateVideoInstance = (tmpContainer?: HTMLDivElement): void => {
    if (tmpContainer) {
      const tmpPlayerOption: YT.PlayerOptions = {
        width: 640,
        height: 480,
        // videoId: 'Il0S8BoucSA',
        videoId: undefined,
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

  const updateVideoInfo = (
    tmpVideoId?: string,
    tmpVideoName?: string,
    tmpStatus?: YT.PlayerState,
    tmpCurrTime?: number,
    tmpTotalTime?: number,
    tmpVolumn?: number,
    tmpMuted?: boolean
  ): void => {
    if (tmpVideoId !== undefined) setVideoId(() => tmpVideoId)
    if (tmpVideoName !== undefined) setVideoName(() => tmpVideoName)
    if (tmpStatus !== undefined) setStatus(() => tmpStatus)
    if (tmpCurrTime !== undefined) setCurrTime(() => tmpCurrTime)
    if (tmpTotalTime !== undefined) setTotalTime(() => tmpTotalTime)
    if (tmpVolumn !== undefined) setVolumn(() => tmpVolumn)
    if (tmpMuted !== undefined) setMuted(() => tmpMuted)
  }

  const updateVideoProgress = (currTime: number, totalTime: number): void => {
    if (currTime !== undefined && totalTime !== undefined && totalTime !== 0)
      setProgress(() => (currTime / totalTime) * 100)
  }

  return (
    <PlayerContext.Provider
      value={{
        videoInstance,
        videoId,
        videoName,
        status,
        currTime,
        totalTime,
        progress,
        volumn,
        muted,
        updateVideoInstance,
        updateVideoInfo,
        updateVideoProgress,
        // updateVideoTime,
      }}
    >
      <IFramePlayer />
      <MainContainer>
        <BrowserRouter basename="/react-youtube-player">
          <NavBar />
          <ContentContainer>
            <TopBar />
            <Routes>
              <Route path="/popular" element={<PopularList />} />
              <Route path="/popular/:regionCode" element={<SongList />} />
              <Route path="/" element={<Navigate to="/popular" />} />
            </Routes>
          </ContentContainer>
        </BrowserRouter>
      </MainContainer>
      {/* <PopularList /> */}
      <PlayerPanel />
    </PlayerContext.Provider>
  )
}

export default App
