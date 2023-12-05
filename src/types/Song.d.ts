export interface SongDetail {
  br: number
  canExtend: boolean
  code: number
  encodeType: string
  fee: number
  id: number
  level: string
  md5: string
  type: string
  time: number
  size: number
  url: string
}

export interface ListItem {
  ToplistType: string
  adType: number
  description: string
  createTime: number
  id: number
  name: string
  playCount: number
  updateFrequency: string
  updateTime: number
  userId: number
  coverImgUrl: string
  tracks: { first: string; second: string }[]
}
