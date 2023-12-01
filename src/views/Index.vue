<script setup lang="ts">
import { ref, onMounted } from 'vue'
import zhini from '@/static/zhini.mp3'
import { play, start, next, pause } from '@/svgIcon/index'

import type { Ref } from 'vue'

let isPlay: Ref<boolean> = ref(false)
let audioRef: Ref<HTMLAudioElement | null> = ref(null)
let visualRef: Ref<HTMLCanvasElement | null> = ref(null)
let ctx: Ref<CanvasRenderingContext2D | null> = ref(null)
let analyser: AnalyserNode | null = null
let dataArray: Uint8Array | null = null
let audCtx: AudioContext | null = null
let source: MediaElementAudioSourceNode | null = null

const onPlayChange = () => {
  if (!audCtx && !source) {
    audCtx = new AudioContext()
    source = audCtx.createMediaElementSource(audioRef.value!)
  }

  if (isPlay.value) {
    audioRef.value!.pause()
  } else {
    audioRef.value!.play()
    analyser = audCtx!.createAnalyser()
    analyser.fftSize = 512
    dataArray = new Uint8Array(analyser.frequencyBinCount)
    source!.connect(analyser)
    analyser.connect(audCtx!.destination)
    draw()
  }
  isPlay.value = !isPlay.value
}

const draw = () => {
  if (!visualRef.value) return
  requestAnimationFrame(draw)
  const { width, height } = visualRef.value
  ctx.value!.clearRect(0, 0, width, height)
  ctx.value!.fillStyle = '#1d232a'
  ctx.value!.fillRect(0, 0, width, height)
  ctx.value!.fillStyle = '#78c5f7'
  analyser!.getByteFrequencyData(dataArray!)
  const barWidth = width / dataArray!.length
  if (dataArray && dataArray.length && ctx.value) {
    for (let i = 0; i < dataArray.length / 2; i++) {
      const barHeight = (dataArray[i] / 255) * height
      ctx.value.fillRect(i * barWidth + width / 2, height - barHeight, barWidth - 1, barHeight)
      ctx.value.fillRect(
        width / 2 - (i + 1) * barWidth,
        height - barHeight,
        barWidth - 1,
        barHeight
      )
    }
  }
}

const initCvs = () => {
  visualRef.value!.width = window.innerWidth
  visualRef.value!.height = window.innerHeight - 148
  ctx.value = visualRef.value!.getContext('2d')
  const { width, height } = visualRef.value!
  ctx.value!.fillStyle = '#1d232a'
  ctx.value!.fillRect(0, 0, width, height)
}

onMounted(() => {
  initCvs()
})
</script>

<template>
  <div>
    <canvas class="w-full" ref="visualRef"></canvas>
    <div>
      <audio ref="audioRef" :src="zhini"></audio>
      <div
        class="flex items-center h-[68px] gap-4 justify-center absolute bottom-0 w-full bg-slate-900"
      >
        <start class="cursor-pointer" />
        <div @click="onPlayChange">
          <play v-show="!isPlay" class="cursor-pointer" />
          <pause v-show="isPlay" class="cursor-pointer" />
        </div>
        <next class="cursor-pointer" />
      </div>
    </div>
  </div>
</template>
