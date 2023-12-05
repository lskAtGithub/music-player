export interface Personalized {
  alg: string
  canDislike: boolean
  copywriter: string
  highQuality: boolean
  id: number
  name: string
  picUrl: string
  playCount: number
  trackCount: number
  trackNumberUpdateTime: number
  type: number
}

type Artist = {
  id: number
  name: string
  img1v1Url: string
}

type Song = {
  album: {
    type: string
    company: string
  }
  bMusic: {}
  artists: Artist[]
}

export interface NewSongs {
  id: number
  name: string
  picUrl: string
  song: Song
}
