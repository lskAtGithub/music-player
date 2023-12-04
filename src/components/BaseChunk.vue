<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { Right, Left } from '@/iconPark'

type Direction = 'left' | 'right'

const props = defineProps({
  title: String
})

let contentRef = ref()
let currentPage = ref(0)
let totalPage = ref(1)

function onMove(direction: Direction) {
  let nowOffset = 0
  const offsetX = contentRef.value.clientWidth - 24
  if (contentRef.value.style.transform) {
    const css = CSSStyleValue.parse('transform', contentRef.value.style.transform)
    nowOffset = (css as any)[0].x.value
  }
  let value = 0
  if (direction === 'left') {
    currentPage.value--
    value = offsetX + nowOffset
  } else {
    currentPage.value++
    value = -offsetX + nowOffset
  }
  contentRef.value.style.transform = `translateX(${value}px)`
}

onMounted(() => {
  const observer = new MutationObserver(() => {
    totalPage.value = Math.floor(contentRef.value.scrollWidth / (contentRef.value.clientWidth - 24))
  })
  observer.observe(contentRef.value, {
    attributes: true,
    childList: true,
    subtree: true
  })
})
</script>

<template>
  <section class="chunk-box">
    <div class="chunk-title">
      <div class="title">
        {{ props.title }}
        <Right />
      </div>
      <div class="control">
        <el-button
          :icon="Left"
          :disabled="currentPage <= 0"
          circle
          @click="onMove('left')"
        ></el-button>
        <el-button
          :icon="Right"
          :disabled="currentPage >= totalPage"
          circle
          @click="onMove('right')"
        ></el-button>
      </div>
    </div>
    <div class="content" ref="contentRef">
      <slot />
    </div>
  </section>
</template>

<style scoped lang="scss">
.chunk-box {
  width: 100%;
  overflow-x: hidden;

  .chunk-title {
    display: flex;
    align-items: center;
    padding: 8px 12px;
    justify-content: space-between;

    .title {
      font-weight: bold;
      font-size: 18px;
      display: flex;
      align-items: center;
      gap: 4px;
      cursor: pointer;
    }
  }
  .content {
    padding: 0 12px;
    transition: 0.3s;
  }
}
</style>
