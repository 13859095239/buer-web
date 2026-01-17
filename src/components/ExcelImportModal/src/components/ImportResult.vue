<!--
  - 导入结果显示组件
  -
  - @author zoulan
  - @since 2024-01-01
  -->
<template>
  <div
    v-if="result"
    class="import-result rounded p-4"
    :class="result.hasError ? 'bg-red-50 border border-red-200' : 'bg-green-50 border border-green-200'"
  >
    <div
      class="mb-2 text-sm font-medium"
      :class="result.hasError ? 'text-red-700' : 'text-green-700'"
    >
      {{ result.hasError ? '导入完成，部分数据有异常' : '导入成功' }}
    </div>
    <div
      class="text-sm"
      :class="result.hasError ? 'text-red-600' : 'text-green-600'"
    >
      成功：{{ result.success || 0 }} 条
      <span
        v-if="result.hasError"
        class="ml-4"
        >异常：{{ result.errorCount || 0 }} 条</span
      >
    </div>
    <div
      v-if="result.hasError && showDownloadButton"
      class="mt-3"
    >
      <TButton
        theme="warning"
        variant="outline"
        size="small"
        @click="handleDownload"
      >
        <template #icon>
          <div class="i-tdesign:download mr-1.5 mt-3px"></div>
        </template>
        下载异常文件
      </TButton>
    </div>
  </div>
</template>
<script setup lang="ts">
import { Button as TButton } from 'tdesign-vue-next';

export interface ImportResult {
  success: number;
  hasError: boolean;
  errorCount?: number;
}

interface Props {
  result: ImportResult | null;
  showDownloadButton?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  showDownloadButton: true
});

const emit = defineEmits<{
  download: [];
}>();

const handleDownload = () => {
  emit('download');
};
</script>
