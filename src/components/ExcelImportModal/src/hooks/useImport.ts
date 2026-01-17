/**
 * 导入处理 hooks
 * 处理Excel文件导入逻辑
 *
 * @author zoulan
 * @since 2024-01-01
 */
import { MessagePlugin } from 'tdesign-vue-next';
import type { Ref } from 'vue';
import { ref } from 'vue';

import { http } from '/@/utils/http';

import type { ExcelImportModalEmit, ImportSuccessResult } from '../types';

export interface ImportResult {
  success: number;
  hasError: boolean;
  errorCount?: number;
  errorRows?: Array<{ rowIndex: number; message: string }>;
}

/**
 * 导入处理
 * @param importUrl 导入接口地址
 * @param selectedFile 选中的文件
 * @param emit 事件发射器
 */
export function useImport(importUrl: string | undefined, selectedFile: Ref<File | null>, emit: ExcelImportModalEmit) {
  const uploading = ref(false);
  const importResult = ref<ImportResult | null>(null);

  /**
   * 执行导入
   */
  const handleImport = async () => {
    if (!selectedFile.value) {
      MessagePlugin.warning('请先选择文件');
      return;
    }

    if (!importUrl) {
      MessagePlugin.warning('导入地址未配置');
      return;
    }

    uploading.value = true;
    importResult.value = null;

    try {
      const formData = new FormData();
      formData.append('file', selectedFile.value);

      const response = await http.post({
        url: importUrl,
        data: formData,
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      // 处理响应结果
      // 假设后端返回格式: { success: number, errorRows?: Array<{ rowIndex: number, message: string }> }
      const result = response as any;
      const errorRows = result.errorRows || [];
      const successCount = result.success || 0;

      importResult.value = {
        success: successCount,
        hasError: errorRows.length > 0,
        errorCount: errorRows.length,
        errorRows
      };

      const successResult: ImportSuccessResult = {
        success: successCount,
        hasError: errorRows.length > 0,
        errorRows: errorRows.length > 0 ? errorRows : undefined
      };

      if (errorRows.length > 0) {
        MessagePlugin.warning(`导入完成，共导入 ${successCount} 条数据，${errorRows.length} 条数据有异常`);
        emit('success', successResult);
      } else {
        MessagePlugin.success(`导入成功，共导入 ${successCount} 条数据`);
        emit('success', successResult);
      }
    } catch (error: any) {
      MessagePlugin.error(`导入失败: ${error.message || '未知错误'}`);
      emit('error', error);
    } finally {
      uploading.value = false;
    }
  };

  /**
   * 清空导入结果
   */
  const clearImportResult = () => {
    importResult.value = null;
  };

  return {
    uploading,
    importResult,
    handleImport,
    clearImportResult
  };
}
