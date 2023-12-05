<script setup lang="ts">
import { ref } from 'vue'
import { Sun, Moon, System, Search, Left, Right } from '@/iconPark/index'
import { useTheme, useChangeTheme } from '@/hooks/theme'
import Crumbs from '@/layout/components/Crumbs.vue'
import { useRoute, useRouter } from 'vue-router'
import useStore from '@/store'
import { storeToRefs } from 'pinia'

const useThemeMap = {
  light: Sun,
  dark: Moon,
  system: System
}

const { canGoBack, canGoForward } = storeToRefs(useStore().routeStore)
const route = useRoute()
const router = useRouter()
let keyword = ref('')

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
</script>

<template>
  <div class="main-header">
    <div class="crumbs">
      <el-button :icon="Left" circle :disabled="!canGoBack" @click="() => router.back()" />
      <el-button v-show="canGoForward" :icon="Right" circle @click="() => router.forward()" />
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
  padding: 0 15px;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: sticky;
  top: 0;
  z-index: 2;
  background: var(--color-base-not);
  opacity: 0.9;
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
