<script setup lang="ts">
import { ref, computed, watch, onMounted, inject } from 'vue'
import useStore from '@/store'
import { storeToRefs } from 'pinia'
import { vLoading } from 'element-plus'
import BaseImage from '@/components/BaseImage.vue'
import { Left, Right, Play, Pause, MusicList } from '@/iconPark'
import { ElMessage } from 'element-plus'

import type { Ref } from 'vue'

const audioRef = inject('audioRef') as Ref<HTMLAudioElement>

const imageStyle = {
  width: '64px',
  height: '64px',
  minWidth: '64px',
  minHeight: '64px',
  boxShadow: '0 0 5px 0 var(--color-controller-shadow)'
}

const { songs, currentSong, playStatus, isInit } = storeToRefs(useStore().songStore)
const { initSongs, pauseSong, playSong } = useStore().songStore

let drawerVisible = ref(false)
let isLoading = ref(false)

const isReady = computed(() => {
  return !currentSong.value.url && !isLoading
})

function onPopupMusicList() {
  drawerVisible.value = true
}

async function onPlay() {
  if (audioRef.value && !audioRef.value.src && currentSong.value.url) {
    isLoading.value = true
    currentSong.value.url = ''
    await playSong(currentSong.value)
    audioRef.value.src = currentSong.value.url
    isLoading.value = false
    audioRef.value!.play()
  } else {
    if (!currentSong.value.url) {
      ElMessage.error('抱歉，暂无此音频的播放地址')
      pauseSong()
      audioRef.value.pause()
    } else {
      playSong()
      audioRef.value!.play()
    }
  }
}

function onPause() {
  audioRef.value!.pause()
  pauseSong()
}

onMounted(() => {
  initSongs()
})
</script>

<template>
  <el-drawer v-model="drawerVisible" title="播放列表" direction="rtl">
    <span>Hi, there!</span>
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
      <Left class="pointer" :size="36" />
      <div v-loading="isReady">
        <Play v-show="!playStatus" class="pointer" @click="onPlay" />
        <Pause v-show="playStatus" class="pointer" @click="onPause" />
      </div>
      <Right class="pointer" :size="36" />
    </div>
    <div class="sub-controller-box">
      <MusicList class="pointer" @click="onPopupMusicList" />
    </div>
  </div>
</template>

<style scoped lang="scss">
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
    justify-content: center;
    align-items: center;
    gap: 12px;
    flex: 1;
    flex-shrink: 0;
  }
  .sub-controller-box {
    flex: 1;
    flex-shrink: 0;
    display: flex;
    justify-content: flex-end;
  }
}
.pointer {
  cursor: pointer;
}
</style>
