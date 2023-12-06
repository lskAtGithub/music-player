<script setup lang="ts">
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { routes } from '@/router'

type routeTab = {
  path: string
  name: string
  tabName: string
}

const route = useRoute()
const router = useRouter()

const tabs: routeTab[] = routes[0].children
  .filter((item) => {
    return item.meta && item.meta.tabName
  })
  .map((item) => ({
    path: item.path,
    name: item.name,
    tabName: item.meta!.tabName
  }))

const hasCrumbs = computed(() => {
  const tabPaths = tabs.map((item) => item.path)
  return tabPaths.indexOf(route.path) !== -1
})

function onToggleCrumb(item: routeTab) {
  router.push(item.path)
}
</script>

<template>
  <div class="crumbs-box" v-show="hasCrumbs">
    <div
      v-for="item in tabs"
      :key="item.name"
      class="crumbs-item"
      :class="{ 'crumbs--item-active': route.path === item.path }"
      @click="onToggleCrumb(item)"
    >
      {{ item.tabName }}
    </div>
  </div>
</template>

<style scoped lang="scss">
.crumbs-box {
  display: flex;
  align-items: center;
  user-select: none;

  .crumbs-item {
    margin-left: 12px;
    cursor: pointer;
    position: relative;
    padding: 12px 0;
    transform-origin: center;
    font-weight: bold;

    &:hover {
      color: var(--el-color-primary-light-3);
    }

    &::after {
      content: '';
      position: absolute;
      width: 100%;
      height: 2px;
      border-radius: 3px;
      left: 0;
      bottom: 0;
      background: var(--el-color-primary);
      transform: scaleX(0);
      transition: all 0.3s;
    }

    &.crumbs--item-active {
      color: var(--el-color-primary);
      &::after {
        transform: scaleX(1);
      }
    }
  }
}
</style>
