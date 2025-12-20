/**
 * 全屏 hooks
 *
 * @author zoulan
 * @since 2023-08-15
 */
import type { DialogProps } from 'tdesign-vue-next';
import type { Ref } from 'vue';

export function useFullscreen(mode: Ref<DialogProps['mode']>) {
  function toggleFullScreen(value: boolean) {
    if (value === undefined) {
      mode.value = mode.value === 'modal' ? 'full-screen' : 'modal';
    } else {
      mode.value = value ? 'full-screen' : 'modal';
    }
  }
  return { toggleFullScreen };
}
