<script setup lang="ts">
import { More } from '@/iconPark'
import { ElMessage } from 'element-plus'
import useStore from '@/store'
import { storeToRefs } from 'pinia'

import type { SongDetail } from '@/types/Song'
import type { PropType } from 'vue'

const props = defineProps({
  row: {
    type: Object as PropType<SongDetail>,
    required: true
  },
  hasPush: {
    type: Boolean,
    default: () => true
  }
})

const { addSongs, removeSong, playSong, playStatus } = useStore().songStore
const { currentSong, songs } = storeToRefs(useStore().songStore)

function copyText() {
  const clipboard = navigator.clipboard
  const text = props.row.name
  try {
    clipboard.writeText(text)
    ElMessage.success('复制成功')
  } catch (err) {
    ElMessage.error('复制失败请重试')
  }
}
function onPushList() {
  addSongs(props.row)
}
function onNextPlay() {
  const idx = songs.value.findIndex((item) => item.id === currentSong.value.id)
  addSongs(props.row, idx + 1)
}
function onRemove() {
  removeSong(props.row)
}

async function onPlay() {
  const idx = songs.value.findIndex((item) => item.id === currentSong.value.id)
  addSongs(props.row, idx + 1 || 0)
  playStatus()
  playSong(props.row)
}

function isPlay() {
  return !(props.row.id === currentSong.value.id)
}
</script>

<template>
  <el-dropdown trigger="click">
    <span style="cursor: pointer"> <More /> </span>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item v-if="isPlay()" @click="onPlay">播放</el-dropdown-item>
        <el-dropdown-item v-if="isPlay()" @click="onNextPlay">下一首播放</el-dropdown-item>
        <el-dropdown-item v-if="props.hasPush" @click="onPushList">
          添加到播放列表
        </el-dropdown-item>
        <el-dropdown-item @click="copyText">复制歌名</el-dropdown-item>
        <el-dropdown-item v-if="!props.hasPush" @click="onRemove">从列表删除</el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<style scoped lang="scss"></style>
