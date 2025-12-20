/**
 * <p>
 * 树 数据操作 hooks
 * </p>
 *
 * @author zoulan
 * @since 2023-07-29
 */
import type { TreeOptionData } from 'tdesign-vue-next';
import type { Ref } from 'vue';
import { unref } from 'vue';

import type { BasicLoadingProps } from '/@/hooks/web/useLoading';
import { KEYS_LABEL, KEYS_VALUE } from '/@/settings/componentSetting';
import { filter, forEach } from '/@/utils/tree';

import type { BasicTreeProps, TreeMethods } from '../types';

export function useData(
  props: BasicTreeProps,
  treeModel: Ref<TreeOptionData[]>,
  expandKeys: Ref<string[]>,
  methods: TreeMethods,
  loading: Ref<BasicLoadingProps>
) {
  const { getApi } = unref(props);
  let treeData: TreeOptionData[] = [];
  async function getLazyData(treeNode: any): Promise<void> {
    if (props.isLazy) {
      return getApi?.({ isLazy: true, parentId: treeNode.dataRef?.[KEYS_VALUE!] });
    }
    return undefined;
  }
  async function getData() {
    // 开启loading组件
    props.autoLoading && loading.value.openLoading();
    const data = await getApi?.({ isLazy: false });
    // 开启loading组件
    props.autoLoading && loading.value.closeLoading();
    treeData = data;
    treeModel.value = data;
  }

  function search(searchValue: string): void {
    const newTreeData = filter(treeData, (node) => {
      return node[KEYS_LABEL!].includes(searchValue);
    });
    const expanded: string[] = [];
    forEach(newTreeData, (node) => {
      expanded.push(node[KEYS_VALUE!]);
    });
    treeModel.value = newTreeData;
    expandKeys.value = expanded;
  }
  return { getLazyData, getData, search };
}
