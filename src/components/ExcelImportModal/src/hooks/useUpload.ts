/**
 * 文件上传相关逻辑
 * 处理文件上传、校验、模板下载等功能
 *
 * @author zoulan
 * @since 2025-10-01
 */

import type { UploadFile } from 'tdesign-vue-next';
import { MessagePlugin } from 'tdesign-vue-next';
import { computed, ref } from 'vue';

import { useDownload } from '/@/hooks/web/useDownload';
import { http } from '/@/utils/http';

import type { BasicExcelImportModalProps, UploadFileInfo } from '../types';

export function useUpload(props: BasicExcelImportModalProps) {
  const fileList = ref<UploadFile[]>([]);
  const uploadFileInfo = ref<UploadFileInfo | null>(null);
  const uploading = ref(false);
  const { saveFileByBlob } = useDownload();

  /** 是否已上传文件 */
  const hasUploadedFile = computed(() => fileList.value.length > 0);

  /** 上传前的文件校验 */
  const beforeUpload = (file: File) => {
    // 检查文件类型
    const acceptTypes = ['.xlsx', '.xls'];
    const fileExtension = `.${file.name.split('.').pop()?.toLowerCase()}`;

    if (!acceptTypes.includes(fileExtension)) {
      MessagePlugin.error(`只支持 ${acceptTypes.join(', ')} 格式的文件`);
      return false;
    }

    // 检查文件大小
    const maxSize = 10 * 1024 * 1024; // 10MB
    if (file.size > maxSize) {
      MessagePlugin.error('文件大小不能超过 10MB');
      return false;
    }

    return true;
  };

  /** 文件上传成功回调 */
  const onUploadSuccess = (context: any) => {
    uploading.value = false;

    const fileInfo: UploadFileInfo = {
      fileId: context.response?.data?.fileId || context.response?.id || '',
      fileName: context.file.name,
      fileSize: context.file.size || 0,
      uploadTime: new Date().toISOString(),
      status: 'success'
    };

    uploadFileInfo.value = fileInfo;
    MessagePlugin.success('文件上传成功');
  };

  /** 文件上传失败回调 */
  const onUploadError = (_context: any) => {
    uploading.value = false;
    uploadFileInfo.value = null;
    MessagePlugin.error('文件上传失败');
  };

  /** 文件上传进度回调 */
  const onUploadProgress = (_context: any) => {
    // 可以在这里处理上传进度
  };

  /** 文件变化回调 */
  const onFileChange = (files: UploadFile[]) => {
    fileList.value = files;
    if (files.length === 0) {
      uploadFileInfo.value = null;
    }
  };

  /** 移除文件 */
  const removeFile = () => {
    fileList.value = [];
    uploadFileInfo.value = null;
  };

  /** 下载模板 */
  const downloadTemplate = async () => {
    if (!props.templateUrl) {
      MessagePlugin.warning('模板下载地址未配置');
      return;
    }

    try {
      console.log('开始下载模板:', props.templateUrl);

      const response = await http.get({
        url: props.templateUrl,
        responseType: 'blob'
      });

      console.log('下载响应:', response);

      // 检查响应数据
      if (!response) {
        throw new Error('响应数据为空');
      }

      // 检查是否是有效的Blob数据
      if (!(response instanceof Blob) && !(response instanceof ArrayBuffer)) {
        throw new TypeError('响应数据格式不正确，期望Blob或ArrayBuffer');
      }

      // 创建 Blob
      const blob =
        response instanceof Blob
          ? response
          : new Blob([response], {
              type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
            });

      console.log('创建 Blob:', blob.size, 'bytes');

      // 检查Blob大小
      if (blob.size === 0) {
        throw new Error('下载的文件为空');
      }

      // 使用 file-saver 库下载
      saveFileByBlob(blob, '导入模板.xlsx');

      MessagePlugin.success('模板下载成功');
    } catch (error: any) {
      console.error('模板下载失败:', error);
      MessagePlugin.error(`模板下载失败: ${error?.message || '未知错误'}`);
    }
  };

  /** 重置上传状态 */
  const resetUpload = () => {
    fileList.value = [];
    uploadFileInfo.value = null;
    uploading.value = false;
  };

  return {
    fileList,
    uploadFileInfo,
    uploading,
    hasUploadedFile,
    beforeUpload,
    onUploadSuccess,
    onUploadError,
    onUploadProgress,
    onFileChange,
    removeFile,
    downloadTemplate,
    resetUpload
  };
}
