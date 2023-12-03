<script setup lang="ts">

</script>

<template>
  <div class="home-box">
    <p v-for="i in 100" :key="i">{{ i }}</p>
  </div>
</template>

<style scoped lang="scss">
.home-box {
  height: 200vh;
}
</style>
