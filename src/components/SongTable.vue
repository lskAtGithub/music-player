<script setup lang="ts">
const props = defineProps({
  list: {
    type: Array,
    default: () => []
  }
})
</script>

<template>
  <el-table :data="props.list" style="width: 100%">
    <el-table-column prop="date" label="Date" width="180" />
    <el-table-column prop="name" label="Name" width="180" />
    <el-table-column prop="address" label="Address" />
  </el-table>
</template>

<style scoped lang="scss"></style>
