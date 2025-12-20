<!--
  - 自定义顶部左侧标题组件
  -
  - @author zoulan
  - @since 2025-07-05
  -->
<template>
  <div class="relative flex flex-nowrap">
    <div v-if="basicProps.title">{{ basicProps.title }}</div>
    <template v-if="basicProps.miniTitles">
      <div
        v-for="(item, index) in basicProps.miniTitles"
        :key="index"
      >
        <span>{{ item.name }}</span>
        <span>{{ item.value }}</span>
      </div>
    </template>
  </div>
</template>
<script lang="ts" setup>
import { toRefs } from 'vue';

import type { BasicModalProps } from '../types';

interface Props {
  basicProps: BasicModalProps;
}
const props = defineProps<Props>();
const { basicProps } = toRefs(props);
</script>
