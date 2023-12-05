import { createRouter, createWebHistory } from 'vue-router'
import Layout from '@/layout/LayoutIndex.vue'
import useStore from '@/store/index'
import HomePage from '@/views/HomePage.vue'
import Hot from '@/views/Hot.vue'
import Setting from '@/views/Setting.vue'
import Explore from '@/views/Explore.vue'
import SongList from '@/views/SongList.vue'

const { routeStore } = useStore()

export const routes = [
  {
    path: '/',
    name: 'Index',
    component: Layout,
    children: [
      {
        path: '/',
        meta: { tabName: '每日推荐' },
        name: 'HomePage',
        component: HomePage
      },
      {
        path: '/hot',
        meta: { tabName: '热门' },
        name: 'Hot',
        component: Hot
      },
      {
        path: '/setting',
        name: 'Setting',
        component: Setting
      },
      {
        path: '/explore',
        name: 'Explore',
        component: Explore
      },
      {
        path: '/songList',
        name: 'SongList',
        component: SongList
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

router.afterEach((route) => {
  routeStore.addRoute(route)
  console.log(routeStore.routes.length)
})

export default router
