<!--
  - 动画设置
  -
  - @author zoulan
  - @since 2025-06-29
  -->
<template>
  <div class="grid grid-cols-4 w-full gap-4">
    <div
      v-for="key in TRANSITION_ANIMATION_MODE_ENUM"
      :key="key"
      class="flex flex-col cursor-pointer"
      @click="handler(key)"
    >
      <div
        :class="{
          'outline-box-active': key === value
        }"
        class="outline-box flex-center px-6 py-2"
      >
        <div
          :class="`${key}-slow`"
          class="h-10 w-12 rounded-md"
          :style="{
            'background-color': 'var(--td-brand-color)'
          }"
        ></div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { TRANSITION_ANIMATION_MODE_ENUM } from '/@/constants/appConstants';

import { HandlerEnum } from '../enum';
import { useHandler } from '../handler';

const [value, handler] = useHandler(HandlerEnum.CHANGE_TRANSITION_ANIMATION_MODE);
</script>
