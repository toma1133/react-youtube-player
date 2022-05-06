import moment from 'moment'
import { parseTitleString } from './common.service'

export interface IRegionCode {
  gl?: string
  name?: string
  color?: string
}

export interface ISongResult {
  id?: string
  title?: string
  artist?: string
  duration?: string
  channelId?: string
  channelTitle?: string
  description?: string
  thumbnailUrl?: string
  viewCount?: string
  commnetCount?: string
}

export const regionCode: IRegionCode[] = [
  {
    gl: 'TW',
    name: 'Taiwan',
    color: 'linear-gradient(to bottom, #0f2027, #203a43, #2c5364)',
  },
  {
    gl: 'US',
    name: 'United States',
    color: 'linear-gradient(to bottom, #373b44, #4286f4)',
  },
  {
    gl: 'GB',
    name: 'United Kingdom',
    color: 'linear-gradient(to bottom, #7f7fd5, #86a8e7, #91eae4)',
  },
  {
    gl: 'JP',
    name: 'Japan',
    color: 'linear-gradient(to bottom, #FF0099, #493240)',
  },
  {
    gl: 'KR',
    name: 'South Korea',
    color: 'linear-gradient(to bottom, #0f0c29, #302b63, #24243e)',
  },
  {
    gl: 'HK',
    name: 'Hong Kong',
    color: 'linear-gradient(to bottom, #ee0979, #ff6a00)',
  },
  {
    gl: 'TH',
    name: 'Thailand',
    color: 'linear-gradient(to bottom, #f2709c, #ff9472)',
  },
]

export const getPopularList = async (
  targetRegionCode?: string
): Promise<Array<ISongResult>> => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_YOUTUBE_API_URL}` +
          `?part=contentDetails&part=snippet&part=statistics&chart=mostPopular&hl=zh_TW&maxResults=50` +
          `&regionCode=${targetRegionCode}&videoCategoryId=10` +
          `&key=${process.env.REACT_APP_YOUTUBE_API_KEY}`,
        {
          method: 'GET',
          headers: {
            Accept: 'application/json',
          },
        }
      )
      const result = await response.json()
      if (result && result.items && result.items.length) {
        const tmpResult = result.items.map(
          (item: any) =>
            ({
              id: item.id,
              title: parseTitleString(item.snippet.title).title,
              artist: parseTitleString(item.snippet.title).artist,
              description: item.snippet.description,
              channelId: item.snippet.channelId,
              channelTitle: item.snippet.channelTitle,
              duration: moment
                .utc(
                  moment.duration(item.contentDetails.duration).asMilliseconds()
                )
                .format('mm:ss'),
              thumbnailUrl: item.snippet.thumbnails.high.url,
              viewCount: Number.parseInt(
                item.statistics.viewCount
              ).toLocaleString(undefined, { maximumFractionDigits: 2 }),
              commentCount: Number.parseInt(
                item.statistics.commentCount
              ).toLocaleString(undefined, { maximumFractionDigits: 2 }),
            } as ISongResult)
        )

        return resolve(tmpResult)
      } else {
        throw new Error()
      }
    } catch (error) {
      return reject([])
    }
    // https://youtube.googleapis.com/youtube/v3/videos?part=contentDetails&part=snippet&part=statistics&chart=mostPopular&hl=zh_TW&maxResults=50&regionCode=US&videoCategoryId=10&key=[YOUR_API_KEY]
    // --header 'Authorization: Bearer [YOUR_ACCESS_TOKEN]' \
    // --header 'Accept: application/json' \
    // service.videos
    //   .list({
    //     part: ['contentDetails', 'snippet', 'statistics'],
    //     chart: 'mostPopular',
    //     hl: 'zh_TW',
    //     maxResults: 50,
    //     regionCode: targetRegionCode,
    //     videoCategoryId: '10',
    //   })
    //   .then((response) => {
    //     console.log('Response', response)
    //     if (
    //       response &&
    //       response.status === 200 &&
    //       response.data &&
    //       response.data.items &&
    //       response.data.items.length
    //     ) {
    //       return resolve(
    //         response.data.items.map(
    //           (item: any) =>
    //             ({
    //               id: item.id,
    //               title: parseTitleString(item.snippet.title).title,
    //               artist: parseTitleString(item.snippet.title).artist,
    //               description: item.snippet.description,
    //               channelId: item.snippet.channelId,
    //               channelTitle: item.snippet.channelTitle,
    //               duration: moment
    //                 .utc(
    //                   moment
    //                     .duration(item.contentDetails.duration)
    //                     .asMilliseconds()
    //                 )
    //                 .format('mm:ss'),
    //               thumbnailUrl: item.snippet.thumbnails.high.url,
    //               viewCount: Number.parseInt(
    //                 item.statistics.viewCount
    //               ).toLocaleString(undefined, { maximumFractionDigits: 2 }),
    //               commentCount: Number.parseInt(
    //                 item.statistics.commentCount
    //               ).toLocaleString(undefined, { maximumFractionDigits: 2 }),
    //             } as ISongResult)
    //         )
    //       )
    //     } else {
    //       return reject([])
    //     }
    //   })
    //   .catch((err) => {
    //     console.error('Execute error', err)
    //     return reject([])
    //   })
    // if (targetRegionCode) {
    //   const result =
    //     tmpResult[targetRegionCode].items &&
    //     !!tmpResult[targetRegionCode].items.length
    //       ? tmpResult[targetRegionCode].items.map(
    //           (item: any) =>
    //             ({
    //               id: item.id,
    //               title: parseTitleString(item.snippet.title).title,
    //               artist: parseTitleString(item.snippet.title).artist,
    //               description: item.snippet.description,
    //               channelId: item.snippet.channelId,
    //               channelTitle: item.snippet.channelTitle,
    //               duration: moment
    //                 .utc(
    //                   moment
    //                     .duration(item.contentDetails.duration)
    //                     .asMilliseconds()
    //                 )
    //                 .format('mm:ss'),
    //               thumbnailUrl: item.snippet.thumbnails.high.url,
    //               viewCount: Number.parseInt(
    //                 item.statistics.viewCount
    //               ).toLocaleString(undefined, { maximumFractionDigits: 2 }),
    //               commentCount: Number.parseInt(
    //                 item.statistics.commentCount
    //               ).toLocaleString(undefined, { maximumFractionDigits: 2 }),
    //             } as ISongResult)
    //         )
    //       : []
    //   return resolve(result)
    // }
  })
}
