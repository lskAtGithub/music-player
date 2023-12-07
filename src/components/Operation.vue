<script setup lang="ts">
import { More } from '@/iconPark'
import { ElMessage } from 'element-plus'
import useStore from '@/store'
import { inject } from 'vue'

import type { SongDetail } from '@/types/Song'
import type { PropType, Ref } from 'vue'

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

const { addSongs, removeSong, playSong } = useStore().songStore
const audioRef = inject('audioRef') as Ref<HTMLAudioElement>

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
  addSongs(props.row, 1)
}
function onRemove() {
  removeSong(props.row)
}

async function onPlay() {
  await playSong(props.row)
  audioRef.value.play()
}
</script>

<template>
  <el-dropdown trigger="click">
    <span style="cursor: pointer"> <More /> </span>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item @click="onPlay">播放</el-dropdown-item>
        <el-dropdown-item @click="onNextPlay">下一首播放</el-dropdown-item>
        <el-dropdown-item v-if="props.hasPush" @click="onPushList">添加到播放列表</el-dropdown-item>
        <el-dropdown-item @click="copyText">复制歌名</el-dropdown-item>
        <el-dropdown-item v-if="!props.hasPush" @click="onRemove">从列表删除</el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<style scoped lang="scss"></style>
