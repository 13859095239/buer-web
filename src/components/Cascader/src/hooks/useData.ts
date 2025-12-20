/**
 * cascader 数据操作 hooks
 *
 * @author zoulan
 * @since 2024-05-31
 */
import { ref, unref } from 'vue';

import type { BasicCascaderProps } from '../types';

export function useData(props: BasicCascaderProps) {
  const options = ref<Recordable[]>([]);
  async function fetch(parms: Recordable) {
    const { getApi } = unref(props);
    const data = await getApi?.(parms);
    options.value = data;
  }
  /** 刷新数据 */
  async function reload(parms: Recordable = {}) {
    return await fetch(parms);
  }

  return {
    options,
    reload
  };
}
