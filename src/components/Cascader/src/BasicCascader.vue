<!--
  - cascader级联选择框组件
  -
  - @author zoulan
  - @since 2024-05-31
  -->
<template>
  <Cascader
    v-model:value="selectedValueComputed"
    v-bind="{
      options,
      placeholder,
      multiple,
      labelField,
      valueField,
      childrenField,
      showSearch: showSearchComputed
    }"
  >
  </Cascader>
</template>
<script setup lang="ts">
import { defaultsDeep } from 'lodash-es';
import { Cascader } from 'tdesign-vue-next';
import { toRefs } from 'vue';

import { KEYS_CHILDREN, KEYS_DISABLED, KEYS_LABEL, KEYS_VALUE, SELECT_PLACEHOLDER } from '/@/settings/componentSetting';

import { useData } from './hooks/useData';
import { useSearch } from './hooks/useSearch';
import { useSelected } from './hooks/useSelected';
import type { BasicCascaderProps, CascaderEmit, CascaderMethods } from './types';

const props = withDefaults(defineProps<BasicCascaderProps>(), {
  immediate: true,
  allowClear: true,
  multiple: false,
  placeholder: SELECT_PLACEHOLDER,
  keys: () => {
    return {
      label: KEYS_LABEL,
      value: KEYS_VALUE,
      children: KEYS_CHILDREN,
      disabled: KEYS_DISABLED
    };
  }
});
const emit = defineEmits<CascaderEmit>();
const { placeholder, multiple, labelField, valueField, childrenField } = toRefs(props);
/** 组件方法 */
const methods: Partial<CascaderMethods> = {};
function getMethods(): CascaderMethods {
  return methods as Required<CascaderMethods>;
}
emit('update:methods', getMethods());
props.onRegister?.(getMethods());
/** 选中的值,多个以逗号隔开 */
const model = defineModel<string>();
/** 选中的项,单选 */
const modelSelected = defineModel<Recordable>('selected');
/** 选中的项列表，多选 */
const modelSelectedList = defineModel<Recordable[]>('selectedList');
/** 选中的值,多个以逗号隔开 */
const modelSelectedLabel = defineModel<string>('selectedLabel');

const { reload, options } = useData(props);
const { showSearchComputed } = useSearch(props, getMethods());
const { selectedValueComputed, getSelected, getSelectedList, getSelectedValue, setSelected, clearSelected } =
  useSelected(props, options, {
    model,
    modelSelected,
    modelSelectedList,
    modelSelectedLabel
  });

defaultsDeep(methods, {
  getSelected,
  getSelectedList,
  getSelectedValue,
  setSelected,
  clearSelected,
  reload
});
props.immediate && reload?.();
</script>
