<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { getPersonalized, getPersonalizedNewSong, getSongUrl } from '@/api/list'
import useStore from '@/store'
import BaseChunk from '@/components/BaseChunk.vue'
import BaseImage from '@/components/BaseImage.vue'
import HomeSkeleton from '@/components/skeleton/HomeSkeleton.vue'

import type { Personalized, NewSongs } from '@/types/Home'
import type { AxiosResponse } from 'axios'
import type { Ref } from 'vue'
import { useRouter } from 'vue-router'

type Response = { code: number; result: Personalized[] }

const router = useRouter()
const { songStore } = useStore()
let isLoading = ref(false)
let songList: Ref<Personalized[]> = ref([])
let newSongs: Ref<NewSongs[]> = ref([])

function onPlaySong(item: NewSongs) {
  const song = {
    id: item.id,
    name: item.name,
    picUrl: item.picUrl,
    singer: item.song.artists[0].name,
    time: 0,
    size: 0,
    url: ''
  }
  songStore.addSongs(song, 0)
  songStore.playSong(song, getSongUrl({ id: item.id }))
}

function onToSongList(id: number) {
  router.push({ path: '/songList', query: { id } })
}

onMounted(() => {
  isLoading.value = true
  getPersonalized().then((res: AxiosResponse<Response>) => {
    isLoading.value = false
    songList.value = res.data.result
  })

  getPersonalizedNewSong({ limit: 30 }).then((res) => {
    newSongs.value = res.data.result
  })
})
</script>

<template>
  <HomeSkeleton :loading="isLoading">
    <div class="home-box">
      <base-chunk title="歌单" class="chunk">
        <div class="content-box">
          <div
            v-for="item in songList"
            class="content-item"
            :key="item.id"
            @click="onToSongList(item.id)"
          >
            <BaseImage :src="item.picUrl" icon-name="View" />
            <div class="title">{{ item.name }}</div>
            <div class="desc">播放次数： {{ item.playCount }}</div>
            <div class="desc">
              更新时间：{{ new Date(item.trackNumberUpdateTime).toLocaleDateString() }}
            </div>
          </div>
        </div>
      </base-chunk>

      <base-chunk title="新歌推荐" class="chunk">
        <div class="content-box">
          <div
            v-for="item in newSongs"
            class="content-item"
            :key="item.id"
            @click="onPlaySong(item)"
          >
            <BaseImage :src="item.picUrl" icon-name="Play" />
            <div class="title">{{ item.name }}</div>
            <div class="desc">歌手： {{ item.song.artists[0].name }}</div>
          </div>
        </div>
      </base-chunk>
    </div>
  </HomeSkeleton>
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
