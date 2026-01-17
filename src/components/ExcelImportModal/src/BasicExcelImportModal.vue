<!--
  - Excel导入弹窗组件
  -
  - @author zoulan
  - @since 2025-01-17
  -->
<template>
  <BasicModal
    v-model:visible="visible"
    :title="props.title"
    :width="600"
    :footer="false"
  >
    <div class="excel-import-modal">
      <div class="mb-4">
        <TButton
          theme="default"
          variant="outline"
          @click="handleDownloadTemplate"
        >
          <template #icon>
            <div class="i-tdesign:download mr-1.5 mt-3px"></div>
          </template>
          下载模板
        </TButton>
      </div>

      <t-upload
        v-model="fileList"
        accept=".xls,.xlsx"
        :autoUpload="false"
        :formatResponse="formatResponse"
        :max="1"
        :requestMethod="undefined"
        theme="file"
        @change="handleFileChange"
      >
        <template #uploadTrigger>
          <TButton
            theme="primary"
            :disabled="uploading"
          >
            <template #icon>
              <div class="i-tdesign:cloud-upload mr-1.5 mt-3px"></div>
            </template>
            选择Excel文件
          </TButton>
        </template>
      </t-upload>

      <FileInfo
        :file="selectedFile"
        class="mt-4"
      />

      <ImportResult
        :result="importResult"
        class="mt-4"
        @download="handleDownloadErrorFile"
      />
    </div>

    <template #footer>
      <div class="flex justify-end gap-2">
        <TButton
          theme="default"
          @click="handleClose"
        >
          关闭
        </TButton>
        <TButton
          theme="primary"
          :loading="uploading"
          :disabled="!selectedFile || uploading"
          @click="handleImport"
        >
          开始导入
        </TButton>
      </div>
    </template>
  </BasicModal>
</template>
<script setup lang="ts">
import { Button as TButton } from 'tdesign-vue-next';
import { watch } from 'vue';

import { BasicModal } from '/@/components/Modal';

import FileInfo from './components/FileInfo.vue';
import ImportResult from './components/ImportResult.vue';
import { useErrorFile } from './hooks/useErrorFile';
import { useFile } from './hooks/useFile';
import { useImport } from './hooks/useImport';
import { useTemplate } from './hooks/useTemplate';
import type { BasicExcelImportModalProps, ExcelImportModalEmit } from './types';

const props = withDefaults(defineProps<BasicExcelImportModalProps>(), {
  title: 'Excel数据导入'
});

const emit = defineEmits<ExcelImportModalEmit>();

const visible = defineModel<boolean>('visible', { default: false });

// 使用 hooks
const { fileList, selectedFile, originalFileBuffer, formatResponse, handleFileChange, clearFile } = useFile();
const { handleDownloadTemplate } = useTemplate(props.templateUrl, emit);
const { uploading, importResult, handleImport, clearImportResult } = useImport(props.importUrl, selectedFile, emit);
const { handleDownloadErrorFile } = useErrorFile(originalFileBuffer, importResult, selectedFile);

// 关闭弹窗
const handleClose = () => {
  visible.value = false;
  // 延迟清空，等待弹窗关闭动画完成
  setTimeout(() => {
    clearFile();
    clearImportResult();
  }, 300);
};

// 监听visible变化，重置状态
watch(
  () => visible.value,
  (newVal) => {
    if (!newVal) {
      // 弹窗关闭时清空状态
      setTimeout(() => {
        clearFile();
        clearImportResult();
      }, 300);
    }
  }
);
</script>
<style lang="less" scoped>
.excel-import-modal {
  padding: 20px 0;
}
</style>
