<script setup lang="ts">
import { platte } from '@/svgIcon/index'
import { useTheme, useChangeTheme } from '@/hooks/theme'
import { ref } from 'vue'

import type { ThemeType } from '@/types/hooksType/theme'

let searchValue = ref('')
let themes = ['system', 'light', 'dark', 'retro', 'synthwave']

const onToggleTheme = (themeName: string) => {
  if (themeName === 'system') {
    themeName = ''
  }
  if (useTheme.value !== themeName) {
    useChangeTheme(themeName as ThemeType)
  }
}

const onSearch = () => {
  console.log(searchValue.value)
}
</script>

<template>
  <div class="bg-gray-800 py-4 px-24 flex items-center justify-between">
    <h1 class="text-white font-bold text-2xl">音乐播放器</h1>
    <input
      type="search"
      v-model="searchValue"
      placeholder="搜索歌曲"
      class="input input-md w-full max-w-xs"
      @keydown.enter="onSearch"
    />
    <details class="dropdown">
      <summary class="m-1 btn btn-sm">
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
