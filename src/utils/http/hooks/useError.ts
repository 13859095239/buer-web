/**
 * 检查返回的信息，错误消失提示
 *
 * @author zoulan
 * @since 2023-08-10
 */
import type { AxiosError } from 'axios';

import { useUserStore } from '/@/store/modules/user';

import { errorLog } from '../../log';
import { errorMessage } from '../../prompt';
import { HttpErrorCodeEnum } from '../types';

interface Error {
  code: number;
  message: string;
}

/**
 * 处理axios返回的错误
 *
 * @param axiosError AxiosError返回的错误
 */
export function handleAxiosError(axiosError: AxiosError) {
  const code: number = Number(axiosError.response?.status) || 0;
  // 转换后的错误提示内容
  const formatMessage: string = getErrorMessageByStatus(code, axiosError.message);
  errorMessageByCode(code, formatMessage);
}

/**
 * 处理后端返回的错误
 *
 * @param error 后端返回的错误
 */
export function handleRequestError(error: Error) {
  const code: number = Number(error.code) || 0;
  errorMessageByCode(code, error.message);
}

/**
 * 弹出错误提示
 *
 * @param code 错误码
 * @param originalmessage 原始的错误内容
 */
export function errorMessageByCode(code: number, message: string) {
  // 写日志
  errorLog(message);
  // 弹出错误提示
  errorMessage(message);
  // 当424、401属于鉴权失败，注销重新登录
  if ([424, 401].includes(code)) {
    const userStore = useUserStore();
    userStore.logout();
  }
}

/**
 * 根据错误码返回错误提示内容
 * 错误提示较为技术化，通过该方法转换成用户能够理解的
 *
 * @param code 错误码
 * @param originalmessage 原始的错误内容
 * @returns 错误提示内容
 */
export function getErrorMessageByStatus(code: number, originalmessage: string): string {
  let message = originalmessage;
  switch (code) {
    case 500:
      message = HttpErrorCodeEnum.CODE_500;
      break;
  }
  return message;
}
