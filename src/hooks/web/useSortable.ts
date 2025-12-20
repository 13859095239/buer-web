import type { Options } from 'sortablejs';
import Sortable from 'sortablejs';
import type { Ref } from 'vue';
import { nextTick, unref } from 'vue';

export function useSortable(el: HTMLElement | Ref<HTMLElement>, options?: Options) {
  function initSortable() {
    nextTick(async () => {
      if (!el) return;
      Sortable.create(unref(el), {
        animation: 500,
        delay: 400,
        delayOnTouchOnly: true,
        ...options
      });
    });
  }

  return { initSortable };
}
