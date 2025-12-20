<template>
  <Button
    variant="text"
    class="h-38px w-37px border-r rounded-none border-y-none border-l-none px-6px border-[var(--td-component-border)]!"
    @click="handleClick"
  >
    <div :class="getIcon" />
  </Button>
</template>
<script setup lang="ts">
import { Button } from 'tdesign-vue-next';
import { computed, unref } from 'vue';

import { useRootSetting } from '/@/hooks/setting/useRootSetting';

const { contentFullscreen, toogleContent } = useRootSetting();
// 根据contentFullscreen,获取当前图标
const getIcon = computed(() =>
  !unref(contentFullscreen) ? 'i-codicon:screen-full' : 'i-tdesign:fullscreen-exit size-16px'
);
function handleClick() {
  const isUnFold = !unref(contentFullscreen);
  toogleContent(isUnFold);
}
</script>
