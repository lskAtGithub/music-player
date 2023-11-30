import type { ThemeType } from '@/types/hooksType/theme'

let useTheme = localStorage.getItem('theme') as ThemeType

function useChangeTheme(themeName: ThemeType) {
  useTheme = themeName
  localStorage.setItem('theme', themeName)
  document.documentElement.setAttribute('data-theme', themeName)
}

function useInitTheme() {
  if (localStorage.getItem('theme')) {
    useTheme = localStorage.getItem('theme') as ThemeType
    document.documentElement.setAttribute('data-theme', useTheme)
  }
}

export { useTheme, useChangeTheme, useInitTheme }
