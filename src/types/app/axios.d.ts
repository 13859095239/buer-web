/**
 * axios对象定义
 *
 * @author zoulan
 * @since 2023-05-22
 */
export type ErrorMessageMode = 'none' | 'modal' | 'message' | undefined;

/** axios请求参数 */
export interface RequestOptions {
  joinParamsToUrl?: boolean;
  formatDate?: boolean;
  isTransformResponse?: boolean;
  isReturnNativeResponse?: boolean;
  joinPrefix?: boolean;
  apiUrl?: string;
  urlPrefix?: string;
  errorMessageMode?: ErrorMessageMode;
  joinTime?: boolean;
  ignoreCancelToken?: boolean;
  withToken?: boolean;
}
/** axios请求返回结果 */
export interface Result<T = any> {
  code: number;
  type: 'success' | 'error' | 'warning';
  message: string;
  result: T;
}
