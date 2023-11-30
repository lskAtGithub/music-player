<script setup lang="ts">
import platte from '@/svgIcon/platte'
import { useTheme, useChangeTheme } from '@/hooks/theme'

import type { ThemeType } from '@/types/hooksType/theme'

let themes = ['system', 'light', 'dark', 'retro', 'synthwave']

const onToggleTheme = (themeName: string) => {
  if (themeName === 'system') {
    themeName = ''
  }
  if (useTheme.value !== themeName) {
    useChangeTheme(themeName as ThemeType)
  }
}
</script>

<template>
  <div class="bg-gray-800 h-[60px] px-24 flex items-center justify-between">
    <h1 class="text-white font-bold">音乐播放器</h1>
    <details class="dropdown">
      <summary class="m-1 btn">
        <platte />
      </summary>
      <ul class="p-2 shadow menu dropdown-content z-[1] bg-base-100 rounded-box w-36">
        <li v-for="item in themes" :key="item" @click="onToggleTheme(item)">
          <a>{{ item }}</a>
        </li>
      </ul>
    </details>
  </div>
</template>

<style scoped lang="scss"></style>
