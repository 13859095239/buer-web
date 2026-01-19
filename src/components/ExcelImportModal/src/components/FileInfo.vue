<!--
  - 文件信息显示组件
  -
  - @author zoulan
  - @since 2024-01-01
  -->
<template>
  <!-- 文件格式提示 -->
  <div class="file-format-tip rounded bg-blue-50 border border-blue-200 p-3 mb-3">
    <div class="text-sm text-blue-700">
      <i class="fas fa-info-circle mr-1"></i>
      仅支持导入 Excel 文件（.xls、.xlsx 格式）
    </div>
  </div>

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

import { formatFileSizeByBytes } from '/@/utils/format';

interface Props {
  file: File | null;
}

const props = defineProps<Props>();

const fileSize = computed(() => {
  return props.file ? formatFileSizeByBytes(props.file.size) : '0 B';
});
</script>
