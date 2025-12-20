import { reactive } from 'vue';

import { getDictItemListByKeys } from '/@/api/system/dict';
import type { DictItemVO } from '/@/types/system/dictItem';
/**
 * 获取字典数据
 * @param dictKeys 字典key数组
 * @returns 字典数据dictMap, dictList
 */
export function useDictData(dictKeys: string[]) {
  const dictMap = reactive(new Map<string, DictItemVO>());
  const dictList = reactive<DictItemVO[]>([]);
  getDictItemListByKeys(dictKeys).then((r) => {
    const array: DictItemVO[] = r;
    array.forEach((p) => {
      dictMap.set(`${p.dictKey}-${p.value}`, p);
      dictList.push(p);
    });
  });
  return { dictMap, dictList };
}
