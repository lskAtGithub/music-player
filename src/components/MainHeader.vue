<script setup lang="ts">
import { ref } from 'vue'
import { Sun, Moon, System, Search, Left, Right } from '@/iconPark/index'
import { useTheme, useChangeTheme } from '@/hooks/theme'
import Crumbs from '@/components/Crumbs.vue'

const useThemeMap = {
  light: Sun,
  dark: Moon,
  system: System
}

let keyword = ref('')
let activeName = ref('first')

function onCheckTheme() {
  switch (useTheme.value) {
    case 'light':
      useChangeTheme('dark')
      break
    case 'dark':
      useChangeTheme('system')
      break
    case 'system':
      useChangeTheme('light')
      break

    default:
      const n: never = useTheme.value
      break
  }
}
function onToggleTabs () {

}
</script>

<template>
  <div class="main-header">
    <div class="crumbs">
      <el-button :icon="Left" circle />
      <el-button :icon="Right" circle />
      <Crumbs />
    </div>
    <div class="tool-box">
      <el-input
        style="max-width: 215px"
        v-model="keyword"
        placeholder="搜索歌曲"
        clearable
        :prefix-icon="Search"
      />
      <el-button :icon="useThemeMap[useTheme]" circle @click="onCheckTheme" />
    </div>
  </div>
</template>

<style scoped lang="scss">
.main-header {
  padding: 8px 15px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  .crumbs {
    display: flex;
    align-items: center;
  }

  .tool-box {
    display: flex;
    align-items: center;
    gap: 8px;
  }
}
</style>
