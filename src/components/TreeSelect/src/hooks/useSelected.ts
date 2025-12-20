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

import { isEmpty } from '/@/utils/is';
import { findNode, searchNodes } from '/@/utils/tree';

import type { BasicTreeSelectProps } from '../types';

export function useSelected(
  props: BasicTreeSelectProps,
  treeModel: Ref<TreeOptionData[]>,
  models: {
    model: ModelRef<string | undefined>;
    modelSelected: ModelRef<Recordable<any> | undefined>;
    modelSelectedLabel: ModelRef<string | undefined>;
    modelSelectedList: ModelRef<Recordable<any>[] | undefined>;
  }
) {
  const { model, modelSelected, modelSelectedLabel, modelSelectedList } = models;
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
    get(): string | string[] | undefined {
      if (isEmpty(model.value)) {
        // 当选择值为空时
        return undefined;
      } else if (props.multiple) {
        // 当树为多选时
        return model.value!.split(',');
      } else {
        // 当树为单选时
        return model.value;
      }
    },
    set(value) {
      if (isEmpty(value)) {
        // 当选择值为空时
        model.value = undefined;
        modelSelected.value = undefined;
        modelSelectedLabel.value = undefined;
        modelSelectedList.value = undefined;
      } else {
        // 当选择值不为空
        if (props.multiple) {
          // 当树为多选时
          const nodes = searchNodes(treeModel.value, (p) => p[props.keys!.value!]);
          model.value = value!.toString();
          modelSelectedList.value = nodes;
          modelSelected.value = nodes[0];
          modelSelectedLabel.value = nodes.map((item) => item[props.keys!.label!]).toString();
        } else {
          // 当树为单选时
          const node = findNode(treeModel.value, (p) => p[props.keys!.value!]);
          model.value = value! as string;
          modelSelectedList.value = [node];
          modelSelected.value = node;
          modelSelectedLabel.value = node[props.keys!.label!];
        }
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
