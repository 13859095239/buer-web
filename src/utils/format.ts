import { isFunction } from 'lodash-es';
import moment from 'moment';

import { IS_LIST, LOCK_FLAG_LIST } from '/@/constants/systemConstants';

import { isNullOrUnDefOrBlank } from './is';

moment.updateLocale('es', {
  invalidDate: ''
});

// 格式类型
export type FormatType =
  | 'YYYY-MM'
  | 'YYYY-MM-DD'
  | 'YYYY-MM-DD HH'
  | 'YYYY-MM-DD HH:mm'
  | 'YYYY-MM-DD HH:mm:ss'
  | 'status'
  | 'is'
  | 'lockFlag'
  | ((value) => string);
/**
 * 格式转换
 *
 * @param value 值
 * @param formatType 格式类型
 * @returns 转换后的结果
 */
export function format(value: string, formatType: FormatType) {
  if (isFunction(formatType)) {
    return formatType(value);
  }
  if (isNullOrUnDefOrBlank(value)) return value;
  switch (formatType) {
    case 'YYYY-MM':
      return moment(value).format(formatType);
    case 'YYYY-MM-DD':
      return moment(value).format(formatType);
    case 'YYYY-MM-DD HH':
      return moment(value).format(formatType);
    case 'YYYY-MM-DD HH:mm':
      return moment(value).format(formatType);
    case 'YYYY-MM-DD HH:mm:ss':
      return moment(value).format(formatType);
    case 'lockFlag':
      return LOCK_FLAG_LIST.find((p) => p.id === value)?.name;
    case 'is':
      return IS_LIST.find((p) => p.id === value)?.name;
  }
}

/**
 * 格式化文件大小
 *
 * @param bytes 文件大小（字节）
 * @returns 格式化后的文件大小字符串
 */
export function formatFileSizeByBytes(bytes: number): string {
  if (bytes === 0) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${Number((bytes / k ** i).toFixed(2))} ${sizes[i]}`;
}
