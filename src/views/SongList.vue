<script setup lang="ts">
import { onMounted, ref, reactive } from 'vue'
import { getListDetail } from '@/api/list'
import { useRoute } from 'vue-router'
import { Play, AddMusic } from '@/iconPark'
import SongTable from '@/components/SongTable.vue'
import SongListSkeleton from '@/components/skeleton/SongListSkeleton.vue'
import useStore from '@/store'
import Operation from '@/components/Operation.vue'
import { storeToRefs } from 'pinia'
import { ElMessage, ElMessageBox } from 'element-plus'

import { unique } from '@/utils/tool'

import type { SongDetail } from '@/types/Song'

const tabColumn = [
  { label: '音乐标题', slotName: 'name' },
  { label: '歌手', prop: 'singer', width: 120 },
  { label: '专辑', prop: 'album', width: 150 },
  { label: ' ', slotName: 'operation', width: 80 }
]

const route = useRoute()
const { songs, currentSong } = storeToRefs(useStore().songStore)
const { playSong, addSongs, playStatus, replaceSongs } = useStore().songStore

let loading = ref(true)

const data = reactive({
  createTime: '',
  creator: {
    nickname: ''
  },
  coverImgUrl: '',
  description: '',
  name: '',
  tracks: [],
  updateTime: ''
})

function getDetail() {
  getListDetail({ id: route.query.id as string }).then((res) => {
    if (res.data.playlist && res.data.playlist.tracks) {
      res.data.playlist.tracks.map((item: any) => {
        item.singer = item.ar[0].name
        item.picUrl = item.al.picUrl
        item.album = item.al.name
      })

      Object.assign(data, res.data.playlist)
      loading.value = false
    }
  })
}
async function onDbClick(row: any) {
  const song: SongDetail = {
    id: row.id,
    picUrl: row.picUrl,
    name: row.name,
    singer: row.ar[0].name,
    time: 0,
    size: 0,
    url: ''
  }
  addSongs(song, 0)
  playStatus()
  playSong(song)
}

function onPlayAll() {
  ElMessageBox.confirm('该操作会替换整个播放列表，是否继续?', '提示', {
    confirmButtonText: '确 定',
    cancelButtonText: '取 消',
    type: 'info'
  }).then(() => {
    const songList = unique([...data.tracks])
    replaceSongs(songList)
    currentSong.value = songs.value[0]
    playStatus()
    playSong(currentSong.value)
  })
}

function onAddSongS() {
  const songList = unique([...songs.value, ...data.tracks])
  replaceSongs(songList)
}

onMounted(() => {
  getDetail()
})
</script>

<template>
  <SongListSkeleton :loading="loading">
    <div class="song-list-box">
      <div class="bg-wrapper">
        <img :src="data.coverImgUrl" alt="" />
      </div>
      <div class="songs-header">
        <img class="main-img" :src="data.coverImgUrl" alt="" />
        <div class="control-box">
          <div class="title">{{ data.name }}</div>
          <div class="info">
            {{ data.creator.nickname }} · 创建于
            {{ new Date(data.createTime).toLocaleDateString() }}
          </div>
          <div class="desc">{{ data.description }}</div>
          <div>
            <el-button-group size="default">
              <el-button type="primary" :icon="Play" @click="onPlayAll">播放全部</el-button>
              <el-button type="primary" :icon="AddMusic" @click="onAddSongS" />
            </el-button-group>
          </div>
        </div>
      </div>
      <song-table :list="data.tracks" :columns="tabColumn" @row-dblclick="onDbClick">
        <template #name="{ scope }">
          <div class="song-name">
            <img :src="scope.picUrl" alt="" />
            <span>{{ scope.name }}</span>
          </div>
        </template>
        <template #operation="{ scope }">
          <operation
            :row="{
              id: scope.id,
              name: scope.name,
              picUrl: scope.picUrl,
              singer: scope.ar[0].name,
              time: 0,
              size: 0,
              url: ''
            }"
          />
        </template>
      </song-table>
    </div>
  </SongListSkeleton>
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
