<script setup lang="ts">
import { RouterView } from 'vue-router'
import { onMounted } from 'vue'
import { ElMessageBox } from 'element-plus'

onMounted(() => {
  if (!localStorage.getItem('music-player-no-prompt')) {
    ElMessageBox.confirm('如出现无法访问请打开VPN', '提示', {
      confirmButtonText: '我知道了',
      cancelButtonText: '不再提示',
      type: 'warning',
      closeOnPressEscape: false
    }).catch(() => {
      localStorage.setItem('music-player-no-prompt', 'true')
    })
  }
})
</script>

<template>
  <RouterView />
</template>
