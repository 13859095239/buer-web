<!--
  - 文件上传区域组件
  - 处理文件上传、模板下载等功能
  - 支持文件类型和大小校验
  - 
  - @author zoulan
  - @since 2025-10-01
  -->
<template>
  <div>
    <Upload
      v-model="fileList"
      :action="uploadUrl"
      :headers="headers"
      :beforeUpload="beforeUpload"
      :onSuccess="onUploadSuccess"
      :onFail="onUploadError"
      :onProgress="onUploadProgress"
      :onChange="onFileChange"
      :max="1"
      :autoUpload="true"
      theme="file"
      :disabled="uploading"
      placeholder="点击上传Excel文件"
      tips="支持 .xlsx, .xls 格式，文件大小不超过 10MB"
    />

    <!-- 已上传文件信息 -->
    <Alert
      v-if="uploadFileInfo"
      theme="success"
      :message="`文件已上传: ${uploadFileInfo.fileName} (${formatFileSize(uploadFileInfo.fileSize)})`"
      :action="!uploading ? { content: '删除', onClick: removeFile } : undefined"
    />

    <!-- 模板下载 -->
    <div class="mt-3">
      <Button
        v-if="templateUrl"
        theme="default"
        variant="text"
        @click="downloadTemplate"
      >
        <template #icon>
          <div class="i-tdesign:download"></div>
        </template>
        下载导入模板
      </Button>
    </div>
  </div>
</template>
<script setup lang="ts">
import { Alert, Button, Upload } from 'tdesign-vue-next';

import { useUpload } from '../hooks/useUpload';
import type { BasicExcelImportModalProps } from '../types';

interface Props {
  uploadUrl?: string;
  headers?: Record<string, string>;
  templateUrl?: string;
  uploading: boolean;
}

const props = defineProps<Props>();

const emit = defineEmits<{
  'download-template': [];
  'upload-success': [fileInfo: any];
  'upload-error': [error: Error];
}>();

// 使用 defineModel 处理 fileList 的双向绑定
const fileList = defineModel<any[]>('fileList', { default: () => [] });

// 使用 useUpload hook
const {
  uploadFileInfo,
  beforeUpload,
  onUploadSuccess,
  onUploadError,
  onUploadProgress,
  onFileChange,
  removeFile,
  downloadTemplate: downloadTemplateFromHook
} = useUpload(props as BasicExcelImportModalProps);

const formatFileSize = (size: number): string => {
  if (size < 1024) return `${size} B`;
  if (size < 1024 * 1024) return `${(size / 1024).toFixed(1)} KB`;
  return `${(size / (1024 * 1024)).toFixed(1)} MB`;
};

const downloadTemplate = () => {
  downloadTemplateFromHook();
};
</script>
