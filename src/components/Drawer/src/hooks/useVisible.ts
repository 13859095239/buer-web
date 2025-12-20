/**
 * Drawer显示/隐藏 hooks
 *
 * @author zoulan
 * @since 2023-08-15
 */
import { ref } from 'vue';

import type { BasicDrawerProps } from '../types';

export function useVisible(props: BasicDrawerProps) {
  const visible = ref(false);
  const show = () => {
    visible.value = true;
  };
  const close = () => {
    visible.value = false;
    props.onClosed?.();
  };
  return {
    show,
    close,
    visible
  };
}
