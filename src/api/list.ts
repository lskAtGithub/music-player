import request from '@/utils/request'

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

/**
 * @description 根据关键字获取搜索结果
 */
export function getSearch(params: { keywords: string }) {
  return request({
    url: '/cloudsearch',
    method: 'get',
    params
  })
}
