<script setup lang="ts">
import SideMenu from '@/components/SideMenu.vue'
import BottomController from '@/components/BottomController.vue'
import SongList from '@/components/SongList.vue'
import MainHeader from '@/components/MainHeader.vue'
</script>

<template>
  <div class="container">
    <div class="menu-box">
      <SideMenu />
    </div>
    <div class="main-box">
      <MainHeader />
      <SongList />
    </div>
  </div>
  <div class="controller-box">
    <BottomController />
  </div>
</template>

<style scoped lang="scss">
.container {
  display: flex;
  height: 100vh;
  overflow: auto;
  .menu-box {
    width: 215px;
  }
  .main-box {
    flex: 1;
  }
}
.controller-box {
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  z-index: 2;
}
</style>
