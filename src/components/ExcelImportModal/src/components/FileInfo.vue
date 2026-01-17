<!--
  - 文件信息显示组件
  -
  - @author zoulan
  - @since 2024-01-01
  -->
<template>
  <div
    v-if="file"
    class="file-info rounded bg-gray-50 p-3"
  >
    <div class="text-sm text-gray-600">
      已选择文件：<span class="text-gray-800 font-medium">{{ file.name }}</span>
    </div>
    <div class="mt-1 text-xs text-gray-500">文件大小：{{ fileSize }}</div>
  </div>
</template>
<script setup lang="ts">
import { computed } from 'vue';

import { formatFileSize } from '../utils/fileUtil';

interface Props {
  file: File | null;
}

const props = defineProps<Props>();

const fileSize = computed(() => {
  return props.file ? formatFileSize(props.file.size) : '0 B';
});
</script>
