/**
 * 表格行选择 hooks
 * 支持单选、多选
 *
 * @author zoulan
 * @since 2023-06-05
 */
import type { SelectOptions, TableProps } from 'tdesign-vue-next';
import type { ModelRef } from 'vue';
import { computed } from 'vue';

import { isEmpty } from '/@/utils/is';

export function useRowSelection(
  selectedRowsModel: ModelRef<Recordable[] | undefined>,
  selectedRowKeyModel: ModelRef<string | undefined>,
  selectedRowKeysModel: ModelRef<string[]>
) {
  // 是否选中
  const hasSelected = computed(() => !isEmpty(selectedRowKeysModel.value));

  // 选中改变事件处理
  const handleSelectChange: TableProps['onSelectChange'] = (
    keys: Array<string>,
    options: SelectOptions<Recordable>
  ) => {
    selectedRowsModel.value = options.selectedRowData;
    selectedRowKeyModel.value = keys === undefined ? undefined : keys.join(',');
    selectedRowKeysModel.value = keys;
  };

  /**
   * 设置选中行
   * @param rowKeys
   */
  function setSelectedKeys(rowKeys: string[]): void {
    selectedRowKeyModel.value = rowKeys === undefined ? undefined : rowKeys.join(',');
    selectedRowKeysModel.value = rowKeys;
  }

  /** 获取选中行keys，数组 */
  function getSelectedKeys(): string[] | undefined {
    return selectedRowKeysModel.value;
  }

  /** 获取选中行keys ，多个以逗号隔开 */
  function getSelectedKeysForString(): string | undefined {
    return selectedRowKeyModel.value;
  }

  /** 获取选中行 */
  function getSelectedRows(): Recordable[] | undefined {
    return selectedRowsModel.value;
  }

  /** 清空选择 */
  function clearSelected(): void {
    selectedRowKeyModel.value = undefined;
    selectedRowsModel.value = undefined;
    selectedRowKeysModel.value = [];
  }
  return {
    handleSelectChange,
    hasSelected,
    setSelectedKeys,
    getSelectedKeys,
    getSelectedKeysForString,
    getSelectedRows,
    clearSelected
  };
}
