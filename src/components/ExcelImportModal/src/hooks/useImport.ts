/**
 * 导入相关逻辑
 * 处理Excel导入、进度监听、错误处理等功能
 *
 * @author zoulan
 * @since 2025-10-01
 */

import { saveAs } from 'file-saver';
import { MessagePlugin } from 'tdesign-vue-next';
import { computed, ref } from 'vue';
import * as XLSX from 'xlsx';

import { http } from '/@/utils/http';

import type { BasicExcelImportModalProps, ImportResult } from '../types';

export function useImport(props: BasicExcelImportModalProps) {
  const importing = ref(false);
  const importResult = ref<ImportResult | null>(null);
  const importCompleted = ref(false);

  /** 是否导入完成 */
  const isImportCompleted = computed(() => importCompleted.value);

  /** 开始导入 */
  const startImport = async (file: File): Promise<ImportResult> => {
    if (!props.importUrl) {
      throw new Error('导入接口地址未配置');
    }

    importing.value = true;
    importResult.value = null;
    importCompleted.value = false;

    try {
      // 创建 FormData 对象
      const formData = new FormData();
      formData.append('file', file);

      // 调用导入接口
      const resultString = await http.post<string>({
        url: props.importUrl,
        data: formData,
        headers: {
          'Content-Type': 'multipart/form-data',
          ...props.headers
        }
      });

      // 解析后端返回的字符串结果
      // 后端返回格式： "导入完成，成功：X条，失败：Y条"
      const successMatch = resultString.match(/成功[：:]\s*(\d+)/);
      const failedMatch = resultString.match(/失败[：:]\s*(\d+)/);

      const success = successMatch ? Number.parseInt(successMatch[1], 10) : 0;
      const failed = failedMatch ? Number.parseInt(failedMatch[1], 10) : 0;
      const total = success + failed;

      const result: ImportResult = {
        total,
        success,
        failed,
        errors: failed > 0 ? [] : undefined
      };

      // 导入完成
      importCompleted.value = true;
      importResult.value = result;

      if (result.failed > 0) {
        MessagePlugin.warning(`导入完成，成功 ${result.success} 条，失败 ${result.failed} 条`);
      } else {
        MessagePlugin.success(`导入成功，共导入 ${result.success} 条数据`);
      }

      return result;
    } catch (error) {
      importing.value = false;
      importCompleted.value = false;
      MessagePlugin.error(`导入失败: ${error instanceof Error ? error.message : '未知错误'}`);
      throw error;
    } finally {
      importing.value = false;
    }
  };

  /** 处理导入操作 */
  const handleImport = async (file: File | null) => {
    if (!file) {
      MessagePlugin.error('请先选择文件');
      return;
    }

    try {
      const result = await startImport(file);
      return result;
    } catch (error) {
      throw error instanceof Error ? error : new Error('导入失败');
    }
  };

  /** 导出错误日志 */
  const exportErrorLog = () => {
    if (!importResult.value?.errors || importResult.value.errors.length === 0) {
      MessagePlugin.warning('没有错误日志可导出');
      return;
    }

    try {
      // 准备数据
      const errorData = importResult.value.errors.map((error, index) => ({
        序号: index + 1,
        行号: error.row,
        列名: error.column || '',
        错误信息: error.message,
        数据值: error.value || '',
        导入时间: new Date().toLocaleString()
      }));

      // 创建工作表
      const worksheet = XLSX.utils.json_to_sheet(errorData);

      // 创建工作簿
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, '错误日志');

      // 生成文件并下载
      const excelBuffer = XLSX.write(workbook, {
        bookType: 'xlsx',
        type: 'array'
      });

      const data = new Blob([excelBuffer], {
        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
      });

      saveAs(data, `导入错误日志_${new Date().toISOString().slice(0, 19).replace(/:/g, '-')}.xlsx`);

      MessagePlugin.success('错误日志导出成功');
    } catch (error) {
      MessagePlugin.error('导出错误日志失败');
      console.error('导出错误日志失败:', error);
    }
  };

  /** 重置导入状态 */
  const resetImport = () => {
    importing.value = false;
    importResult.value = null;
    importCompleted.value = false;
  };

  return {
    importing,
    importResult,
    isImportCompleted,
    startImport,
    handleImport,
    exportErrorLog,
    resetImport
  };
}
