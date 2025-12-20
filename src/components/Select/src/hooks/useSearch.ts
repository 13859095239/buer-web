/**
 * select 查询 hooks
 *
 * @author zoulan
 * @since 2023-08-15
 */
import { useDebounceFn } from '@vueuse/core';
import { computed } from 'vue';

import type { BasicSelectProps, SelectMethods } from '../types';

export function useSearch(props: BasicSelectProps, methods: SelectMethods) {
  /** 是否显示查询 */
  const showSearchComputed = computed(() => {
    if (props.searchType) {
      return true;
    } else {
      return false;
    }
  });

  /** 本地数据查询 */
  const filterMethodComputed = computed(() => {
    if (props.searchType === 'filter') {
      if (props.filterMethon) {
        return props.filterMethon;
      } else {
        return (search, option) => {
          return option.label.toLowerCase().includes(search.toLowerCase());
        };
      }
    } else {
      return undefined;
    }
  });

  /** 远程数据查询 */
  const searchComputed = computed(() => {
    if (props.searchType === 'search') {
      if (props.searchMethon) {
        return useDebounceFn(() => {
          props.searchMethon;
        }, 300);
      } else {
        return useDebounceFn((value) => {
          methods.reload({ name: value });
        }, 300);
      }
    } else {
      return undefined;
    }
  });

  return {
    filterMethodComputed,
    searchComputed,
    showSearchComputed
  };
}
