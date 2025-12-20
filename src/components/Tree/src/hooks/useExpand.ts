/**
 * <p>
 * 树 展开 hooks
 * </p>
 *
 * @author zoulan
 * @since 2023-07-29
 */
import type { Ref } from 'vue';

export function useExpand(expandKeys: Ref<string[]>) {
  function setExpanded(_expandKeys: string[]) {
    expandKeys.value = _expandKeys;
  }
  function getExpanded(): string[] {
    return expandKeys.value;
  }
  function clearExpanded() {
    expandKeys.value = [];
  }
  return { setExpanded, getExpanded, clearExpanded };
}
