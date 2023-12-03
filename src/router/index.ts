import { createRouter, createWebHistory } from 'vue-router'
import Layout from '@/layout/LayoutIndex.vue'

import HomePage from '@/views/HomePage.vue'
import Setting from '@/views/Setting.vue'
import Explore from '@/views/Explore.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Layout,
      children: [
        {
          path: '/',
          name: 'HomePage',
          component: HomePage
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
        }
      ]
    }
  ]
})

export default router
