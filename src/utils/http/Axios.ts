/**
 * axios 组件封装 主入口
 * 该组件是全局组件
 *
 * @author zoulan
 * @since 2023-08-10
 */
import type { AxiosInstance } from 'axios';
import axios from 'axios';
import { assign } from 'lodash-es';
import type { Ref } from 'vue';
import { ref } from 'vue';

import { useRequest } from './hooks/useRequest';
import { useSetupInterceptors } from './hooks/useSetupInterceptors';
import type { CreateAxiosOptions, RequestConfig } from './types';

export class Axios {
  private axiosInstance: AxiosInstance;
  public loading: Ref<boolean> = ref(false);
  public request: <T = any>(config: RequestConfig) => Promise<T>;

  constructor(createAxiosOptions: CreateAxiosOptions) {
    this.axiosInstance = axios.create(createAxiosOptions);
    const { loading } = useSetupInterceptors(this.axiosInstance);
    const { request } = useRequest(this.axiosInstance);
    this.request = request;
    this.loading = loading;
  }

  /**
   * delete 请求
   * @param config 请求配置
   * @returns 请求结果
   */
  delete<T = any>(config: RequestConfig): Promise<T> {
    const bascicConfig = assign(
      {
        method: 'DELETE',
        warn: '永久删除该数据'
      },
      config
    );
    return this.request(bascicConfig);
  }

  /**
   * post 请求
   * @param config 请求配置
   * @returns 请求结果
   */
  post<T = any>(config: RequestConfig): Promise<T> {
    const bascicConfig = assign(
      {
        method: 'POST'
      },
      config
    );
    return this.request(bascicConfig);
  }

  /**
   * get 请求
   * @param config 请求配置
   * @returns 请求结果
   */
  get<T = any>(config: RequestConfig): Promise<T> {
    const bascicConfig = assign(
      {
        method: 'GET'
      },
      config
    );
    return this.request(bascicConfig);
  }

  /**
   * put 请求
   * @param config 请求配置
   * @returns 请求结果
   */
  put<T = any>(config: RequestConfig): Promise<T> {
    const bascicConfig = assign(
      {
        method: 'PUT'
      },
      config
    );
    return this.request(bascicConfig);
  }
}
