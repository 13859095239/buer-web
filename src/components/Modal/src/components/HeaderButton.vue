<!--
  - 自定义顶部右侧操作按钮组件
  - 包含全屏、关闭
  -
  - @author zoulan
  - @since 2025-07-05
  -->
<template>
  <div class="flex flex-row gap-5px">
    <template v-if="basicProps.canFullscreen">
      <Tooltip
        v-if="mode === 'modal'"
        content="最大化"
        placement="top"
        @pointerdown.stop=""
        @pointerup.stop=""
        @pointermove.stop=""
      >
        <div
          class="i-tdesign:fullscreen-1 size-6 color-gray-500"
          role="full"
          @pointerdown.stop=""
          @pointerup.stop=""
          @pointermove.stop=""
          @click="(e: Event) => toggleFullScreen(e, true)"
        />
      </Tooltip>
      <Tooltip
        v-else
        content="还原"
        placement="top"
        @pointerdown.stop=""
        @pointerup.stop=""
        @pointermove.stop=""
      >
        <div
          class="i-tdesign:fullscreen-exit-1 size-6 color-gray-500"
          role="close"
          @pointerdown.stop=""
          @pointerup.stop=""
          @pointermove.stop=""
          @click="(e: Event) => toggleFullScreen(e, false)"
        />
      </Tooltip>
    </template>
    <Tooltip
      content="关闭"
      placement="top"
      @pointerdown="(e: Event) => e.stopPropagation()"
    >
      <div
        class="i-tdesign:close size-6 color-gray-500"
        @click="methods.close?.()"
      />
    </Tooltip>
  </div>
</template>
<script setup lang="ts">
import type { DialogProps } from 'tdesign-vue-next';
import { Tooltip } from 'tdesign-vue-next';
import { toRefs } from 'vue';

import type { BasicModalProps, ModalMethods } from '../types';

interface Props {
  basicProps: BasicModalProps;
  mode: DialogProps['mode'];
  methods: Partial<ModalMethods>;
}
const props = defineProps<Props>();
const { methods, basicProps } = toRefs(props);
function toggleFullScreen(e: Event, value: boolean) {
  e?.stopPropagation();
  e?.preventDefault();
  methods.value.toggleFullScreen?.(value);
}
</script>
