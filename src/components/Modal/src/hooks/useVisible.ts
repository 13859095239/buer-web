/**
 * 显示/隐藏 hooks
 *
 * @author zoulan
 * @since 2023-08-15
 */
import { ref } from 'vue';

import type { BasicModalProps } from '../types';

export function useVisible(props: BasicModalProps) {
  const visible = ref<boolean>(false);
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
