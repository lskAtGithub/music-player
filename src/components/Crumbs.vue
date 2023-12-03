<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRoute } from 'vue-router'

import type { CommonObject } from '@/types/Index'

const route = useRoute()

let currentIndex = ref(0)
const tabs: CommonObject<string[]> = {
  '/': ['热门', '每日推荐', '排行榜', '歌手榜']
}

const currentTabs = computed(() => {
  return tabs[route.path]
})

function onToggleCrumb(index: number) {
  currentIndex.value = index
}
</script>

<template>
  <div class="crumbs-box">
    <div
      v-for="(item, index) in currentTabs"
      :key="item"
      class="crumbs-item"
      :class="{ 'crumbs--item-active': currentIndex === index }"
      @click="onToggleCrumb(index)"
    >
      {{ item }}
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
