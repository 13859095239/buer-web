/**
 * 排序 hooks
 * todo:后续再完善排序功能
 *
 * @author zoulan
 * @since 2024-04-17
 */
import type { Ref } from 'vue';
import { nextTick } from 'vue';

import { useSortable } from '/@/hooks/web/useSortable';
import { isNullOrUnDefOrBlank } from '/@/utils/is';

import type { UploadFileList } from '../types';

export function useSort(fileList: Ref<UploadFileList>) {
  nextTick(() => {
    const el = document.querySelectorAll('.ant-upload-list')?.[0] as HTMLElement;
    const { initSortable } = useSortable(el, {
      onEnd: (evt) => {
        const { oldIndex, newIndex } = evt;
        if (isNullOrUnDefOrBlank(oldIndex) || isNullOrUnDefOrBlank(newIndex) || oldIndex === newIndex) {
          return;
        }
        // 排序完成后，调整fileList顺序
        const currentTab = fileList.value[oldIndex!];
        fileList.value.splice(oldIndex!, 1);
        fileList.value.splice(newIndex!, 0, currentTab);
      }
    });
    initSortable();
  });
  return {};
}
