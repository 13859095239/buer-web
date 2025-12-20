/**
 * <p>
 * 树 选中 hooks
 * </p>
 *
 * @author zoulan
 * @since 2023-07-29
 */
import { watchImmediate } from '@vueuse/core';
import type { TreeOptionData } from 'tdesign-vue-next';
import type { ModelRef, Ref } from 'vue';
import { computed, nextTick, toValue } from 'vue';

import { isNullOrUnDefOrBlank } from '/@/utils/is';
import { findNode } from '/@/utils/tree';

import type { BasicTreeProps } from '../types';

export function useSelected(
  props: BasicTreeProps,
  treeModel: Ref<TreeOptionData[]>,
  models: {
    model: ModelRef<string | undefined>;
    modelSelected: ModelRef<Recordable<any> | undefined>;
    modelSelectedLabel: ModelRef<string | undefined>;
  }
) {
  const { model, modelSelected, modelSelectedLabel } = models;
  function setSelected(_selectKeys: string) {
    selectedValueComputed.value = [_selectKeys];
  }
  function getSelected(): string | undefined {
    return selectedValueComputed.value?.[0];
  }
  function clearSelected() {
    selectedValueComputed.value = [];
  }

  const selectedValueComputed = computed({
    get() {
      return !isNullOrUnDefOrBlank(model.value) ? [model.value!] : undefined;
    },
    set(value) {
      if (isNullOrUnDefOrBlank(value)) {
        model.value = undefined;
        modelSelectedLabel.value = undefined;
        modelSelected.value = undefined;
      } else {
        const node = findNode(treeModel.value, (p) => p[props.keys!.value!]);
        model.value = value![0];
        modelSelectedLabel.value = node[props.keys!.label!];
        modelSelected.value = node;
      }
    }
  });

  watchImmediate(
    () => toValue(model),
    (value) => {
      nextTick(() => props.onSelectedChange?.(value!));
    }
  );

  return { getSelected, setSelected, clearSelected, selectedValueComputed };
}
