/**
 * checkbox 选中 hooks
 *
 * @author zoulan
 * @since 2023-08-14
 */
import { watchImmediate } from '@vueuse/core';
import { isArray } from 'lodash-es';
import type { ModelRef, Ref } from 'vue';
import { computed, nextTick, toValue } from 'vue';

import type { BasicCheckboxGroupProps } from '../types';

export function useSelected(
  props: BasicCheckboxGroupProps,
  options: Ref<string[]>,
  models: {
    model: ModelRef<string | undefined>;
    modelSelected: ModelRef<Recordable<any> | undefined>;
    modelSelectedList: ModelRef<Recordable<any>[] | undefined>;
    modelSelectedLabel: ModelRef<string | undefined>;
  }
) {
  const { model, modelSelected, modelSelectedList, modelSelectedLabel } = models;
  /**
   * 设置选择
   * @param selectKeys
   */
  function setSelected(selectKeys?: string | string[]) {
    const keys = isArray(selectKeys) ? selectKeys : selectKeys?.split(',');
    selectedValueComputed.value = keys;
  }

  /**
   * 获取选择项，单选
   * @returns 选择项 Recordable
   */
  function getSelected(): Recordable | undefined {
    const selectedOption = options.value.find((option) => option[props.valueField!] === selectedValueComputed.value);
    return selectedOption;
  }

  /**
   * 获取选择项，多选
   * @returns 选择项 Recordable[]
   */
  function getSelectedList(): Recordable[] | undefined {
    const selectedOptions = options.value.filter((option) => option[props.valueField!] === selectedValueComputed.value);
    return selectedOptions;
  }

  /**
   * 获取选择项label
   * @returns 选择项label，多个以逗号隔开
   */
  function getSelectedLable(): string | undefined {
    const selectedList = getSelectedList();
    const label = selectedList?.map((item) => item[props.labelField!]).join(',');
    return label;
  }

  /**
   * 获取选择值
   * @returns 选择值
   */
  function getSelectedValue(): string | undefined {
    return selectedValueComputed.value?.toString();
  }

  /** 清除选择项 */
  function clearSelected(): void {
    selectedValueComputed.value = undefined;
  }

  // 选择值绑定ant-select v-model
  const selectedValueComputed = computed({
    get() {
      return model.value!.split(',');
    },
    set(value: string[] | undefined) {
      modelSelected.value = getSelected();
      model.value = (value as string[]).join(',');
      modelSelectedList.value = getSelectedList();
      modelSelectedLabel.value = getSelectedLable();
    }
  });

  /**  监听model，触发onSelectedChange事件 */
  watchImmediate(
    () => toValue(model),
    () => {
      nextTick(() => props.onSelectedChange?.(getSelected()));
    }
  );

  return {
    selectedValueComputed,
    getSelected,
    getSelectedList,
    getSelectedValue,
    setSelected,
    clearSelected
  };
}
