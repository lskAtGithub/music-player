import { createPinia } from 'pinia'
import useSongs from './modules/songs'

const pinia = createPinia()

export default function useStore() {
  return {
    songStore: useSongs(pinia),
  }
}
