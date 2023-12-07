import { defineStore } from 'pinia'
import { getSongUrl } from '@/api/list'

import type { SongDetail } from '@/types/Song'

const useSongs = defineStore({
  id: 'songs',
  state: () => ({
    songs: [] as SongDetail[],
    currentSong: {} as SongDetail,
    playStatus: false
  }),
  actions: {
    initSongs() {
      if (localStorage.getItem('music-player-songs')) {
        this.songs = JSON.parse(localStorage.getItem('music-player-songs')!)
        if (this.songs && this.songs.length) {
          this.currentSong = this.songs[0]
        }
      }
    },
    removeSong(song: SongDetail) {
      const idx = this.songs.findIndex((item) => item.id === song.id)
      if (idx !== -1) {
        this.songs.splice(idx, 1)
        localStorage.setItem('music-player-songs', JSON.stringify(this.songs))
      }
    },
    addSongs(song: SongDetail, index: 'default' | number = 'default') {
      const idx = this.songs.findIndex((item) => item.id === song.id)
      if (idx !== -1) {
        this.songs.splice(idx, 1)
      }
      if (index === 'default') {
        this.songs.push(song)
      } else {
        this.songs.splice(index, 0, song)
      }
      localStorage.setItem('music-player-songs', JSON.stringify(this.songs))
    },
    replaceSongs(arr: SongDetail[]) {
      this.songs = arr
      localStorage.setItem('music-player-songs', JSON.stringify(this.songs))
    },
    async playSong(song?: SongDetail) {
      if (song) {
        this.playStatus = false
        this.currentSong = song
        const res = await getSongUrl({ id: song.id })
        this.playStatus = true
        const idx = this.songs.findIndex((item) => item.id === song.id)
        this.songs[idx].url = res.data.data[0].url || ''
        this.songs[idx].time = res.data.data[0].time || ''
        this.songs[idx].size = res.data.data[0].size || ''
        this.currentSong = this.songs[0]
      } else {
        this.playStatus = true
      }
    },
    pauseSong() {
      this.playStatus = false
    }
  }
})

export default useSongs
