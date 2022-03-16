import React from 'react'

export enum EmYoutubeMsgEvent {
  INITIAL_DELIVERY = 'initialDelivery',
  INFO_DELIVERY = 'infoDelivery',
  ON_READY = 'onReady',
  ON_STATE_CHANGE = 'onStateChange',
  API_INFO_DELIVERY = 'apiInfoDelivery',
}

export interface IPlayerVideoData {
  author?: string
  title?: string
  video_id?: string
}

export interface IPlayerInfo {
  apiInterface?: Array<string>
  availablePlaybackRates?: Array<number>
  availableQualityLevels?: Array<any>
  currentTime?: number
  currentTimeLastUpdated_?: number
  debugText?: string
  duration?: number
  muted: boolean
  mediaReferenceTime?: number
  option?: any
  options?: Array<any>
  playbackQuality?: string
  playbackRate?: number
  playerMode?: any
  playerState?: YT.PlayerState
  playlist?: any
  playlistId?: any
  playlistIndex?: number
  size?: { width?: number; height?: number }
  sphericalProperties?: YT.SphericalProperties
  videoBytesLoaded?: number
  videoBytesTotal?: number
  videoData?: IPlayerVideoData
  videoEmbedCode?: string
  videoInfoVisible?: boolean
  videoLoadedFraction?: number
  videoStartBytes?: number
  videoUrl?: string
  volume?: number
}

export interface IPlayerEvent {
  id?: number
  channel?: string
  event?: EmYoutubeMsgEvent
  info?: IPlayerInfo
}

export interface IPlayerContext {
  videoInstance?: YT.Player
  videoId?: string
  videoName?: string
  status?: YT.PlayerState
  currentTime?: number
  duration?: number
  volumn?: number
  muted?: boolean
  updateVideoInstance?: (tmpContainer?: HTMLDivElement) => void
  updateVideoInfo?: (
    tmpVideoId?: string,
    tmpVideoName?: string,
    tmpStatus?: YT.PlayerState,
    tmpCurrentTime?: number,
    tmpDuration?: number,
    tmpVolumn?: number,
    tmpMuted?: boolean
  ) => void
  updateVideoTime?: (tmpCurrentTime?: number) => void
}

export const PlayerContext = React.createContext({} as IPlayerContext)
