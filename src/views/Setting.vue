<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { Sun, Moon, System } from '@/iconPark/index'
import { useTheme, useChangeTheme } from '@/hooks/theme'

let language = ref('zh-CN')
let format = ref('')

const themeLabelMap = {
  system: '跟随系统',
  light: '明亮',
  dark: '暗黑'
}

const fasts = {
  Space: '播放',
  PgUp: '上一曲',
  PgDn: '下一曲',
  Up: '音量+',
  Down: '音量-'
}

function getSetting() {
  if (!localStorage.getItem('music-player-format')) {
    localStorage.setItem('music-player-format', '1')
  }
  format.value = localStorage.getItem('music-player-format') as string
}

function onToggleFormat(e: string) {
  localStorage.setItem('music-player-format', e)
}

onMounted(() => {
  getSetting()
})
</script>

<template>
  <div class="setting-box">
    <el-row :gutter="10">
      <el-col :span="8">
        <div class="side-title">
          <h3 class="title">主题</h3>
          <sub>自定义您的主题</sub>
        </div>
      </el-col>
      <el-col :span="16">
        <section class="theme-section">
          <div class="title">颜色</div>
          <div class="desc">{{ themeLabelMap[useTheme] }}</div>
          <el-button-group>
            <el-button size="small" :icon="Sun" @click="useChangeTheme('light')" />
            <el-button size="small" :icon="Moon" @click="useChangeTheme('dark')" />
            <el-button size="small" :icon="System" @click="useChangeTheme('system')" />
          </el-button-group>
        </section>

        <section class="theme-section">
          <div class="title">语言</div>
          <div class="desc">简体中文</div>
          <el-select placeholer="请选择您的语言" v-model="language">
            <el-option key="zh-CN" label="简体中文" value="zh-CN"></el-option>
          </el-select>
        </section>
      </el-col>
    </el-row>
    <el-divider />
    <el-row :gutter="10">
      <el-col :span="8">
        <div class="side-title">
          <h3 class="title">常规</h3>
        </div>
      </el-col>
      <el-col :span="16">
        <section class="theme-section">
          <div class="title">下载命名格式</div>
          <div class="desc" />
          <el-radio-group v-model="format" @change="onToggleFormat">
            <el-radio-button label="1">[歌手]-[歌名]</el-radio-button>
            <el-radio-button label="2">[歌名]-[歌手]</el-radio-button>
          </el-radio-group>
        </section>
      </el-col>
    </el-row>
    <el-divider />
    <el-row :gutter="10">
      <el-col :span="8">
        <div class="side-title">
          <h3 class="title">快捷键</h3>
        </div>
      </el-col>
      <el-col :span="16">
        <section class="theme-section">
          <div class="title">快捷键</div>
          <div class="desc" />
          <div class="fast-key" v-for="(key, value) in fasts" :key="key">
            <div class="fast-key-label">{{ key }}</div>
            <kbd>{{ value }}</kbd>
          </div>
        </section>
      </el-col>
    </el-row>
  </div>
</template>

<style scoped lang="scss">
.setting-box {
  padding: 28px 0;

  .side-title {
    padding: 0 18px;

    .title {
      font-weight: bold;
      font-size: 24px;
      margin-bottom: 6px;
    }
  }

  .theme-section {
    margin-bottom: 36px;

    &:last-child {
      margin-bottom: 0;
    }
    .title {
      font-weight: bold;
      font-size: 16px;
    }
    .desc {
      color: #919aa5;
      margin: 12px 0;
    }

    .fast-key {
      display: flex;
      align-items: center;
      margin-bottom: 8px;
      .fast-key-label {
        width: 80px;
      }
    }
  }
}
</style>
