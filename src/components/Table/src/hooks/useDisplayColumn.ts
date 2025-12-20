/**
 * 显示列 hooks
 *
 * @author zoulan
 * @since 2025-07-25
 */
import type { CheckboxGroupValue, TableProps, TdPrimaryTableProps } from 'tdesign-vue-next';
import type { ComputedRef } from 'vue';
import { ref } from 'vue';

import type { BasicColumnType, BasicTableProps } from '../types';

export function useDisplayColumn(props: BasicTableProps, columnsComputed: ComputedRef<BasicColumnType[] | undefined>) {
  /** 默认显示哪些列 */
  const defaultDisplayColumns = columnsComputed
    .value!.filter((column) => column.colKey).map((column) => column.colKey!);

  /** 显示的列 */
  const displayColumns = ref<TableProps['displayColumns']>(defaultDisplayColumns);
  // 用于设置允许用户对哪些列进行显示或隐藏的控制，默认为全部字段
  const fields = columnsComputed
    .value!.filter((column) => column.colKey && !['drag', 'actions'].includes(column.colKey)).map((column) => column.colKey!);
  const columnControllerConfig: TdPrimaryTableProps['columnController'] = {
    // 隐藏组件内部的 列配置按钮
    hideTriggerButton: true,
    fields
  };

  /**
   * 当前显示列发生变化时触发
   *
   */
  function onDisplayColumnsChange(value: CheckboxGroupValue): void {}

  return { displayColumns, onDisplayColumnsChange, columnControllerConfig };
}
