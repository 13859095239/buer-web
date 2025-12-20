<!--
  - Excel导入模态框组件
  - 支持Excel文件上传、解析、导入功能
  - 使用EventSource实现实时进度监听
  - 
  - @author zoulan
  - @since 2025-10-01
  -->
<template>
  <BasicModal
    v-model:visible="visible"
    :width="800"
    top="5vh"
    :title="props.title || 'Excel数据导入'"
    :footer="false"
    @close="handleClose"
  >
    <div>
      <!-- 上传区域 -->
      <div v-if="!isImportCompleted">
        <UploadSection
          v-model:fileList="fileList"
          :uploadUrl="props.uploadUrl"
          :headers="props.headers"
          :templateUrl="props.templateUrl"
          :uploading="importing"
          @download-template="downloadTemplate"
          @upload-success="handleUploadSuccess"
          @upload-error="handleUploadError"
        />
      </div>

      <!-- 导入进度 -->
      <div v-if="importing || isImportCompleted">
        <ImportProgress
          :importing="importing"
          :importProgress="importProgress"
          @cancel="handleCancelImport"
        />
      </div>

      <!-- 导入结果 -->
      <div v-if="importResult && isImportCompleted">
        <ImportResult
          :importResult="importResult"
          @export-error-log="exportErrorLog"
        />
      </div>

      <!-- 操作按钮 -->
      <div class="flex justify-end gap-3 border-t pt-4">
        <Button
          v-if="!isImportCompleted && hasUploadedFile && !importing"
          theme="primary"
          :loading="importing"
          @click="handleImportClick"
        >
          开始导入
        </Button>

        <Button
          v-if="isImportCompleted"
          theme="primary"
          @click="handleClose"
        >
          完成
        </Button>

        <Button
          v-if="!importing"
          theme="default"
          @click="handleClose"
        >
          {{ isImportCompleted ? '关闭' : '取消' }}
        </Button>
      </div>
    </div>
  </BasicModal>
</template>
<script setup lang="ts">
import { Button, MessagePlugin } from 'tdesign-vue-next';
import { computed } from 'vue';

import { BasicModal } from '../../Modal';
import ImportProgress from './components/ImportProgress.vue';
import ImportResult from './components/ImportResult.vue';
import UploadSection from './components/UploadSection.vue';
import { useImport } from './hooks/useImport';
import { useUpload } from './hooks/useUpload';
import type { BasicExcelImportModalProps, ExcelImportModalEmit, ExcelImportModalMethods } from './types';

const props = withDefaults(defineProps<BasicExcelImportModalProps>(), {
  visible: false,
  title: 'Excel数据导入'
});

const emit = defineEmits<ExcelImportModalEmit>();

// 使用组合式函数
const { fileList, uploadFileInfo, hasUploadedFile, downloadTemplate, resetUpload } = useUpload(props);

const {
  importing,
  importResult,
  importProgress,
  isImportCompleted,
  handleImport,
  cancelImport,
  exportErrorLog,
  resetImport
} = useImport(props);

// 计算属性
const visible = computed({
  get: () => props.visible,
  set: (value) => emit('update:visible', value)
});

// 方法
const handleUploadSuccess = (fileInfo: any) => {
  emit('upload-success', fileInfo);
};

const handleUploadError = (error: Error) => {
  emit('upload-error', error);
};

const handleImportClick = async () => {
  try {
    const result = await handleImport(uploadFileInfo.value);
    if (result) {
      emit('success', result);
    }
  } catch (error) {
    emit('error', error instanceof Error ? error : new Error('导入失败'));
  }
};

const handleCancelImport = async () => {
  try {
    await cancelImport();
    MessagePlugin.info('导入已取消');
  } catch {
    MessagePlugin.error('取消导入失败');
  }
};

const handleClose = () => {
  if (importing.value) {
    MessagePlugin.warning('正在导入中，请稍候...');
    return;
  }

  visible.value = false;
  resetUpload();
  resetImport();
};

// 暴露方法
const methods: Partial<ExcelImportModalMethods> = {
  show: () => {
    visible.value = true;
  },
  hide: () => {
    visible.value = false;
  },
  reset: () => {
    resetUpload();
    resetImport();
  },
  startImport: handleImportClick,
  cancelImport: handleCancelImport,
  downloadTemplate,
  exportErrorLog
};

defineExpose(methods);
</script>
