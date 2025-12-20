/**
 * checkbox 数据操作 hooks
 *
 * @author zoulan
 * @since 2023-08-15
 */
import { ref, unref } from 'vue';

import type { BasicCheckboxGroupProps } from '../types';

export function useData(props: BasicCheckboxGroupProps) {
  const options = ref<Recordable[]>([]);

  /** 远程获取数据 */
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
