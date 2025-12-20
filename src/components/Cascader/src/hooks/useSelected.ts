/**
 * select 选中 hooks
 *
 * @author zoulan
 * @since 2023-08-14
 */
import { watchImmediate } from '@vueuse/core';
import { isArray } from 'lodash-es';
import type { ModelRef, Ref } from 'vue';
import { computed, nextTick, toValue } from 'vue';

import { isNullOrUnDefOrBlank } from '/@/utils/is';

import type { BasicCascaderProps } from '../types';

export function useSelected(
  props: BasicCascaderProps,
  options: Ref<Recordable[]>,
  models: {
    model: ModelRef<string | undefined>;
    modelSelected: ModelRef<Recordable<any> | undefined>;
    modelSelectedList: ModelRef<Recordable<any>[] | undefined>;
    modelSelectedLabel: ModelRef<string | undefined>;
  }
) {
  const { model, modelSelected, modelSelectedList, modelSelectedLabel } = models;
  /**
   * 设置选择项
   * @param selectKeys 选中项的key，多个key可以用逗号隔开string，也可以string[]
   */
  function setSelected(selectKeys?: string | string[]) {
    if (props.multiple) {
      // 多选
      const keys = isArray(selectKeys) ? selectKeys : selectKeys?.toString().split(',');
      selectedValueComputed.value = keys;
    } else {
      // 单选
      model.value = selectKeys as string;
    }
  }

  /**
   * 获取选择项，单选
   * @returns 选择项
   */
  function getSelected(): Recordable | undefined {
    const selectedOption = options.value.find(
      (option) => option[props.fieldNames?.value!] === selectedValueComputed.value
    );
    return selectedOption;
  }

  /**
   * 获取选择项，多选
   * @returns 选择项列表
   */
  function getSelectedList(): Recordable[] | undefined {
    const selectedOptions = options.value.filter(
      (option) => option[props.fieldNames?.value!] === selectedValueComputed.value
    );
    return selectedOptions;
  }

  /**
   * 获取选择值
   * @returns 选择值，多个以逗号隔开
   */
  function getSelectedValue(): string | undefined {
    return selectedValueComputed.value?.toString();
  }

  /** 清除选择项 */
  function clearSelected(): void {
    selectedValueComputed.value = undefined;
  }

  /** 选择值绑定ant-select v-model */
  const selectedValueComputed = computed({
    get() {
      if (isNullOrUnDefOrBlank(model.value)) {
        return undefined;
      } else {
        return model.value!.split(',');
      }
    },
    set(value: string[]) {
      modelSelected.value = getSelected();
      model.value = (value as string[]).join(',');
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
