import request from '@/utils/request'

export function getHotArtists() {
  return request({
    url: '/top/artists',
    method: 'get'
  })
}

export function getPersonalized() {
  return request({
    url: '/personalized',
    method: 'get'
  })
}
