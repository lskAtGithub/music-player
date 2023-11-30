import { ref } from 'vue'

import type { ThemeType } from '@/types/hooksType/theme'
import type { Ref } from 'vue'

let useTheme: Ref<ThemeType> = ref((localStorage.getItem('theme') || '') as ThemeType)

function useChangeTheme(themeName: ThemeType) {
  useTheme.value = themeName
  if (themeName === '') {
    localStorage.removeItem('theme')
    document.documentElement.removeAttribute('data-theme')
  } else {
    localStorage.setItem('theme', themeName)
    document.documentElement.setAttribute('data-theme', themeName)
  }
}

function useInitTheme() {
  if (localStorage.getItem('theme')) {
    useTheme.value = localStorage.getItem('theme') as ThemeType
    document.documentElement.setAttribute('data-theme', useTheme.value)
  }
}

export { useTheme, useChangeTheme, useInitTheme }
