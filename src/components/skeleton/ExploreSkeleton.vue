<script setup lang="ts">
const props = defineProps({
  loading: Boolean
})
</script>

<template>
  <el-skeleton style="--el-skeleton-circle-size: 100px" :loading="props.loading" animated>
    <template #template>
      <div class="explore-box">
        <section class="list-item" v-for="item in 30" :key="item">
          <el-card style="height: 100%" shadow="hover">
            <el-skeleton-item variant="image" style="width: 10vw; height: 10vw" />
            <el-skeleton-item variant="p" style="width: 100% height: 39px" />
            <el-skeleton-item variant="p" style="width: 100%" />
          </el-card>
        </section>
      </div>
    </template>
    <template #default>
      <slot />
    </template>
  </el-skeleton>
</template>

<style scoped lang="scss">
.explore-box {
  display: flex;
  padding: 30px 8px;
  flex-wrap: wrap;
  justify-content: center;
  align-items: stretch;
  gap: 12px;
  .list-item {
    max-width: 165px;
  }
}
:deep(.el-card) {
  height: 100%;
}
</style>
