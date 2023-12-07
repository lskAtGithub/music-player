<script setup lang="ts">
import { ref, provide, computed } from 'vue'
import { RouterView } from 'vue-router'
import SideMenu from '@/layout/components/SideMenu.vue'
import BottomController from '@/layout/components/BottomController.vue'
import MainHeader from '@/layout/components/MainHeader.vue'
import GoTopBtn from '@/layout/components/GoTopBtn.vue'
import useStore from '@/store'
import { storeToRefs } from 'pinia'

import type { Ref } from 'vue'

type ScrollParam = { scrollLeft: number; scrollTop: number }

let currentScrollTop = 0

const { songStore } = useStore()
const { currentSong } = storeToRefs(songStore)
let scrollbarRef = ref()
let audioRef: Ref<HTMLAudioElement | null> = ref(null)
let isShow = ref(false)

const audioSrc = computed(() => {
  if (currentSong.value && currentSong.value.url) {
    return currentSong.value.url
  } else {
    return ''
  }
})

function onGoTop() {
  isShow.value = false
  const gap = Math.floor(currentScrollTop / 17)

  function _goTop() {
    if (currentScrollTop > 0) {
      scrollbarRef.value.setScrollTop(currentScrollTop - gap)
      requestAnimationFrame(_goTop)
    } else {
      cancelAnimationFrame(animation)
    }
  }
  let animation = requestAnimationFrame(_goTop)
}

function onScroll(e: ScrollParam) {
  currentScrollTop = e.scrollTop
  if (e.scrollTop >= 50) {
    isShow.value = true
  } else {
    isShow.value = false
  }
}

provide('audioRef', audioRef)
</script>

<template>
  <div class="container">
    <div class="menu-box">
      <SideMenu />
    </div>
    <el-scrollbar class="main-box" ref="scrollbarRef" @scroll="onScroll">
      <MainHeader />
      <RouterView />
    </el-scrollbar>
  </div>
  <div class="controller-box">
    <BottomController />
  </div>
  <audio ref="audioRef" :src="audioSrc"></audio>
  <GoTopBtn :show="isShow" @goTop="onGoTop" />
</template>

<style scoped lang="scss">
.container {
  display: flex;
  height: 100vh;
  overflow-y: auto;
  .menu-box {
    width: 215px;
  }
  .main-box {
    flex: 1;
    height: 100%;
    overflow-y: auto;
  }
}
.controller-box {
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  z-index: 2;
}
</style>
