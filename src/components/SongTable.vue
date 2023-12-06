<script setup lang="ts">
import type { PropType } from 'vue'

type FixedType = 'left' | 'right' | true
type AlignType = 'left' | 'center' | 'right'
type ColumnItem =
  | ({ slotName: string } & { prop?: never })
  | (({ prop: string } & { slotName?: never }) & {
      width?: string | number
      type?: string
      index?: number
      label: string
      ['column-key']?: string
      ['min-width']?: string | number
      fixed?: FixedType
      align?: AlignType
      ['class-name']?: string
    })

const props = defineProps({
  list: {
    type: Array,
    default: () => []
  },
  columns: {
    type: Array as PropType<ColumnItem[]>,
    default: () => []
  }
})
</script>

<template>
  <el-table :data="props.list" style="width: 100%">
    <el-table-column v-for="item in props.columns" v-bind="item">
      <template v-slot="scope">
        <slot v-if="item.slotName" :name="item.slotName" :scope="scope.row" />
      </template>
    </el-table-column>
  </el-table>
</template>

<style scoped lang="scss">
* {
  user-select: none;
}
</style>
