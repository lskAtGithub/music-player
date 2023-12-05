<script setup lang="ts">
import { getAllList, getListDetail } from '@/api/list'
import { useRoute } from 'vue-router'

const route = useRoute()

function getDetail() {
  getListDetail({ id: route.query.id as string }).then((res) => {
    console.log(res)
  })
}
</script>

<template></template>

<style scoped lang="scss"></style>
