<!--
  - 主题颜色设置
  -
  - @author zoulan
  - @since 2025-06-29
  -->
<template>
  <div class="grid grid-cols-3 w-full gap-4">
    <div
      v-for="(item, index) in COLOR_MODE_LIST"
      :key="index"
      class="flex flex-col cursor-pointer"
      @click="colorhandler(item)"
    >
      <div
        :class="{
          'outline-box-active': isCustom ? item.type === 'custom' : item.color === value
        }"
        class="outline-box flex-center px-6 py-2"
      >
        <!-- 自定义颜色 -->
        <ColorPicker
          v-if="item.type === 'custom'"
          v-model="value"
          class="z-99"
          format="HEX"
          :colorModes="['monochrome']"
          :showPrimaryColorPreview="false"
          @change="(color) => handler(color)"
        />
        <!-- 系统预制颜色 -->
        <div
          v-else
          class="size-5 rounded-3"
          :style="{ backgroundColor: item.color }"
        ></div>
      </div>
      <div class="mt-2 text-center text-xs">{{ item.name }}</div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ColorPicker } from 'tdesign-vue-next';
import { computed, unref } from 'vue';

import type { ColorMode } from '/@/settings/projectSetting';
import { COLOR_MODE_LIST } from '/@/settings/projectSetting';

import { HandlerEnum } from '../enum';
import { useHandler } from '../handler';

const [value, handler] = useHandler(HandlerEnum.CHANGE_COLOR_MODE);
// 是否自定义颜色
const isCustom = computed(() => {
  return COLOR_MODE_LIST.find((item) => item.color === unref(value)) === undefined;
});
// 改变触发
function colorhandler(item: ColorMode) {
  // 自定义颜色，不触发事件
  if (item.type === 'custom') return false;
  handler(item.color);
}
</script>
<style lang="less" scoped>
// ColorPicker组件样式修改
:deep {
  .t-color-picker__trigger {
    .t-input__wrap.t-input--auto-width {
      @apply min-w-5  w-5;
      .t-input {
        @apply border-none h-5 p-none;
        .t-input__inner {
          @apply hidden;
        }
        .color-inner {
          @apply rounded-3 size-5;
        }
      }
    }
  }
}
</style>
