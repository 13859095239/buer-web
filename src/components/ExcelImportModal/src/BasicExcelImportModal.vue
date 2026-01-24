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
    <div class="py-5">
      <div class="mb-4">
        <Button
          theme="default"
          variant="outline"
          @click="handleDownloadTemplate"
        >
          <template #icon>
            <div class="i-tdesign:download mr-1.5 mt-3px"></div>
          </template>
          下载模板
        </Button>
      </div>

      <div
        ref="dragAreaRef"
        class="relative w-220px select-none border-2 rounded border-dashed transition-all duration-300 ease"
        :class="[
          isDragActive
            ? 'border-[var(--td-brand-color)] bg-[var(--td-brand-color-light-active)]'
            : 'border-[var(--td-component-border)] bg-[var(--td-bg-color-container)] hover:border-[var(--td-brand-color)] hover:bg-[var(--td-bg-color-container-hover)]'
        ]"
        @drop="handleDrop"
        @dragover="handleDragOver"
        @dragenter="handleDragEnter"
        @dragleave="handleDragLeave"
      >
        <Upload
          v-model="fileList"
          accept=".xls,.xlsx"
          :autoUpload="false"
          :formatResponse="formatResponse"
          :max="1"
          :requestMethod="undefined"
          theme="custom"
          class="w-full"
          @change="handleFileChange"
        >
          <template #default>
            <div class="flex flex-col cursor-pointer items-center justify-center px-5 py-10">
              <div class="mb-4">
                <div class="i-tdesign:cloud-upload text-primary text-48px"></div>
              </div>
              <div class="mb-2 text-sm font-medium">
                <span class="text-primary">点击或拖拽文件到此处上传</span>
              </div>
              <div class="text-xs text-[var(--td-text-color-secondary)]">支持 .xls、.xlsx 格式文件</div>
            </div>
          </template>
        </Upload>
      </div>

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

    <template #footer
      >111
      <div class="flex justify-end gap-2">
        <Button
          theme="default"
          @click="handleClose"
        >
          关闭
        </Button>
        <Button
          theme="primary"
          :loading="uploading"
          :disabled="!selectedFile || uploading"
          @click="handleImport"
        >
          {{ uploading ? '导入中...' : '开始导入' }}
        </Button>
      </div>
    </template>
  </BasicModal>
</template>
<script setup lang="ts">
import { Button, Upload } from 'tdesign-vue-next';
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
const {
  fileList,
  selectedFile,
  originalFileBuffer,
  formatResponse,
  handleFileChange: originalHandleFileChange,
  clearFile
} = useFile();

const dragAreaRef = ref<HTMLElement>();
const isDragActive = ref(false);

// 处理拖拽进入
const handleDragEnter = (e: DragEvent) => {
  e.preventDefault();
  e.stopPropagation();
  isDragActive.value = true;
};

// 处理拖拽悬停
const handleDragOver = (e: DragEvent) => {
  e.preventDefault();
  e.stopPropagation();
};

// 处理拖拽离开
const handleDragLeave = (e: DragEvent) => {
  e.preventDefault();
  e.stopPropagation();
  // 只有当离开整个拖拽区域时才取消激活状态
  if (!dragAreaRef.value?.contains(e.relatedTarget as Node)) {
    isDragActive.value = false;
  }
};

// 处理文件放下
const handleDrop = (e: DragEvent) => {
  e.preventDefault();
  e.stopPropagation();
  isDragActive.value = false;

  const files = e.dataTransfer?.files;
  if (files && files.length > 0) {
    const file = files[0];
    // 检查文件类型
    const fileName = file.name.toLowerCase();
    if (fileName.endsWith('.xls') || fileName.endsWith('.xlsx')) {
      // 创建文件对象并触发 change 事件
      const fileObj = {
        raw: file,
        name: file.name,
        size: file.size,
        type: file.type,
        status: 'success'
      };
      originalHandleFileChange([fileObj]);
    }
  }
};

// 包装 handleFileChange 以支持拖拽和点击上传
const handleFileChange = (files: any[], context?: any) => {
  // TDesign Upload 的 change 事件可能传递两个参数
  if (context) {
    // 如果是 TDesign Upload 的 change 事件，files 是文件列表，context 是上下文
    originalHandleFileChange(files);
  } else {
    // 如果是手动调用（如拖拽），直接传递 files
    originalHandleFileChange(files);
  }
};
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
<style scoped>
:deep(.t-upload) {
  width: 100%;
}

:deep(.t-upload__input) {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  opacity: 0;
  cursor: pointer;
  z-index: 1;
}
</style>
