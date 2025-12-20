/**
 * 表格Props处理 hooks
 *
 * @author zoulan
 * @since 2025-07-10
 */

import { Button } from 'tdesign-vue-next';
import { computed } from 'vue';

import type { BasicTableProps } from '../types';

/**
 * 表格Props处理
 *
 */
export function useTableProps(props: BasicTableProps) {
  // 处理后的columns配置
  // 处理选择框列
  const columnsComputed = computed(() => {
    const columns = props.columns?.map((column) => column);
    // 添加行选择列
    switch (props.rowSelectionType) {
      case 'single':
      case 'multiple':
        // unshift 创建第一列
        columns?.unshift({ colKey: 'selection', type: props.rowSelectionType, width: 50 });
        break;
    }

    if (props.tableDrag?.drag) {
      // unshift 创建第一列
      columns?.unshift({
        // 列拖拽排序必要参数
        colKey: 'drag',
        title: '排序',
        cell: () => <Button class="i-tdesign:move z-9999" />,
        width: 60
      });
    }

    columns!.forEach((column) => {
      column.ellipsis = column.ellipsis === undefined || true;
    });
    return columns;
  });
  return { columnsComputed };
}
