import { nextTick } from 'vue';

import { useSortable } from '/@/hooks/web/useSortable';
import { useMultipleTabStore } from '/@/store/modules/multipleTab';
import { isNullOrUnDefOrBlank } from '/@/utils/is';

interface ChangeEvent extends Event {
  target: HTMLInputElement;
}
export function useTabsDrag(affixTextList: string[]) {
  const tabStore = useMultipleTabStore();
  nextTick(() => {
    const el = document.querySelectorAll('.app-multiple-tabs .ant-tabs-nav-list')?.[0] as HTMLElement;
    const { initSortable } = useSortable(el, {
      filter: (e: ChangeEvent) => {
        const text = e?.target?.innerText;
        if (!text) return false;
        return affixTextList.includes(text);
      },
      onEnd: (evt) => {
        const { oldIndex, newIndex } = evt;
        if (isNullOrUnDefOrBlank(oldIndex) || isNullOrUnDefOrBlank(newIndex) || oldIndex === newIndex) {
          return;
        }
        const currentTab = this.tabs[oldIndex];
        this.tabs.splice(oldIndex, 1);
        this.tabs.splice(newIndex, 0, currentTab);
      }
    });
    initSortable();
  });
}
