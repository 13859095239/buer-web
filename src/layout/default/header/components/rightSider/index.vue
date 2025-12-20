<!--
  - 顶部右侧操作区域
  -
  - @author zoulan
  - @since 2023-09-05
  -->
<template>
  <div class="flex items-center pr-10px text-right leading-46px space-x-2px">
    <AppDarkModeButton class="h-46px items-center" />
    <FullScreen class="h-46px items-center" />
    <UserDropdown class="h-46px items-center" />
    <Setting class="h-46px items-center" />
  </div>
</template>
<script setup lang="ts">
import AppDarkModeButton from '/@/components/Application/src/AppDarkModeButton.vue';

import FullScreen from './components/FullScreen.vue';
import Setting from './components/setting/index.vue';
import UserDropdown from './components/userDropdown/index.vue';
</script>
<style scoped>
:deep(svg) {
  width: 16px;
  height: 16px;
}
</style>
