/**
 * 表格分页 hooks
 *
 * @author zoulan
 * @since 2023-06-05
 */

import type { PageInfo, PaginationProps } from 'tdesign-vue-next';
import type { Ref } from 'vue';
import { computed, ref } from 'vue';

import { PAGE_SIZE_OPTIONS } from '/@/settings/componentSetting';

import type { BasicTableProps, TableMethods } from '../types';

export function usePagination(props: BasicTableProps, total: Ref<number>, methods: TableMethods) {
  const current = ref<number>(1);
  const pageSize = ref<number>(PAGE_SIZE_OPTIONS[0]);
  const pagination = computed((): PaginationProps | undefined => {
    if (props.pagination === false) {
      return undefined;
    } else {
      const simple = props.pagination === 'simple';
      return {
        pageSizeOptions: PAGE_SIZE_OPTIONS,
        pageSize: pageSize.value,
        current: current.value,
        total: total.value,
        showJumper: !simple,
        showPageSize: true,
        onPageSizeChange: (_pageSize: number, pageInfo: PageInfo) => {
          current.value = pageInfo.current;
          pageSize.value = _pageSize;
        }
      };
    }
  });
  function changePager(pag: { pageSize: number; current: number }): void {
    current.value = pag.current;
    pageSize.value = pag.pageSize;
    methods?.reload?.();
  }
  return {
    pagination,
    current,
    pageSize,
    changePager
  };
}
