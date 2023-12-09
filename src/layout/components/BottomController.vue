<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue'
import useStore from '@/store'
import { storeToRefs } from 'pinia'
import { vLoading } from 'element-plus'
import BaseImage from '@/components/BaseImage.vue'
import {
  Left,
  Right,
  Play,
  Pause,
  MusicList,
  Volume as VolumeIcon,
  VolumeMute as VolumeMuteIcon
} from '@/iconPark'
import SongTable from '@/components/SongTable.vue'
import Operation from '@/components/Operation.vue'
import { formatTimestamp } from '@/utils/tool'

import type { Ref } from 'vue'
import type { SongDetail } from '@/types/Song'

const imageStyle = {
  width: '64px',
  height: '64px',
  minWidth: '64px',
  minHeight: '64px',
  boxShadow: '0 0 5px 0 var(--color-controller-shadow)'
}
const columns = [
  { label: '歌曲', slotName: 'info' },
  { label: ' ', slotName: 'operation', width: 60 }
]

const { isPlay, isReady, currentSong, songs, isMute, currentTime } = storeToRefs(
  useStore().songStore
)
const {
  pauseSong,
  keepPlay,
  setVolume,
  setMute,
  setPlayerProgress,
  prevSong,
  nextSong,
  playSong,
  playStatus,
  clearSongs
} = useStore().songStore

let drawerVisible = ref(false)
let volume = ref(70)
let songProgress = ref(0)

function isCurrentSong(index: number): boolean {
  let idx = null
  for (let index = 0; index < songs.value.length; index++) {
    const element = songs.value[index]
    if (element.id === currentSong.value.id) {
      idx = index
      break
    }
  }
  return idx === index
}

function onPopupMusicList() {
  drawerVisible.value = true
}

async function onDbClick(row: SongDetail) {
  playStatus()
  playSong(row)
}

function onChangeVolume() {
  if (isMute.value) {
    setMute(false)
  }
  setVolume(volume.value)
}

function calcTime(value: number) {
  if (currentSong.value.time) {
    let timestamp = currentSong.value.time * (value / 100)
    return formatTimestamp(timestamp)
  } else {
    return '00:00'
  }
}

function onChangePlayerTime(value: number) {
  let timestamp = (currentSong.value.time * (value / 100)) / 1000
  setPlayerProgress(timestamp)
}

function onClearList() {
  clearSongs()
}

function watchKeyDown() {
  window.onkeydown = (event: KeyboardEvent) => {
    if (!currentSong.value.id) {
      return
    }
    switch (event.code) {
      case 'Space':
        if (isPlay.value) {
          pauseSong()
        } else {
          playStatus()
          playSong(currentSong.value)
        }
        break
      case 'PageUp':
        if (currentSong.value.id !== songs.value[0].id) {
          prevSong()
        }
        break
      case 'PageDown':
        if (currentSong.value.id !== songs.value[songs.value.length - 1].id) {
          nextSong()
        }
        break
      case 'ArrowUp':
        volume.value += 5
        setVolume(volume.value + 5)
        break
      case 'ArrowDown':
        volume.value -= 5
        setVolume(volume.value - 5 || 0)
        break
    }
  }
}

const isPrev = computed(() => {
  if (songs.value.length <= 1) return false
  return currentSong.value.id === songs.value[0].id
})
const isNext = computed(() => {
  if (songs.value.length <= 1) return false
  return currentSong.value.id === songs.value[songs.value.length - 1].id
})
onMounted(() => {
  if (localStorage.getItem('music-player-volume')) {
    volume.value = Number(localStorage.getItem('music-player-volume'))
  }
  watchKeyDown()
})
watch(
  () => currentTime.value,
  () => {
    songProgress.value = ((currentTime.value * 1000) / currentSong.value.time) * 100
  }
)
</script>

