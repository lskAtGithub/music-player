import { createRouter, createWebHistory } from 'vue-router'
import Layout from '@/layout/LayoutIndex.vue'
import HomePage from '@/views/HomePage.vue'
import useStore from '@/store/index'


const Hot = import('@/views/Hot.vue')
const Setting = import('@/views/Setting.vue')
const Explore = import('@/views/Explore.vue')
const SongList = import('@/views/SongList.vue')
const Result = import('@/views/Result.vue')

const { routeStore } = useStore()

export const routes = [
  {
    path: '/',
    name: 'Index',
    component: Layout,
    children: [
      {
        path: '/',
        meta: { tabName: '热门' },
        name: 'HomePage',
        component: HomePage
      },
      {
        path: '/hot',
        meta: { tabName: '每日推荐' },
        name: 'Hot',
        component: Hot
      },
      {
        path: '/setting',
        name: 'Setting',
        component: () => Setting
      },
      {
        path: '/explore',
        name: 'Explore',
        component: () => Explore
      },
      {
        path: '/songList',
        name: 'SongList',
        component: () => SongList
      },
      {
        path: '/result',
        name: 'Result',
        component: () => Result
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
})

export default router
