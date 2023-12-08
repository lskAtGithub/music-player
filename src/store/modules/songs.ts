import { defineStore } from 'pinia'
import { getSongUrl } from '@/api/list'
import { ElMessage } from 'element-plus'
import { nextTick } from 'vue'

import type { SongDetail } from '@/types/Song'

const useSongs = defineStore({
  id: 'songs',
  state: () => ({
    audioRef: null as HTMLAudioElement | null,
    songs: [] as SongDetail[],
    currentSong: {} as SongDetail,
    isPlay: false,
    isReady: false,
    isMute: false,
    currentTime: 0
  }),
  actions: {
    initSongs(audioRef: HTMLAudioElement) {
      this.isReady = true
      this.isPlay = false
      this.currentSong = {} as SongDetail

      this.audioRef = audioRef
      // set player list
      if (localStorage.getItem('music-player-songs')) {
        this.songs = JSON.parse(localStorage.getItem('music-player-songs')!)
        if (localStorage.getItem('music-player-current-song')) {
          this.currentSong = JSON.parse(localStorage.getItem('music-player-current-song')!)
        } else {
          if (this.songs && this.songs.length) {
            this.currentSong = this.songs[0]
          }
        }
      }
      // set volume
      if (localStorage.getItem('music-player-volume')) {
        this.audioRef.volume = Number(localStorage.getItem('music-player-volume')) / 100
      } else {
        this.audioRef.volume = 70 / 100
      }

      this.audioRef.onerror = () => {
        if (this.currentSong.url) {
          this.playSong(this.currentSong)
        }
      }
      this.audioRef.onloadeddata = () => {
        this.isReady = true
      }
      this.audioRef.ontimeupdate = (time) => {
        this.currentTime = time.timeStamp
      }
    },
    /**
     * 把歌曲从播放列表删除
     */
    removeSong(song: SongDetail) {
      const idx = this.songs.findIndex((item) => item.id === song.id)
      if (idx !== -1) {
        this.songs.splice(idx, 1)
        localStorage.setItem('music-player-songs', JSON.stringify(this.songs))
      }
    },
    /**
     * 添加歌曲到播放列表，如果有传下标则添加到指定下标处，由于播放列表的唯一性， 已存在的歌曲会先被移除再添加进去
     */
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
    /**
     * 替换整个播放列表
     */
    replaceSongs(arr: SongDetail[]) {
      this.songs = arr
      localStorage.setItem('music-player-songs', JSON.stringify(this.songs))
    },
    /**
     * 获取资源播放歌曲
     */
    async playSong(song: SongDetail) {
      this.isReady = false
      this.currentSong = song
      const res = await getSongUrl({ id: song.id })
      const idx = this.songs.findIndex((item) => item.id === song.id)
      const source = res.data.data[0]
      if (source.url && source.time && source.size) {
        this.songs[idx].url = source.url
        this.songs[idx].time = source.time
        this.songs[idx].size = source.size
        this.currentSong = this.songs[idx]
        nextTick(() => {
          if (this.isPlay) this.audioRef?.play()
        })
        localStorage.setItem('music-player-current-song', JSON.stringify(this.currentSong))
        localStorage.setItem('music-player-songs', JSON.stringify(this.songs))
      } else {
        ElMessage.error('抱歉，暂无此音频的播放地址')
        this.removeSong(song)
      }
    },
    /**
     * 暂停播放
     */
    pauseSong() {
      this.isPlay = false
      this.audioRef?.pause()
    },
    /**
     * 设置播放状态为 播放
     */
    playStatus() {
      this.isPlay = true
    },
    /**
     * 已有资源上播放， 资源如果失效会自动走err事件，即重新获取资源播放
     */
    keepPlay() {
      this.playStatus()
      this.audioRef?.play()
    },
    /**
     * 播放上一首
     */
    prevSong() {
      const idx = this.songs.findIndex((item) => item.id === this.currentSong.id)
      this.currentSong = this.songs[idx - 1]
      this.playStatus()
      this.playSong(this.currentSong)
    },
    /**
     * 播放下一首
     */
    nextSong() {
      const idx = this.songs.findIndex((item) => item.id === this.currentSong.id)
      this.currentSong = this.songs[idx + 1]
      this.playStatus()
      this.playSong(this.currentSong)
    },
    /**
     * 调整音量
     */
    setVolume(volume: number) {
      this.audioRef!.volume = volume / 100
      localStorage.setItem('music-player-volume', volume.toString())
    },
    /**
     * 设置是否静音
     */
    setMute(isMute: boolean) {
      if (isMute) {
        this.isMute = true
        this.audioRef!.volume = 0
      } else {
        this.isMute = false
        this.audioRef!.volume = (Number(localStorage.getItem('music-player-volume')) || 70) / 100
      }
    },
    /**
     * 设置播放进度
     */
    setPlayerProgress(second: number) {
      this.audioRef!.currentTime = second
    }
  }
})

export default useSongs
