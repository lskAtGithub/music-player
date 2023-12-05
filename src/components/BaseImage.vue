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
    :style="props.style"
    @mouseenter="() => (isShow = true)"
    @mouseleave="() => (isShow = false)"
  >
    <img class="main-img" :style="props.style" :src="props.src" :fit="props.fit" />
    <div class="mask" v-show="isShow">
      <Play v-if="props.iconName === 'Play'" v-bind:color="'#fff'" />
      <View v-if="props.iconName === 'View'" v-bind:color="'#fff'" />
    </div>
  </div>
</template>

<style scoped lang="scss">
.base-image-box {
  position: relative;
  width: 10vw;
  height: 10vw;
  min-width: 125px;
  min-height: 125px;
  box-sizing: border-box;
  margin: 0;
  padding: 0;

  .main-img {
    width: 10vw;
    height: 10vw;
    min-width: 125px;
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
