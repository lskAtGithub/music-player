<script setup lang="ts">
import { vLoading, ElMessage } from 'element-plus'
import { ref, onMounted } from 'vue'

let loading = ref(true)

onMounted(() => {
  setTimeout(() => {
    ElMessage.error('timeout of 5000ms exceeded')
    loading.value = false
  }, 5000)
})
</script>

<template>
  <div class="box" v-loading="loading">
    <div v-show="!loading" class="empty">
      <el-result icon="warning" title="暂无内容" sub-title="更多榜单请前往探索">
        <template #extra>
          <el-empty description=" " />
        </template>
      </el-result>
    </div>
  </div>
</template>

<style scoped lang="scss">
.box {
  min-height: calc(100vh - 60px - 90px);
  overflow: hidden;
  position: relative;
  .empty {
    position: absolute;
    bottom: 0px;
    left: calc(50% - 110px);
  }
}
</style>
