/**
 * select 查询 hooks
 *
 * @author zoulan
 * @since 2024-05-31
 */
import type { TdCascaderProps, TreeNodeModel } from 'tdesign-vue-next';
import { computed } from 'vue';

import type { BasicCascaderProps, CascaderMethods } from '../types';

export function useSearch(props: BasicCascaderProps, methods: CascaderMethods) {
  /** 默认筛选数据方法 */
  const filterOption: TdCascaderProps['filter'] = (filterWords: string, node: TreeNodeModel) => {
    return node.label?.indexOf(filterWords) !== -1;
  };

  /** showSearch prop 参数 */
  const showSearchComputed = computed(() => {
    if (props.showSearch !== false && props.showSearch !== undefined) {
      return props.showSearch;
    } else {
      return { filter: filterOption };
    }
  });

  return {
    showSearchComputed
  };
}
