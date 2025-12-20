<!--
  - 选择器组件
  - 支持单选/多选、拖拽排序、远程/本地数据源
  -
  - @author zoulan
  - @since 2023-08-15
  -->
<template>
  <Select
    v-model:value="selectedValueComputed"
    :disabled="!props.editable"
    :multiple="props.multiple"
    :placeholder="props?.placeholder"
    :filter="filterMethodComputed"
    class="w-full"
    @search="searchComputed"
    @popup-visible-change="onPopupVisibleChange"
  >
    <template #valueDisplay>
      <ValueDisplay
        v-model:modelValue="model"
        v-model:selectedLabel="modelSelectedLabel"
        :multiple="props.multiple"
        :drag="props.drag"
      />
    </template>
    <Option
      v-for="option in options"
      :key="option[props.keys.value!]"
      :value="option[props.keys.value!]"
      :label="option[props.keys.label!]"
    ></Option>
  </Select>
</template>
<script setup lang="ts">
import { defaultsDeep } from 'lodash-es';
import { Option, Select } from 'tdesign-vue-next';

import { KEYS_CHILDREN, KEYS_DISABLED, KEYS_LABEL, KEYS_VALUE, SELECT_PLACEHOLDER } from '/@/settings/componentSetting';

import ValueDisplay from './components/ValueDisplay.vue';
import { useData } from './hooks/useData';
import { useSearch } from './hooks/useSearch';
import { useSelected } from './hooks/useSelected';
import type { BasicSelectProps, SelectEmit, SelectMethods } from './types';

const props = withDefaults(defineProps<BasicSelectProps>(), {
  immediate: false,
  multiple: false,
  drag: false,
  placeholder: SELECT_PLACEHOLDER,
  editable: true,
  keys: () => ({
    label: KEYS_LABEL,
    value: KEYS_VALUE,
    children: KEYS_CHILDREN,
    disabled: KEYS_DISABLED
  })
});

const emit = defineEmits<SelectEmit>();

/** 选中的值,多个以逗号隔开 */
const model = defineModel<string>();
/** 选中的标签文本,多个以逗号隔开 */
const modelSelectedLabel = defineModel<string>('selectedLabel');

/** 组件方法 */
const methods: Partial<SelectMethods> = {};

function getMethods(): SelectMethods {
  return methods as Required<SelectMethods>;
}

// 注册方法
emit('update:methods', getMethods());
props.onRegister?.(getMethods());

// 使用 hooks
const { reload, options, onPopupVisibleChange } = useData(props, model, modelSelectedLabel);
const { filterMethodComputed, searchComputed } = useSearch(props, getMethods());
const { selectedValueComputed, getSelected, getSelectedList, getSelectedValue, setSelected, clearSelected } =
  useSelected(props, options, { model, modelSelectedLabel });

// 合并方法到 methods 对象
defaultsDeep(methods, {
  getSelected,
  getSelectedList,
  getSelectedValue,
  setSelected,
  clearSelected,
  reload
});

// 立即加载数据
if (props.immediate) {
  reload?.();
}
</script>
