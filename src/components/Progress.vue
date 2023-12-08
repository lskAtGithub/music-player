<script setup lang="ts">
const props = defineProps({
  loading: {
    type: Number,
    default: () => 0
  },
  target: {
    type: Number,
    default: () => 0
  }
})
</script>

<template>
  <div class="progress-box">
    <span></span>
    <span></span>
  </div>
</template>

<style scoped lang="scss">
.progreess-box {
  position: relative;
  background: var(--color-progress-base-bg);
}
</style>
