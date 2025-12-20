<template>
  <Tooltip
    :title="title"
    placement="bottom"
    :mouseEnterDelay="0.5"
  >
    <Button
      shape="circle"
      variant="text"
      class="px-6px"
      @click="toggle"
    >
      <div
        v-if="!isFullscreen"
        class="i-mdi:fullscreen transform text-24px transition-800 hover:rotate-180"
      />
      <div
        v-else
        class="i-mdi:fullscreen-exit text-24px"
      />
    </Button>
  </Tooltip>
</template>
<script setup lang="ts">
import { useFullscreen } from '@vueuse/core';
import { Button, Tooltip } from 'tdesign-vue-next';
import { computed, unref } from 'vue';

const { toggle, isFullscreen } = useFullscreen();
const title = computed(() => {
  return unref(isFullscreen) ? '取消全屏' : '全屏';
});
</script>
