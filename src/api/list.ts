import request from '@/utils/request'

/**
 * @description: 获取热门歌手
 */
export function getHotArtists() {
  return request({
    url: '/top/artists',
    method: 'get'
  })
}

export function testApi(params: any) {
  return request({
    url: '/toplist',
    method: 'get',
    params
  })
}

/**
 * @description: 获取所有榜单信息
 */
export function getAllList() {
  return request({
    url: '/toplist/detail',
    method: 'get'
  })
}

/**
 * @description: 获取歌单详情
 */
export function getListDetail(params: { id: string }) {
  return request({
    url: '/playlist/detail',
    method: 'get',
    params
  })
}

/**
 * @description: 获取推荐歌单
 */
export function getPersonalized() {
  return request({
    url: '/personalized',
    method: 'get'
  })
}

/**
 * @description 获取推荐新歌
 */
export function getPersonalizedNewSong(params: any) {
  return request({
    url: '/personalized/newsong',
    method: 'get',
    params
  })
}

/**
 * @description 根据歌ID获取歌曲播放地址
 */
export function getSongUrl(params: { id: number | string }) {
  return request({
    url: '/song/url',
    method: 'get',
    params
  })
}
