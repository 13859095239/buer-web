<!--
  - Excel导入弹窗组件
  -
  - @author zoulan
  - @since 2025-01-17
  -->
<template>
  <BasicModal
    v-model:methods="modalMethods"
    :title="props.title"
    :width="600"
    :footer="false"
    :onClosed="handleClosed"
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
import { ref } from 'vue';

import type { ModalMethods } from '/@/components/Modal';
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

const modalMethods = ref<ModalMethods>({} as ModalMethods);

// 使用 hooks
const { fileList, selectedFile, originalFileBuffer, formatResponse, handleFileChange, clearFile } = useFile();
const { handleDownloadTemplate } = useTemplate(props.templateUrl, emit);
const { uploading, importResult, handleImport, clearImportResult } = useImport(props.importUrl, selectedFile, emit);
const { handleDownloadErrorFile } = useErrorFile(originalFileBuffer, importResult, selectedFile);

// 打开弹窗
const showModal = () => {
  // 打开前重置状态，避免上一次数据残留
  clearFile();
  clearImportResult();
  modalMethods.value.show();
};

// 关闭弹窗
const handleClose = () => {
  modalMethods.value.close();
};

// 弹窗关闭后清空状态（延迟以配合关闭动画）
const handleClosed = () => {
  setTimeout(() => {
    clearFile();
    clearImportResult();
  }, 300);
};

// 对外暴露方法
defineExpose({
  showModal,
  closeModal: handleClose
});
</script>
<style lang="less" scoped>
.excel-import-modal {
  padding: 20px 0;
}
</style>
