import type { TreeOptionData } from 'tdesign-vue-next';
import type { Ref } from 'vue';
import { unref } from 'vue';

import type { BasicTreeSelectProps } from '../types';

export function useData(formProps: BasicTreeSelectProps, treeModel: Ref<TreeOptionData[]>) {
  const { getApi } = unref(formProps);
  async function getLazyData(treeNode: TreeOptionData): Promise<void> {
    return getApi?.({ isLazy: true, parentId: treeNode.dataRef?.key });
  }
  async function getData() {
    const data = await getApi?.({ isLazy: false });
    treeModel.value = data;
  }
  return { getLazyData, getData };
}
