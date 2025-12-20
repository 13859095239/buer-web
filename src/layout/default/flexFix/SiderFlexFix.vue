<!--
  - 解决侧边栏Sider在flex布局下,宽度填充,固定滚动条
  -
  - @author zoulan
  - @since 2023-09-05
  -->
<template>
  <div :style="getStyle"></div>
</template>
<script setup lang="ts">
import type { CSSProperties } from 'vue';
import { computed, unref } from 'vue';

import { useSiderSetting } from '/@/hooks/setting/useSiderSetting';

const { siderWidth } = useSiderSetting();
const getStyle = computed((): CSSProperties => {
  const width = `${unref(siderWidth)}px`;
  return {
    width,
    maxWidth: width,
    minWidth: width,
    flex: `flex: 0 0 ${width}`
  };
});
</script>
