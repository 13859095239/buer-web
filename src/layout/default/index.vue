<!--
  - layout 入口框架页面
  -
  - @author zoulan
  - @since 2023-09-05
  -->
<template>
  <!-- 水印 -->
  <Watermark
    :zIndex="1000"
    :alpha="0.6"
    :watermarkContent="{ text: showWatermark ? miniTitle : undefined }"
    :y="120"
    :x="80"
    :width="120"
    :height="60"
    removable
    class="full"
  >
    <!-- 框架页内容 -->
    <template #content>
      <HeaderSidebarPage v-if="layoutMode === LAYOUT_MODE_ENUM.HEADER_Sidebar_NAV" />
      <SidebarMixedPage v-if="layoutMode === LAYOUT_MODE_ENUM.SIDEBAR_MIXED_NAV" />
      <SidebarPage v-else-if="layoutMode === LAYOUT_MODE_ENUM.SIDEBAR_NAV" />
      <HeaderMixedPage v-else-if="layoutMode === LAYOUT_MODE_ENUM.HEADER_MIXED_NAV" />
      <HeaderPage v-else-if="layoutMode === LAYOUT_MODE_ENUM.HEADER_NAV" />
      <MixedNavPage v-else-if="layoutMode === LAYOUT_MODE_ENUM.MIXED_NAV" />
    </template>
  </Watermark>
</template>
<script setup lang="ts">
import { Watermark } from 'tdesign-vue-next';

import { LAYOUT_MODE_ENUM } from '/@/constants/appConstants';
import { useRootSetting } from '/@/hooks/setting/useRootSetting';

import HeaderMixedPage from './page/HeaderMixedPage.vue';
import HeaderPage from './page/HeaderPage.vue';
import HeaderSidebarPage from './page/HeaderSidebarPage.vue';
import MixedNavPage from './page/MixedNavPage.vue';
import SidebarMixedPage from './page/SidebarMixedPage.vue';
import SidebarPage from './page/SidebarPage.vue';

const { layoutMode, showWatermark } = useRootSetting();
const miniTitle = window.config.miniTitle;
</script>
