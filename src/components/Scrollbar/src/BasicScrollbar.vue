<!--
  - 滚动条 组件
  -
  - @author zoulan
  - @since 2024-08-03
  -->
<template>
  <div ref="scrollbar">
    <slot></slot>
  </div>
</template>
<script setup lang="ts">
import Scrollbar from 'smooth-scrollbar';
import { ref } from 'vue';

import { templateLoaded } from '/@/utils/template';

const scrollbar = ref<HTMLElement>();
templateLoaded(scrollbar).then(() => {
  Scrollbar.init(scrollbar.value!, {});
});
</script>
