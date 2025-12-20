<!--
  - 导航栏模式布局设置
  -
  - @author zoulan
  - @since 2025-06-29
  -->
<template>
  <div class="grid grid-cols-3 w-full gap-x-4">
    <div
      v-for="(item, index) in LAYOUT_MODE_LIST"
      :key="index"
      class="w-100px flex flex-col cursor-pointer"
      @click="handler(item.value)"
    >
      <div
        :class="{
          'outline-box-active': item.value === value
        }"
        class="outline-box flex-center"
      >
        <component
          :is="getIcon(item.value)"
          class="h-13 w-18"
        />
      </div>
      <div class="text-muted-foreground mb-4 mt-2 text-center text-xs">
        <Tooltip :content="item.tip">
          {{ item.name }}
          <div class="i-mdi:help-circle-outline size-4"></div>
        </Tooltip>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { Tooltip } from 'tdesign-vue-next';
import { h } from 'vue';

import { LAYOUT_MODE_LIST } from '/@/settings/projectSetting';

import { HandlerEnum } from '../../enum';
import { useHandler } from '../../handler';
import {
  ContentCompact,
  FullContent,
  HeaderMixedNav,
  HeaderNav,
  HeaderSidebarNav,
  MixedNav,
  SidebarMixedNav,
  SidebarNav
} from './icons';

const [value, handler] = useHandler(HandlerEnum.CHANGE_LAYOUT_MODE);
function getIcon(value: string) {
  switch (value) {
    case 'sidebarNav':
      return h(SidebarNav);
    case 'sidebarMixedNav':
      return h(SidebarMixedNav);
    case 'headerNav':
      return h(HeaderNav);
    case 'headerSidebarNav':
      return h(HeaderSidebarNav);
    case 'mixedNav':
      return h(MixedNav);
    case 'headerMixedNav':
      return h(HeaderMixedNav);
    case 'fullContent':
      return h(FullContent);
    case 'contentCompact':
      return h(ContentCompact);
  }
}
</script>
