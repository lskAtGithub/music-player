import { createRouter, createWebHistory } from 'vue-router'
import Layout from '@/layout/Layout.vue'
import Index from '../views/Index.vue'

import type { RouteRecordRaw } from 'vue-router'

const routes: readonly RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Layout',
    component: Layout,
    children: [
      {
        path: '/',
        name: 'Index',
        component: Index
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
