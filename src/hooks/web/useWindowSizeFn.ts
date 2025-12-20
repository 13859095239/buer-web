import { useDebounceFn, useWindowSize } from '@vueuse/core';
import type { Ref } from 'vue';
import { watch } from 'vue';

interface WindowSizeOptions {
  immediate?: boolean;
  wait?: number;
}
export function useWindowSizeFn(
  fn: (width: Ref<number>, height: Ref<number>) => void,
  options: WindowSizeOptions = { immediate: true, wait: 150 }
): { windowWidth: Ref<number>; windowHeight: Ref<number> } {
  const { width, height } = useWindowSize();
  const { immediate, wait } = options;
  watch(
    [width, height],
    useDebounceFn(() => {
      fn(width, height);
    }, wait),
    {
      immediate
    }
  );
  return {
    windowWidth: width,
    windowHeight: height
  };
}
