/**
 * 导入相关逻辑
 * 处理Excel导入、进度监听、错误处理等功能
 * 使用EventSource实现实时进度更新
 *
 * @author zoulan
 * @since 2025-10-01
 */

import { saveAs } from 'file-saver';
import { MessagePlugin } from 'tdesign-vue-next';
import { computed, ref } from 'vue';
import * as XLSX from 'xlsx';

import { http } from '/@/utils/http';

import type { BasicExcelImportModalProps, ImportProgress, ImportResult, UploadFileInfo } from '../types';
import { ImportStep } from '../types';

export function useImport(props: BasicExcelImportModalProps) {
  const importing = ref(false);
  const importResult = ref<ImportResult | null>(null);
  const currentTaskId = ref<string | null>(null);
  const currentEventSource = ref<EventSource | null>(null);
  const importProgress = ref<ImportProgress>({
    currentStep: ImportStep.UPLOAD,
    totalSteps: 5,
    currentStepText: '准备导入',
    progress: 0,
    completed: false
  });

  /** 是否导入完成 */
  const isImportCompleted = computed(() => importProgress.value.completed);

  /** 更新导入进度 */
  const updateProgress = (step: ImportStep, progress: number, stepText?: string) => {
    importProgress.value = {
      currentStep: step,
      totalSteps: 5,
      currentStepText: stepText || getStepText(step),
      progress,
      completed: step === ImportStep.COMPLETE
    };
  };

  /** 获取步骤文本 */
  const getStepText = (step: ImportStep): string => {
    const stepTexts = {
      [ImportStep.UPLOAD]: '上传文件',
      [ImportStep.PARSE]: '解析文件',
      [ImportStep.VALIDATE]: '验证数据',
      [ImportStep.IMPORT]: '导入数据',
      [ImportStep.COMPLETE]: '导入完成'
    };
    return stepTexts[step];
  };

  /** 开始导入 */
  const startImport = async (fileId: string): Promise<ImportResult> => {
    if (!props.importUrl) {
      throw new Error('导入接口地址未配置');
    }

    importing.value = true;
    importResult.value = null;

    try {
      // 步骤1: 解析文件
      updateProgress(ImportStep.PARSE, 10, '正在解析文件...');

      // 步骤2: 验证数据
      updateProgress(ImportStep.VALIDATE, 20, '正在验证数据...');

      // 步骤3: 开始导入并监听进度
      updateProgress(ImportStep.IMPORT, 30, '正在导入数据...');

      const result = await importWithProgress(fileId);

      // 步骤4: 完成
      updateProgress(ImportStep.COMPLETE, 100, '导入完成');
      importResult.value = result;

      if (result.failed > 0) {
        MessagePlugin.warning(`导入完成，成功 ${result.success} 条，失败 ${result.failed} 条`);
      } else {
        MessagePlugin.success(`导入成功，共导入 ${result.success} 条数据`);
      }

      return result;
    } catch (error) {
      importing.value = false;
      updateProgress(ImportStep.UPLOAD, 0, '导入失败');
      MessagePlugin.error(`导入失败: ${error instanceof Error ? error.message : '未知错误'}`);
      throw error;
    } finally {
      importing.value = false;
    }
  };

  /** 使用 EventSource 监听导入进度 */
  const importWithProgress = (fileId: string): Promise<ImportResult> => {
    return new Promise((resolve, reject) => {
      // 发起导入请求
      http
        .post({
          url: props.importUrl!,
          data: { fileId, enableProgress: true },
          headers: props.headers
        })
        .then((data) => {
          const { taskId } = data;

          // 保存任务ID和EventSource
          currentTaskId.value = taskId;

          // 创建 EventSource 连接
          // 注意：EventSource 不支持自定义 headers，需要通过 URL 参数传递认证信息
          const baseUrl = props.importUrl!.replace('/async', '');
          const eventSource = new EventSource(`${baseUrl}/status/${taskId}`, {
            withCredentials: true // 允许携带 cookies 进行认证
          });
          currentEventSource.value = eventSource;

          eventSource.onmessage = (event) => {
            try {
              const progressData = JSON.parse(event.data);

              switch (progressData.type) {
                case 'progress': {
                  // 更新进度 (30-90%)
                  const progress = 30 + progressData.progress * 0.6;
                  updateProgress(ImportStep.IMPORT, progress, progressData.message);
                  break;
                }

                case 'completed':
                  // 导入完成
                  eventSource.close();
                  currentEventSource.value = null;
                  currentTaskId.value = null;
                  resolve(progressData.result);
                  break;

                case 'error':
                  // 导入失败
                  eventSource.close();
                  currentEventSource.value = null;
                  currentTaskId.value = null;
                  reject(new Error(progressData.message));
                  break;
              }
            } catch (error) {
              console.error('解析进度数据失败:', error);
            }
          };

          eventSource.onerror = (error) => {
            console.error('EventSource 连接错误:', error);
            eventSource.close();
            currentEventSource.value = null;
            currentTaskId.value = null;
            reject(new Error('连接中断，导入失败'));
          };

          // 设置超时
          setTimeout(() => {
            if (eventSource.readyState !== EventSource.CLOSED) {
              eventSource.close();
              currentEventSource.value = null;
              currentTaskId.value = null;
              reject(new Error('导入超时'));
            }
          }, 300000); // 5分钟超时
        })
        .catch((error) => {
          reject(error);
        });
    });
  };

  /** 取消导入 */
  const cancelImport = async () => {
    if (currentEventSource.value) {
      currentEventSource.value.close();
      currentEventSource.value = null;
    }

    if (currentTaskId.value) {
      try {
        await http.post({
          url: `${props.importUrl!.replace('/async', '')}/cancel/${currentTaskId.value}`,
          headers: props.headers
        });
      } catch (error) {
        console.error('取消任务失败:', error);
      }
      currentTaskId.value = null;
    }

    importing.value = false;
    updateProgress(ImportStep.UPLOAD, 0, '导入已取消');
  };

  /** 处理导入操作 */
  const handleImport = async (uploadFileInfo: UploadFileInfo | null) => {
    if (!uploadFileInfo?.fileId) {
      MessagePlugin.error('请先上传文件');
      return;
    }

    try {
      const result = await startImport(uploadFileInfo.fileId);
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
    currentTaskId.value = null;
    currentEventSource.value = null;
    importProgress.value = {
      currentStep: ImportStep.UPLOAD,
      totalSteps: 5,
      currentStepText: '准备导入',
      progress: 0,
      completed: false
    };
  };

  return {
    importing,
    importResult,
    importProgress,
    isImportCompleted,
    startImport,
    handleImport,
    cancelImport,
    exportErrorLog,
    resetImport,
    updateProgress
  };
}
