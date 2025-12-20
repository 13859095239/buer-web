/**
 * <p>
 * 树 复选框 hooks
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
import { searchNodes } from '/@/utils/tree';

import type { BasicTreeProps } from '../types';

export function useChecked(
  props: BasicTreeProps,
  treeModel: Ref<TreeOptionData[]>,
  models: {
    modelCheckedValue: ModelRef<string | undefined>;
    modelCheckedList: ModelRef<Recordable<any>[] | undefined>;
    modelCheckedLabel: ModelRef<string | undefined>;
  }
) {
  const { modelCheckedValue, modelCheckedList, modelCheckedLabel } = models;
  function setChecked(selectKeys: string) {
    checkedValueComputed.value = [selectKeys];
  }
  function getChecked(): string | undefined {
    return checkedValueComputed.value?.[0];
  }
  function clearChecked() {
    checkedValueComputed.value = [];
  }

  const checkedValueComputed = computed({
    get() {
      return !isNullOrUnDefOrBlank(modelCheckedValue.value) ? modelCheckedValue.value!.split(',') : undefined;
    },
    set(value: string[] | undefined) {
      if (value === undefined) {
        modelCheckedValue.value = undefined;
        modelCheckedList.value = undefined;
        modelCheckedLabel.value = undefined;
      } else {
        const nodes = searchNodes(treeModel.value, (p) => p[props.keys!.value!]);
        modelCheckedList.value = nodes;
        modelCheckedValue.value = value!.toString();
        modelCheckedLabel.value = nodes.map((item) => item[props.keys!.label!]).toString();
      }
    }
  });

  watchImmediate(
    () => toValue(modelCheckedValue.value),
    (value) => {
      nextTick(() => props.onCheckedChange?.(value!));
    }
  );

  return { setChecked, getChecked, clearChecked, checkedValueComputed };
}
