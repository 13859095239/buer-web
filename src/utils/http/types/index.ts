/**
 * axios 类型
 *
 * @author zoulan
 * @since 2023-08-10
 */
import type { AxiosRequestConfig } from 'axios';

export { HttpErrorCodeEnum } from './enums';
/** 后端返回类型 */
export interface R {
  data: any;
  code: number;
  message: string;
  errorDetails: string;
}
/** 创建axios配置 */
export interface CreateAxiosOptions extends AxiosRequestConfig {}
/** 请求配置 */
export interface RequestConfig extends AxiosRequestConfig {
  /** 后端返回数据的转换 */
  transform?: (data: any) => any;
  isLoading?: boolean;
  /** 请求成功事件 */
  success?: (data: any) => void;
}

export interface ApiRequestConfig extends Pick<RequestConfig, 'transform' | 'isLoading'> {}
