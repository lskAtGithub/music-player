<script setup lang="ts">
import BaseChunk from '@/components/BaseChunk.vue'

const props = defineProps({
  loading: Boolean
})
</script>

<template>
  <el-skeleton style="--el-skeleton-circle-size: 100px" :loading="props.loading" animated>
    <template #template>
      <div class="home-box">
        <base-chunk title="歌单" class="chunk">
          <div class="content-box">
            <div v-for="item in 100" class="content-item" :key="item">
              <el-skeleton-item variant="image" style="width: 10vw; height: 10vw" />
              <el-skeleton-item variant="p" style="width: 100%; height: 29px; margin: 5px 0;" />
              <el-skeleton-item variant="p" style="width: 100%" />
              <el-skeleton-item variant="p" style="width: 100%" />
            </div>
          </div>
        </base-chunk>

        <base-chunk title="新歌推荐" class="chunk">
          <div class="content-box">
            <div v-for="item in 100" class="content-item" :key="item">
              <el-skeleton-item variant="image" style="width: 10vw; height: 10vw" />
              <el-skeleton-item variant="p" style="width: 100% height: 39px" />
              <el-skeleton-item variant="p" style="width: 100%" />
            </div>
          </div>
        </base-chunk>
      </div>
    </template>
    <template #default>
      <slot />
    </template>
  </el-skeleton>
</template>

<style scoped lang="scss">
.home-box {
  .chunk {
    margin-bottom: 36px;
  }
  .content-box {
    display: flex;
    gap: 12px;
    .content-item {
      cursor: pointer;

      .title {
        min-height: 39px;
        margin-bottom: 2px;
        font-size: 16px;
        font-weight: bold;
        @include textOverrun(2);
      }
      .desc {
        color: var(--font-color-level-3);
        font-size: 12px;
      }
    }
  }
}
</style>
