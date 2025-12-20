/**
 * http工具类
 * axios封装
 *
 * @author zoulan
 * @since 2023-05-22
 */
import type { AxiosRequestConfig } from 'axios';

import { AXIOS_REQUEST_CONFIG } from '/@/settings/axiosSetting';

import { Axios } from './Axios';

const axiosRequestConfig: AxiosRequestConfig = {
  ...AXIOS_REQUEST_CONFIG
};
/** axios对象 */
export const http = new Axios(axiosRequestConfig);
/** 是否正在加载数据 */
export const loading = http.loading;
export type { ApiRequestConfig } from './types';
