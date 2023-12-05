import { defineStore } from 'pinia'

import type { RouteLocationNormalized } from 'vue-router'

const useRoutes = defineStore({
  id: 'routes',
  state: () => ({
    routes: [] as RouteLocationNormalized[],
    canGoBack: false as boolean,
    canGoForward: false as boolean
  }),
  actions: {
    addRoute(route: RouteLocationNormalized) {
      this.routes.push(route)
      this.watcher()
    },
    watcher() {
      this.canGoForward = !!history.state.forward
      this.canGoBack = !!(this.routes.length > 1)
      console.log(this.canGoBack)
      
    }
  }
})

export default useRoutes
