<script setup lang="ts">
import Header from './Header.vue';
import { RouterView } from 'vue-router'
</script>

<template>
  <div class="flex-col">
    <Header />
    <RouterView />
  </div>
</template>
