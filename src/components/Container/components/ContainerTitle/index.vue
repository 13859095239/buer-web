<!--
  - 左边标题栏
  -
  - @author zoulan
  - @since 2024-06-05
  -->
<template>
  <div class="flex items-center">
    <div class="pr-20">
      <Tag
        shape="round"
        class="px-9 py-4"
        theme="default"
      >
        <template #icon>
          <div
            v-if="titleIcon !== undefined"
            :class="getIcon(titleIcon)"
            class="m-r-5px size-16px p-b-1px"
          />
        </template>
        {{ title }}
      </Tag>
    </div>
    <Space :size="15">
      <div
        v-for="(item, index) in subTitles"
        :key="index"
      >
        <Tag
          :color="item.color"
          @click="item?.onClick"
          >{{ item.label }}
        </Tag>
      </div>
    </Space>
  </div>
</template>
<script setup lang="ts">
import { Space, Tag } from 'tdesign-vue-next';
import { toRefs } from 'vue';

import type { SubTitleTag } from '/@/components/Container';

interface Props {
  title?: string;
  titleIcon?: string;
  subTitles?: SubTitleTag[];
}
const props = defineProps<Props>();
const { title, titleIcon, subTitles } = toRefs(props);
function getIcon(actionIcon?: string): string {
  switch (actionIcon) {
    case 'flow':
      return 'i-tdesign:article';
  }
  return 'i-tdesign:chart-analytics';
}
</script>
