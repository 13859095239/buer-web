/**
 * size hooks
 *
 * @author zoulan
 * @since 2023-08-15
 */
import { computed } from 'vue';

import type { BasicModalProps } from '../types';

export function useSize(props: BasicModalProps) {
  const widthComputed = computed(() => {
    const { width } = props;
    switch (width) {
      case 'column-1':
        return 500;
      case 'column-2':
        return 800;
      case 'column-3':
        return 1000;
      case 'larger':
        return '90%';
      default:
        return width;
    }
  });
  return { widthComputed };
}
