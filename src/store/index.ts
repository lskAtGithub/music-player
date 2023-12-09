import { createPinia } from 'pinia'
import useSongs from './modules/songs'
import useRoutes from './modules/routes'

const pinia = createPinia()

export default function useStore() {
  return {
    routeStore: useRoutes(pinia),
    songStore: useSongs(pinia),
  }
}
