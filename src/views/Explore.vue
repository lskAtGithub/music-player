<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { getAllList } from '@/api/list'
import BaseImage from '@/components/BaseImage.vue'

import type { ListItem } from '@/types/Song'
import type { Ref } from 'vue'

let list: Ref<ListItem[]> = ref([])

onMounted(() => {
  getAllList().then((res) => {
    console.log(res)
    list.value = res.data.list
  })
})
</script>

<template>
  <div class="explore-box">
    <section class="list-item" v-for="item in list" :key="item.id">
      <el-card style="height: 100%" shadow="hover">
        <BaseImage :src="item.coverImgUrl" icon-name="View" style="max-width: 125px; max-height: 125px;" />
        <div class="list-title">{{ item.name }}</div>
        <div class="list-desc">
          <el-tooltip placement="top" :show-after="300">
            <template #content>
              <div style="max-width: 400px">
                {{ item.description }}
              </div>
            </template>
            {{ item.description }}
          </el-tooltip>
        </div>
      </el-card>
    </section>
  </div>
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
    .list-title {
      text-align: center;
      @include textOverrun(2);
      margin: 8px 0;
      font-weight: bold;
      font-size: 16px;
      min-height: 38px;
    }
    .list-desc {
      word-break: break-all;
      color: var(--font-color-level-3);
      @include textOverrun(3);
    }
  }
}
:deep(.el-card) {
  height: 100%;
}
:deep(.list-tooltip) {
  max-width: 400px;
}
</style>
