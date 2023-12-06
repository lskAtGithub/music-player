<script setup lang="ts">
import { GoTop } from '@/iconPark'

const props = defineProps({
  show: Boolean
})
const emits = defineEmits(['goTop'])

function onGoTop() {
  emits('goTop')
}
</script>

<template>
  <div class="go-top-box" v-show="props.show">
    <el-button :icon="GoTop" @click="onGoTop"></el-button>
  </div>
</template>

<style scoped lang="scss">
.go-top-box {
  position: fixed;
  right: 18px;
  bottom: 30px;
  z-index: 99999999999999;
}
</style>
