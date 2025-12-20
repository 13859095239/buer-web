<!--
  - 主题设置
  -
  - @author zoulan
  - @since 2025-06-29
  -->
<template>
  <div class="grid grid-cols-3 w-full gap-x-4">
    <div
      v-for="(item, index) in data"
      :key="index"
      class="flex flex-col cursor-pointer"
      @click="handler(item.themeMode)"
    >
      <div
        :class="{
          'outline-box-active': item.themeMode === value
        }"
        class="outline-box flex-center px-8 py-4"
      >
        <div
          :class="item.icon"
          class="text-24px"
        ></div>
      </div>
      <div class="text-muted-foreground mt-2 text-center text-xs">{{ item.name }}</div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { THEME_ENUM } from '/@/constants/appConstants';

import { HandlerEnum } from '../enum';
import { useHandler } from '../handler';

const data = [
  { name: '浅色', icon: 'i-carbon-sun', themeMode: THEME_ENUM.LIGHT },
  { name: '深色', icon: 'i-carbon-moon', themeMode: THEME_ENUM.DARK },
  { name: '跟随系统', icon: 'i-material-symbols-light:window', themeMode: 'auto' }
];
const [value, handler] = useHandler(HandlerEnum.CHANGE_THEME_MODE);
</script>
