/**
 * <p>
 * radio 选中 hooks
 * </p>
 *
 * @author zoulan
 * @since 2023-08-14
 */
import { watchImmediate } from '@vueuse/core';
import type { ModelRef, Ref } from 'vue';
import { nextTick } from 'vue';

import { isNullOrUnDefOrBlank } from '/@/utils/is';

import type { BasicRadioProps } from '../types';

export function useSelected(
  props: BasicRadioProps,
  model: ModelRef<string | undefined>,
  options: Ref<Recordable[]>,
  models: {
    model: ModelRef<string | undefined>;
    modelSelected: ModelRef<Recordable<any> | undefined>;
    modelSelectedLabel: ModelRef<string | undefined>;
  }
) {
  /**
   * 设置选择
   * @param selectKey
   */
  function setSelected(selectKey: string) {
    model.value = selectKey;
  }

  /**
   * 获取选择项
   * @returns 选择项 Recordable
   */
  function getSelected(): Recordable | undefined {
    return models.modelSelected.value;
  }

  /**
   * 获取选择值
   * @returns 选择值
   */
  function getSelectedValue(): string | undefined {
    return model.value;
  }

  /**
   * 清除选择项
   */
  function clearSelected() {
    model.value = undefined;
  }

  /**
   * 监听model
   * 设置选中项
   * 触发onSelectedChange事件
   */
  watchImmediate(
    () => model.value,
    (value) => {
      if (!isNullOrUnDefOrBlank(value)) {
        const option = options.value.find((option) => option[props.valueField!] === value);
        models.modelSelected.value = option;
      } else {
        models.modelSelected.value = undefined;
      }
      nextTick(() => props.onSelectedChange?.(value));
    }
  );

  return {
    getSelected,
    getSelectedValue,
    setSelected,
    clearSelected
  };
}
