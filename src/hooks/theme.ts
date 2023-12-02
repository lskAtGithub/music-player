import { ref } from 'vue'

import type { Ref } from 'vue'
import type { Theme } from '@/types/Theme'

let useTheme: Ref<Theme> = ref('system')

/**
 * @description 监听用户系统主题切换
 */
function watchUserSystem() {
  const darkModeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)')

  darkModeMediaQuery.onchange = () => useChangeTheme('system')
}

/**
 * @description 初始化主题
 */
function useInitTheme() {
  if (localStorage.getItem('music-player-theme')) {
    useTheme.value = localStorage.getItem('music-player-theme') as Theme
    useChangeTheme(useTheme.value)
  } else {
    useChangeTheme('system')
    watchUserSystem()
  }
}

function useChangeTheme(themeName: Theme) {
  useTheme.value = themeName
  localStorage.setItem('music-player-theme', themeName)

  switch (useTheme.value) {
    case 'system':
      if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        document.documentElement.classList.add('dark')
      } else {
        document.documentElement.classList.remove('dark')
      }
      break
    case 'light':
      document.documentElement.classList.remove('dark')
      break
    case 'dark':
      document.documentElement.classList.add('dark')
      break

    default:
      const n: never = useTheme.value
      break
  }
}

export { useTheme, useInitTheme, useChangeTheme }
