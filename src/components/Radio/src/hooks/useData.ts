/**
 * <p>
 * radio 数据操作 hooks
 * </p>
 *
 * @author zoulan
 * @since 2023-08-14
 */
import { ref } from 'vue';

import type { BasicRadioProps } from '../types';

export function useData(props: BasicRadioProps) {
  const options = ref<Recordable[]>([]);
  async function fetch() {
    const { getApi, options: optionsData } = props;
    if (optionsData === undefined) {
      // 远程api获取
      const r = await getApi?.();
      options.value = r;
    } else {
      // 本地获取
      options.value = optionsData!;
    }
  }
  async function reload() {
    return await fetch();
  }
  return {
    options,
    reload
  };
}
