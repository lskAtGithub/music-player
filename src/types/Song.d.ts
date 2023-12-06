// 歌曲详情
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

// 歌单详情
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

// 榜单详情
type Creator = {
  avatarUrl: string
  backgroundUrl: string
  nickname: string
}
export interface ListDetail {
  createTime: string
  name: string
  id: number
  tags: string[]
  playlist: [],
  creator: Creator
}