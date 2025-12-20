/**
 * axios 组件请求封装处理 hooks
 *
 * @author zoulan
 * @since 2023-08-10
 */
import type { AxiosError, AxiosInstance, AxiosResponse } from 'axios';
import { ref } from 'vue';

import type { R, RequestConfig } from '../types';
import { handleAxiosError, handleRequestError } from './useError';

export function useRequest(axiosInstance: AxiosInstance) {
  const loading = ref(false);
  function request<T = any>(requestConfig: RequestConfig): Promise<T> {
    loading.value = true;
    return new Promise((resolve, reject) => {
      axiosInstance
        .request<any, AxiosResponse<R>>(requestConfig)
        // 请求成功处理
        .then((response: AxiosResponse<R>) => {
          loading.value = false;
          // 如果是blob类型响应，直接返回数据
          if (requestConfig.responseType === 'blob') {
            resolve(response.data as any);
            return;
          }

          if (response.data.code !== 200) {
            // 请求成功，后端返回错误信息
            handleRequestError({
              code: response.data.code,
              message: response.data.message
            });
            /** 抛出异常 */
            reject(response.data.message);
          } else {
            // 请求成功，后端返回正常数据
            let var1 = response?.data?.data != undefined ? response?.data?.data : (response?.data as any);
            // 后端返回数据的转换
            if (requestConfig.transform) {
              var1 = requestConfig.transform?.(var1);
            }
            // 请求成功事件
            if (requestConfig.success) {
              requestConfig.success?.(var1);
            }
            // 返回数据给前端
            resolve(var1);
          }
        })
        // 请求失败，AxiosError错误处理
        .catch((axiosError: AxiosError) => {
          loading.value = false;
          handleAxiosError(axiosError);
          reject(axiosError);
        });
    });
  }
  return { request, loading };
}
