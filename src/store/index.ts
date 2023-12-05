import { createPinia } from 'pinia'
import useRoutes from './modules/routes'

const pinia = createPinia()

export default function useStore() {
  return {
    routeStore: useRoutes(pinia)
  }
}
