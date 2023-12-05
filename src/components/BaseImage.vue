<script setup lang="ts">
import { ref } from 'vue'
import Play from '@/iconPark/play'
import View from '@/iconPark/view'

let isShow = ref(false)

const props = defineProps({
  src: String,
  fit: {
    type: String,
    default: () => 'cover'
  },
  style: Object,
  iconName: String
})
</script>

<template>
  <div
    class="base-image-box"
    @mouseenter="() => (isShow = true)"
    @mouseleave="() => (isShow = false)"
  >
    <el-image class="main-img" :style="props.style" :src="props.src" :fit="props.fit" />
    <div class="mask" v-show="isShow">
      <Play v-if="props.iconName === 'Play'" v-bind:color="'#fff'" />
      <View v-if="props.iconName === 'View'" v-bind:color="'#fff'" />
    </div>
  </div>
</template>

<style scoped lang="scss">
.base-image-box {
  position: relative;

  .main-img {
    width: 10vw;
    min-width: 125px;
    height: 10vw;
    min-height: 125px;
    border-radius: 5px;
  }
  .mask {
    position: absolute;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    background: rgba($color: #000000, $alpha: 0.3);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 2;
  }
}
</style>
