/**
 * 模板下载 hooks
 * 处理模板文件下载逻辑
 *
 * @author zoulan
 * @since 2024-01-01
 */
import { MessagePlugin } from 'tdesign-vue-next';

import { saveFileByBlob } from '/@/utils/download';
import { http } from '/@/utils/http';

import type { ExcelImportModalEmit } from '../types';

/**
 * 下载模板文件
 * @param templateUrl 模板URL地址
 * @param emit 事件发射器
 */
export function useTemplate(templateUrl: string | undefined, emit: ExcelImportModalEmit) {
  const handleDownloadTemplate = async () => {
    if (!templateUrl) {
      MessagePlugin.warning('模板地址未配置');
      return;
    }

    try {
      const response = await http.get({
        url: templateUrl,
        responseType: 'blob'
      });
      saveFileByBlob(response);
      MessagePlugin.success('模板下载成功');
    } catch (error: any) {
      MessagePlugin.error(`模板下载失败: ${error.message || '未知错误'}`);
      emit('error', error);
    }
  };

  return {
    handleDownloadTemplate
  };
}
