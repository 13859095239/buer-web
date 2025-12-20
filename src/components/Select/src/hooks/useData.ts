/**
 * select 数据操作 hooks
 * 支持远程API和本地数据源
 *
 * @author zoulan
 * @since 2023-08-15
 */
import { ref } from 'vue';

import type { BasicSelectProps } from '../types';

export function useData(props: BasicSelectProps) {
  const options = ref<Recordable[]>([]);
  const hasLoaded = ref(false);
  const loading = ref(false);

  /**
   * 获取数据
   * @param params 请求参数
   */
  async function fetchData(params: Recordable = {}) {
    const { getApi, options: optionsData } = props;

    if (optionsData !== undefined) {
      // 本地数据
      options.value = optionsData;
      return;
    }

    loading.value = true;
    const result = await getApi?.(params);
    options.value = result || [];
    loading.value = false;
  }

  /**
   * 刷新数据
   * @param params 请求参数
   */
  async function reload(params: Recordable = {}) {
    return await fetchData(params);
  }

  /**
   * 下拉框显示/隐藏事件
   * 实现延迟加载，首次展开时才加载数据
   * @param visible 是否显示
   */
  function onPopupVisibleChange(visible: boolean) {
    if (!visible || hasLoaded.value) return;

    hasLoaded.value = true;
    reload();
  }

  return {
    options,
    loading,
    reload,
    onPopupVisibleChange
  };
}
