/**
 * 判断工具类
 *
 * @author zoulan
 * @since 2023-05-22
 */
import { isArray, isMap, isNumber, isObject, isSet, isString } from 'lodash-es';

/**
 * 是否undefined
 *
 * @param val
 * @returns boolean
 */
export function isUnDef(val: unknown): boolean {
  return val === undefined;
}

/**
 * 是否null
 *
 * @param val
 * @returns boolean
 */
export function isNull(val: unknown): boolean {
  return val === null;
}

/**
 * 是否为null、空
 *
 * @param val
 * @returns boolean
 */
export function isBlank(val: unknown): boolean {
  if (val === null || val === undefined) return true;
  if (isString(val)) {
    return (val as string).trim() === '';
  } else if (isArray(val)) {
    return (val as []).length === 0;
  }
  return false;
}

/**
 * 是否null、undefined
 *
 * @param val
 * @returns boolean
 */
export function isNullOrUnDef(val: unknown): boolean {
  return isUnDef(val) || isNull(val);
}

/**
 * 是否null、undefined、blank
 *
 * @param val
 * @returns boolean
 */
export function isNullOrUnDefOrBlank(val: unknown): boolean {
  return isUnDef(val) || isNull(val) || isBlank(val);
}

/**
 * 检查传入的值是否为空。
 *
 * 以下情况将被认为是空：
 * - 值为null。
 * - 值为undefined。
 * - 值为一个空字符串。
 * - 值为一个长度为0的数组。
 * - 值为一个没有元素的Map或Set。
 * - 值为一个没有属性的对象。
 *
 * @param {T} value 要检查的值。
 * @returns {boolean} 如果值为空，返回true，否则返回false。
 */
export function isEmpty<T = unknown>(value?: T): value is T {
  if (value === null || value === undefined || value === '') {
    return true;
  }
  if (isArray(value) || isString(value)) {
    return value.length === 0;
  }
  if (isMap(value) || isSet(value)) {
    return value.size === 0;
  }
  if (isObject(value)) {
    return Object.keys(value).length === 0;
  }
  return false;
}
