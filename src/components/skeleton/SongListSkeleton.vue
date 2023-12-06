<script setup lang="ts">
import { Play, AddMusic } from '@/iconPark'
import SongTable from '@/components/SongTable.vue'

const props = defineProps({
  loading: Boolean
})

const tabColumn = [
  { label: '音乐标题', slotName: 'name' },
  { label: '歌手', prop: 'singer', width: 120 },
  { label: '专辑', prop: 'album', width: 150 },
  { label: ' ', slotName: 'operation', width: 80 }
]
</script>

<template>
  <el-skeleton style="--el-skeleton-circle-size: 100px" :loading="props.loading" animated>
    <template #template>
      <div class="song-list-box">
        <div class="songs-header">
          <el-skeleton-item variant="image" class="main-img" />

          <div class="control-box">
            <el-skeleton-item variant="p" style="width: 100%; height: 40px" />
            <el-skeleton-item variant="p" style="width: 100%" />
            <el-skeleton-item variant="p" style="width: 100%" />
            <el-skeleton-item variant="p" style="width: 100%" />
            <el-skeleton-item variant="p" style="width: 100%" />
            <el-skeleton-item variant="p" style="width: 100%" />
            <div>
              <el-button-group size="default">
                <el-button type="primary" :icon="Play">播放全部</el-button>
                <el-button type="primary" :icon="AddMusic" />
              </el-button-group>
            </div>
          </div>
        </div>
        <song-table :list="[]" :columns="tabColumn" />
      </div>
    </template>
    <template #default>
      <slot />
    </template>
  </el-skeleton>
</template>

<style scoped lang="scss">
.song-name {
  display: flex;
  align-items: center;
  gap: 8px;
  img {
    width: 35px;
    height: 35px;
    border-radius: 3px;
  }
}
.song-list-box {
  padding: 20px;
  .songs-header {
    display: flex;
    margin-bottom: 24px;
    .main-img {
      width: 200px;
      height: 200px;
      border-radius: 5px;
      flex-shrink: 1;
    }
    .control-box {
      display: flex;
      flex-direction: column;
      flex: 1;
      padding: 2px 12px;
      justify-content: flex-start;
      gap: 8px;

      .title {
        font-size: 24px;
        font-weight: bold;
      }
      .info {
        margin: 12px 0;
        font-size: 12px;
        color: var(--font-color-level-3);
      }
      .desc {
        flex: 1;
        @include textOverrun(5);
        margin-bottom: 12px;
      }
    }
  }
  .bg-wrapper {
    position: absolute;
    z-index: -1;
    filter: blur(55px);
    opacity: 0.4;
    overflow: hidden;
    top: 0;
    left: 0;
    width: 100%;
    height: 300px;
    background: linear-gradient(
      0deg,
      #fff 0,
      hsla(0, 0%, 100%, 0.996) 8.1%,
      hsla(0, 0%, 100%, 0.983) 15.5%,
      hsla(0, 0%, 100%, 0.964) 22.5%,
      hsla(0, 0%, 100%, 0.939) 29%,
      hsla(0, 0%, 100%, 0.909) 35.3%,
      hsla(0, 0%, 100%, 0.877) 41.2%,
      hsla(0, 0%, 100%, 0.842) 47.1%,
      hsla(0, 0%, 100%, 0.808) 52.9%,
      hsla(0, 0%, 100%, 0.773) 58.8%,
      hsla(0, 0%, 100%, 0.741) 64.7%,
      hsla(0, 0%, 100%, 0.711) 71%,
      hsla(0, 0%, 100%, 0.686) 77.5%,
      hsla(0, 0%, 100%, 0.667) 84.5%,
      hsla(0, 0%, 100%, 0.654) 91.9%,
      hsla(0, 0%, 100%, 0.65)
    );
  }
}
</style>
