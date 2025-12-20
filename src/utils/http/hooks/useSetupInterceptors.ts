/**
 * axios 组件拦截器 hooks
 * 用于请求前、后注入参数
 *
 * @author zoulan
 * @since 2023-08-10
 */
import type { AxiosInstance, AxiosRequestHeaders, AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import { ref } from 'vue';

import { HEADER_AUTHORIZATION_KEY } from '/@/settings/projectSetting';
import { useUserStore } from '/@/store/modules/user';

import type { RequestConfig } from '../types';

export function useSetupInterceptors(axiosInstance: AxiosInstance) {
  // 正在加载状态
  const loading = ref(false);

  // 正在加载中数量
  let loadingCount = 0;
  const interceptors = axiosInstance.interceptors;

  // 请求前拦截注入
  interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
      // 加载鉴权头
      const token = useUserStore().getToken;
      const headers: AxiosRequestHeaders = config.headers as AxiosRequestHeaders;
      if (token) {
        headers[HEADER_AUTHORIZATION_KEY] = `Bearer ${token}`;
      }
      addLoading(config);
      return config;
    },
    (error: any) => {
      clearLoading();
      return Promise.reject(error);
    }
  );
  // 请求后拦截注入
  interceptors.response.use(
    (response: AxiosResponse<any, any>) => {
      removeLoading(response);
      return response;
    },
    (error) => {
      clearLoading();
      return Promise.reject(error);
    }
  );

  /** 新增加载状态 */
  function addLoading(config: InternalAxiosRequestConfig) {
    const isLoading = (config as RequestConfig).isLoading;
    if (isLoading) {
      loadingCount++;
      loading.value = true;
    }
  }

  /** 移除加载状态 */
  function removeLoading(axiosResponse: AxiosResponse) {
    const isLoading = (axiosResponse.config as RequestConfig).isLoading;
    if (isLoading) {
      loadingCount--;
      if (loadingCount === 0) {
        clearLoading();
      }
    }
  }

  /** 清空加载状态 */
  function clearLoading() {
    loadingCount = 0;
    loading.value = false;
  }
  return { loading };
}
