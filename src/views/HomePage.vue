<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { getHotArtists, getPersonalized } from '@/api/list'
import { vLoading } from 'element-plus'
import BaseChunk from '@/components/BaseChunk.vue'
import BaseImage from '@/components/BaseImage.vue'

import type { Personalized } from '@/types/Home'
import type { AxiosResponse } from 'axios'
import type { Ref } from 'vue'

type Response = { code: number; result: Personalized[] }

let isLoading = ref(false)
let songList: Ref<Personalized[]> = ref([])

onMounted(() => {
  isLoading.value = true
  type Response = { code: number; result: Personalized[] }

  getPersonalized().then((res: AxiosResponse<Response>) => {
    isLoading.value = false
    songList.value = res.data.result
  })
})
</script>

<template>
  <div class="home-box" v-loading="isLoading">
    <base-chunk title="歌单">
      <div class="content-box">
        <div v-for="item in songList" class="content-item" :key="item.id">
          <BaseImage :src="item.picUrl" icon-name="Play" />
          <div class="title">{{ item.name }}</div>
          <div class="desc">播放次数： {{ item.playCount }}</div>
          <div class="desc">更新时间：{{ new Date(item.trackNumberUpdateTime).toLocaleDateString() }}</div>
        </div>
      </div>
    </base-chunk>
  </div>
</template>

<style scoped lang="scss">
.home-box {
  .content-box {
    display: flex;
    gap: 12px;
    .content-item {
      cursor: pointer;
      .title {
        min-height: 40.8px;
        font-size: 16px;
        font-weight: bold;
        overflow: hidden;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
      }
      .desc {
        color: var(--font-color-level-3);
        font-size: 12px;
      }
    }
  }
}
</style>
