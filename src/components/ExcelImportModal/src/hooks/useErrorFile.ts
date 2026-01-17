/**
 * 异常文件处理 hooks
 * 处理异常文件生成和下载逻辑
 *
 * @author zoulan
 * @since 2024-01-01
 */
import { MessagePlugin } from 'tdesign-vue-next';
import type { Ref } from 'vue';

import { saveFileByBlob } from '/@/utils/download';

import type { ErrorRow } from '../utils/excelUtil';
import { generateErrorFile } from '../utils/excelUtil';
import { generateErrorFileName } from '../utils/fileUtil';

export interface ImportResultWithErrors {
  errorRows?: ErrorRow[];
}

/**
 * 异常文件处理
 * @param originalFileBuffer 原始文件的ArrayBuffer
 * @param importResult 导入结果
 * @param selectedFile 选中的文件
 */
export function useErrorFile(
  originalFileBuffer: Ref<ArrayBuffer | null>,
  importResult: Ref<ImportResultWithErrors | null>,
  selectedFile: Ref<File | null>
) {
  /**
   * 下载异常文件
   */
  const handleDownloadErrorFile = async () => {
    if (!originalFileBuffer.value || !importResult.value?.errorRows) {
      MessagePlugin.warning('无法生成异常文件');
      return;
    }

    try {
      const blob = generateErrorFile(originalFileBuffer.value, importResult.value.errorRows);
      const fileName = generateErrorFileName(selectedFile.value?.name);
      saveFileByBlob(blob, fileName);
      MessagePlugin.success('异常文件下载成功');
    } catch (error: any) {
      MessagePlugin.error(`生成异常文件失败: ${error.message || '未知错误'}`);
      console.error('生成异常文件错误:', error);
    }
  };

  return {
    handleDownloadErrorFile
  };
}
