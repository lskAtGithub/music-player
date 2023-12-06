<script lang="ts" setup>
import { ref } from 'vue'
import screenfull from 'screenfull'
import { Lessen, Full } from '@/iconPark'

import type { Ref } from 'vue'

type IconName = 'Full' | 'Lessen'

screenfull.on('change', () => {
  screenfull.isFullscreen ? (iconName.value = 'Lessen') : (iconName.value = 'Full')
})

const iconMap = { Lessen, Full }

let iconName: Ref<IconName> = ref('Full')

const onToggleScreen = () => {
  screenfull.toggle()
}
</script>

<template>
  <el-button :icon="iconMap[iconName]" circle @click="onToggleScreen" />
</template>

<style scoped lang="scss">
.svg-icon {
  width: 20px;
  height: 20px;
  margin-right: 12px;
  cursor: pointer;

  &:hover {
    color: var(--el-color-primary);
  }
}
</style>
