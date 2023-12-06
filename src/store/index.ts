import { createPinia } from 'pinia'
import useRoutes from './modules/routes'
import useSongs from './modules/songs'

const pinia = createPinia()

export default function useStore() {
  return {
    routeStore: useRoutes(pinia),
    songStore: useSongs(pinia),
  }
}
