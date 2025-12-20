/**
 * select 选中状态管理 hooks
 * 处理单选/多选逻辑、标签更新、事件回调
 *
 * @author zoulan
 * @since 2023-08-14
 */
import { watchImmediate } from '@vueuse/core';
import { isArray } from 'lodash-es';
import type { ModelRef, Ref } from 'vue';
import { computed, nextTick, toValue } from 'vue';

import { isBlank, isEmpty } from '/@/utils/is';

import type { BasicSelectProps } from '../types';

export function useSelected(
  props: BasicSelectProps,
  options: Ref<Recordable[]>,
  models: {
    model: ModelRef<string | undefined>;
    modelSelectedLabel: ModelRef<string | undefined>;
  }
) {
  const { model, modelSelectedLabel } = models;

  /**
   * 设置选择项
   * @param selectKeys 选中项的key
   * - 多个key可以用逗号隔开string
   * - 也可以string[]
   * - undefined时清空所有选中项
   */
  function setSelected(selectKeys?: string | string[]) {
    if (isBlank(selectKeys)) {
      clearSelected();
      return;
    }
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
   * 获取当前选中的值
   * @returns 当前选中的值，多选返回数组，单选返回字符串
   */
  function getCurrentValues(): (string | string[]) | undefined {
    return selectedValueComputed.value;
  }

  /**
   * 获取选择项，单选
   * @returns 选择项
   */
  function getSelected(): Recordable | undefined {
    if (!options.value?.length) return undefined;
    const current = getCurrentValues();
    if (current === undefined || isArray(current)) return undefined;
    return options.value.find((option) => option[props.keys!.value!] === current);
  }

  /**
   * 获取选择项，多选
   * @returns 选择项列表
   */
  function getSelectedList(): Recordable[] | undefined {
    if (!options.value?.length) return [];
    const current = getCurrentValues();
    if (current === undefined) return [];

    const values = Array.isArray(current) ? current : [current];
    return options.value.filter((option) => values.includes(option[props.keys!.value!]));
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
    model.value = undefined;
    modelSelectedLabel.value = undefined;
  }

  /**
   * 选择值绑定 v-model
   * 处理单选/多选的值转换逻辑
   * - 单选：返回字符串
   * - 多选：返回字符串数组
   */
  const selectedValueComputed = computed<undefined | string | string[]>({
    get() {
      if (isEmpty(model.value)) {
        return undefined;
      }
      if (!props.multiple) {
        // 单选：直接返回字符串
        return model.value;
      } else {
        // 多选：将逗号分隔的字符串转换为数组
        return model.value!.split(',').filter(Boolean);
      }
    },
    set(value) {
      if (isEmpty(value)) {
        clearSelected();
        return;
      }
      // 更新 model 值
      if (props.multiple) {
        // 多选：将数组转换为逗号分隔的字符串
        model.value = (value as unknown as string[]).join(',');
      } else {
        // 单选：直接设置字符串
        model.value = value as unknown as string;
      }

      // 更新标签（如果 options 已加载）
      updateSelectedLabel();
    }
  });

  /**
   * 更新选中标签
   * 根据当前选中的选项自动更新标签文本
   */
  async function updateSelectedLabel() {
    await nextTick();
    if (props.multiple) {
      const selectedOptions = getSelectedList();
      modelSelectedLabel.value = selectedOptions?.length
        ? selectedOptions.map((option) => option[props.keys!.label!]).join(',')
        : undefined;
    } else {
      const selected = getSelected();
      modelSelectedLabel.value = selected ? selected[props.keys!.label!] : undefined;
    }
  }
  /**
   * 监听 model 变化，触发 onSelectedChange 事件
   * 使用 nextTick 确保 DOM 更新后再触发事件
   */
  watchImmediate(
    () => toValue(model),
    () => {
      nextTick(() => {
        const selected = props.multiple ? getSelectedList() : getSelected();
        props.onSelectedChange?.(selected);
      });
    }
  );

  /**
   * 监听选项或 model 变化，自动更新标签
   * 当 options 加载完成后，根据当前选中值回填标签
   */
  watchImmediate(
    () => [options.value, toValue(model)] as const,
    () => {
      if (!getSelected()) return;
      // 当 options 加载完成后，总是更新 label（覆盖外部提供的 label）
      updateSelectedLabel();
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
