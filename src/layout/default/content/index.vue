<!--
  - 框架内容页
  -
  - @author zoulan
  - @since 2023-09-05
  -->
<template>
  <Content class="relative full overflow-x-hidden overflow-y-auto">
    <PageLayout />
  </Content>
</template>
<script setup lang="ts">
import { Content } from 'tdesign-vue-next';
import type { CSSProperties } from 'vue';
import { computed, unref } from 'vue';

import { useSiderSetting } from '/@/hooks/setting/useSiderSetting';
import { useWindowSizeFn } from '/@/hooks/web/useWindowSizeFn';
import { useAppStore } from '/@/store/modules/app';

import PageLayout from './pageContent/index.vue';

const { siderWidth } = useSiderSetting();
const appStore = useAppStore();
const getStyle = computed((): CSSProperties => {
  /** 顶部菜单宽度偏差值 */
  const offsetWidth = `${unref(siderWidth)}px`;
  return {
    width: `calc(100% - ${offsetWidth})`
  };
});
const { windowHeight } = useWindowSizeFn(() => {
  appStore.setContentHeight(windowHeight.value);
});
</script>