<template>
  <el-drawer size="40%" v-model="drawerVisible" title="播放列表" direction="rtl">
    <div class="btn-box">
      <el-button @click="onClearList">清空列表</el-button>
    </div>
    <song-table :columns="columns" :data="songs" @row-dblclick="onDbClick">
      <template #info="{ scope, index }">
        <div class="info-song">
          <img :src="scope.picUrl" alt="" />
          <span :class="{ active: isCurrentSong(index) }">{{ scope.name }}</span>
        </div>
      </template>
      <template #operation="{ scope }">
        <operation :row="scope" :has-push="false" />
      </template>
    </song-table>
  </el-drawer>
  <div class="bottom-controller-box" :class="{ show: songs.length > 0 }">
    <div class="song-info-box">
      <base-image :src="currentSong.picUrl" :style="imageStyle"></base-image>
      <div class="song-singer">
        <div class="song-name">{{ currentSong.name }}</div>
        <div>{{ currentSong.singer }}</div>
      </div>
    </div>
    <div class="main-controller-box">
      <div class="controller-wg">
        <Left
          class="pointer"
          :size="36"
          @click="
            () => {
              if (!isPrev) prevSong()
            }
          "
          :class="{ disabled: isPrev }"
        />
        <div v-loading="!isReady" element-loading-background="transparent">
          <Play v-show="!isPlay" class="pointer" @click="keepPlay" />
          <Pause v-show="isPlay" class="pointer" @click="pauseSong" />
        </div>
        <Right
          class="pointer"
          :size="36"
          @click="
            () => {
              if (!isNext) nextSong()
            }
          "
          :class="{ disabled: isNext }"
        />
      </div>
      <div class="play-progress-box">
        <span>{{ formatTimestamp(currentTime * 1000) }}</span>
        <el-slider
          v-model="songProgress"
          small="small"
          :disabled="!isPlay"
          :format-tooltip="calcTime"
          @change="onChangePlayerTime"
        />
        <span>{{ formatTimestamp(currentSong.time) }}</span>
      </div>
    </div>
    <div class="sub-controller-box">
      <div class="volume-box">
        <volume-icon class="pointer" v-show="!isMute" @click="setMute(true)" />
        <volume-mute-icon class="pointer" v-show="isMute" @click="setMute(false)" />
        <el-slider v-model="volume" size="small" @change="onChangeVolume" />
      </div>
      <MusicList class="pointer" @click="onPopupMusicList" />
    </div>
  </div>
</template>

<style scoped lang="scss">
.btn-box {
  display: flex;
  justify-content: flex-end;
}
.bottom-controller-box {
  display: flex;
  align-items: center;
  padding: 0 36px;
  height: 0;
  overflow: hidden;
  box-shadow: 0 0 5px 0 var(--color-controller-shadow);
  background: var(--color-controller-bg);
  transition: height 300ms;

  &.show {
    height: 85px;
  }

  .song-info-box {
    display: flex;
    align-items: center;
    flex: 1;
    flex-shrink: 0;

    .song-singer {
      margin-left: 16px;
      font-size: 13px;
      .song-name {
        font-size: 18px;
        font-weight: bold;
        margin-bottom: 12px;
        @include textOverrun(1);
      }
    }
  }

  .main-controller-box {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    flex: 1;

    .controller-wg {
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 28px;
      flex-shrink: 0;
    }
    .play-progress-box {
      display: flex;
      align-items: center;
      gap: 18px;
    }
  }
  .sub-controller-box {
    flex: 1;
    flex-shrink: 0;
    display: flex;
    justify-content: flex-end;
    gap: 24px;
    .volume-box {
      display: flex;
      align-items: center;
      gap: 12px;
      width: 40%;
    }
  }
}
.pointer {
  cursor: pointer;
}
.disabled {
  cursor: not-allowed;
}

.info-song {
  display: flex;
  align-items: center;
  gap: 8px;
  img {
    width: 32px;
    height: 32px;
    border-radius: 3px;
  }
  .active {
    color: var(--el-color-primary);
  }
}
</style>
