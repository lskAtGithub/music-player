<script setup lang="ts">
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import { User, Right, Setting, Home, Find } from '@/iconPark'
import { ElMessage } from 'element-plus'

const route = useRoute()

function onLogin() {
  ElMessage.warning('该功能目前处于测试中，暂未开放，敬请期待...')
}
</script>

<template>
  <div class="side-menu">
    <div class="login-box" @click="onLogin">
      <div class="icon">
        <User />
      </div>
      <div class="entry">点击登录</div>
      <Right />
    </div>
    <el-menu :default-active="route.path" router>
      <el-menu-item index="/" route="/">
        <el-icon><Home /></el-icon>
        <span>首页</span>
      </el-menu-item>
      <el-menu-item index="/explore" route="/explore">
        <el-icon><Find /></el-icon>
        <span>探索</span>
      </el-menu-item>
      <el-menu-item index="/setting" route="/setting">
        <el-icon><Setting /></el-icon>
        <span>设置</span>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<style scoped lang="scss">
.side-menu {
  height: 100%;
  background: var(--color-menu-bg);
  padding: 1px 0;

  .login-box {
    margin: 30px 0 20px;
    display: flex;
    align-items: center;
    user-select: none;
    padding: 0 12px;
    .icon {
      padding: 8px 10px;
      border-radius: 50%;
      background: var(--color-icon-bg);
    }
    .entry {
      font-size: 16px;
      flex: 1;
      font-weight: bold;
      padding: 0 8px;
      cursor: pointer;
    }
  }
}
</style>
