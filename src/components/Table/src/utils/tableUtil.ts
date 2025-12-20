import type { PrimaryTableCol, TableRowData } from 'tdesign-vue-next';
import { computed } from 'vue';

import { format } from '/@/utils/format';

import type { BasicColumnType } from '../types/table';

export function getFormatValue(column: PrimaryTableCol<TableRowData>, record: Record<string, any>) {
  return format(record[column.colKey as string], (column as BasicColumnType).format!);
}

export function getFormatMapValue(column: PrimaryTableCol<TableRowData>, record: Record<string, any>) {
  return computed(() => {
    const formatMap = (column as BasicColumnType).formatMap;
    return formatMap?.get(record[column.colKey as string]);
  });
}
