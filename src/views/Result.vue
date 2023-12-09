<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { getSearch } from '@/api/list'
import { useRoute, useRouter } from 'vue-router'
import { Search } from '@/iconPark/index'
import SongTable from '@/components/SongTable.vue'
import { vLoading } from 'element-plus'
import Operation from '@/components/Operation.vue'

import type { Ref } from 'vue'
import type { SongDetail } from '@/types/Song'

const columns = [
  { label: '歌曲', prop: 'name' },
  { label: '歌手', prop: 'singer', width: 120 },
  { label: '专辑', prop: 'album', width: 150 },
  { label: ' ', slotName: 'operation', width: 60 }
]

const route = useRoute()
const router = useRouter()
let loading = ref(true)
let keywords: Ref<string> = ref('')
let dataSource: Ref<SongDetail[]> = ref([])

function onSearch() {
  if (keywords.value !== '') {
    router.replace({
      path: '/result',
      query: {
        keywords: keywords.value
      }
    })
    getResult()
  }
}

async function getResult() {
  loading.value = true
  const res = await getSearch({ keywords: keywords.value })
  dataSource.value = res.data.result.songs.map((item: any) => ({
    id: item.id,
    name: item.name,
    singer: item.ar[0].name,
    picUrl: item.al.picUrl,
    url: '',
    time: '',
    size: '',
    album: item.al.name
  }))
  loading.value = false
}

onMounted(async () => {
  keywords.value = route.query.keywords as string
  getResult()
})
</script>

<template>
  <div class="result-box">
    <div class="search">
      <el-input type="text" :prefix-icon="Search" v-model="keywords" @keyup.enter="onSearch" />
    </div>
    <div class="label-box">
      <span class="label-fix">搜索结果</span>
      <el-divider direction="vertical" />
      <span class="label active">单曲</span>
    </div>
    <el-divider />
    <div v-loading="loading">
      <song-table :columns="columns" :list="dataSource">
        <template #operation="{ scope }">
          <operation :row="scope" :has-push="false" />
        </template>
      </song-table>
    </div>
  </div>
</template>

<style scoped lang="scss">
.result-box {
  padding: 0 12px;
  .search {
    width: 60%;
    margin: 24px auto;
  }

  .label-box {
    display: flex;
    align-items: center;

    .label-fix {
      font-weight: bold;
      font-size: 18px;
    }
    .label {
      &.active {
        color: var(--el-color-primary);
      }
    }
  }
}
</style>
