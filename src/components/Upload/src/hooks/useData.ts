/**
 * 数据操作 hooks
 *
 * @author zoulan
 * @since 2023-12-11
 */
import { watchDeep } from '@vueuse/core';
import type { ModelRef } from 'vue';
import { computed, ref, toValue } from 'vue';

import { generateId } from '/@/api/resource/generate';
import { listOss } from '/@/api/resource/oss';
import { HEADER_AUTHORIZATION_KEY } from '/@/settings/projectSetting';
import { useUserStore } from '/@/store/modules/user';
import { isNullOrUnDefOrBlank } from '/@/utils/is';
import { errorMessage } from '/@/utils/prompt';

import type { BasicUploadFile, UploadFileList } from '../types';

export function useData(models: {
  /** fileGroupId,sys_oss外键 */
  model: ModelRef<string | undefined>;
  /** fileGroupId下的fileId列表，回发给后端更新最新的文件 */
  modelData: ModelRef<string | undefined>;
}) {
  /** upload组件headers属性 */
  const headers = computed(() => {
    const token = useUserStore().getToken;
    return {
      [HEADER_AUTHORIZATION_KEY]: `Bearer ${token}`
    };
  });

  /** upload组件fileList文件列表属性  */
  const fileList = ref<UploadFileList>([]);

  /** uoload组件change事件 */
  const handleChange = (updateFileList: Array<BasicUploadFile>) => {
    updateFileList.map((file) => {
      // 收到后端反馈数据
      if (file.response) {
        const { url, ossId } = file.response.data;
        // 设置url让当前文件变成链接
        file.url = url;
        file.ossId = ossId;
      }
    });
    models.modelData.value = getUploadData();
  };
  /**
   * 用于格式化文件上传后的接口响应数据
   * @param response 接口响应的原始数据
   *
   */
  const formatResponse = (response: Recordable) => {
    // 此函数的返回值 `error` 会作为错误文本提醒，表示上传失败的原因，如果存在会判定为本次上传失败
    // 上传失败不会进入触发change事件
    if (response.code !== 200) {
      errorMessage(response.message);
      return { error: '上传失败，请重试' };
    }
    return response;
  };
  /** 获取数据 */
  const getData = async () => {
    const files = await listOss({
      fileGroupId: models.model.value
    });
    // 获取数据前清空列表
    fileList.value = [];
    files.forEach((file) => {
      fileList.value.push({
        ossId: file.id,
        uid: file.id,
        name: file.originalName,
        status: 'success',
        url: file.url,
        thumbUrl: file.url
      });
    });
  };

  /** 清空数据 */
  const clearData = () => {
    models.model.value = undefined;
    fileList.value = [];
  };

  /**
   * 自动生成fileGroupId
   */
  async function generateFileGroupId() {
    const fileGroupId = await generateId();
    models.model.value = fileGroupId;
  }

  /** 获取提交数据 */
  const getUploadData = () => {
    // 获取要保存的ossId列表
    // 不在ossId列表中的视为删除，后端自动处理
    const r = fileList.value.map((item) => item.ossId).toString();
    return r;
  };

  watchDeep(
    () => toValue(models.model),
    (newValue) => {
      if (!isNullOrUnDefOrBlank(newValue)) {
        getData();
      } else {
        clearData();
      }
    }
  );

  return {
    headers,
    fileList,
    handleChange,
    clearData,
    generateFileGroupId,
    getUploadData,
    formatResponse
  };
}
