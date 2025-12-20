/**
 * axios控件设置
 *
 * @author zoulan
 * @since 2023-05-21
 */
import type { AxiosRequestConfig } from 'axios';

export const AXIOS_REQUEST_CONFIG: AxiosRequestConfig = {
  /** 请求超时时间（毫秒） */
  timeout: 15000,
  /** 自动加在url前面 */
  baseURL: import.meta.env.VITE_BASE_API,
  /** 跨域请求时是否需要使用凭证(默认为false) */
  withCredentials: false
};
