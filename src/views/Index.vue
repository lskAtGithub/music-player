<script setup lang="ts">
import { useChangeTheme } from '@/hooks/theme'

const onChangeTheme = () => {
  useChangeTheme('retro')
}
</script>

<template>
  <div class="p-4">
    <h1 class="text-3xl font-bold underline">Hello world!</h1>
    <button class="btn" @click="onChangeTheme">Button</button>
  </div>
</template>
