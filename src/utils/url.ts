/**
 * url工具类
 *
 * @author zoulan
 * @since 2023-05-22
 */
import { useBrowserLocation } from '@vueuse/core';

/**
 * 获取url查询参数值
 * @param parm 参数
 * @returns 参数值
 */
export function getUrlSearchByParm(parm: string) {
  const location = useBrowserLocation();
  const { search } = location.value;
  if (search?.length === 0) return '';
  const map: Map<string, string> = new Map();
  search
    ?.replace('?', '')
    .split('&')
    .forEach((p) => {
      const arr = p.split('=');
      map.set(arr[0], arr[1]);
    });
  return map.get(parm);
}
