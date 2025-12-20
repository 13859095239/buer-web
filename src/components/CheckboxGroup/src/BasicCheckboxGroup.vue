<!--
  - 复选款 组件
  -
  - @author zoulan
  - @since 2023-08-15
  -->
<template>
  <CheckboxGroup v-model:value="selectedValueComputed">
    <Checkbox
      v-for="(option, index) in options"
      :key="index"
      :value="option[KEYS_VALUE]"
      >{{ option[KEYS_LABEL] }}</Checkbox
    >
  </CheckboxGroup>
</template>
<script setup lang="ts">
import { defaultsDeep } from 'lodash-es';
import { Checkbox, CheckboxGroup } from 'tdesign-vue-next';

import { KEYS_LABEL, KEYS_VALUE } from '/@/settings/componentSetting';

import { useData } from './hooks/useData';
import { useSelected } from './hooks/useSelected';
import type { BasicCheckboxGroupProps, CheckboxEmit, CheckboxGroupMethods } from './types';

const props = defineProps<BasicCheckboxGroupProps>();
// const value = ref<CheckboxValueType[] | undefined>();
const emit = defineEmits<CheckboxEmit>();
/** 组件方法 */
const methods: Partial<CheckboxGroupMethods> = {};
function getMethods(): CheckboxGroupMethods {
  return methods as Required<CheckboxGroupMethods>;
}
emit('update:methods', getMethods());
props.onRegister?.(getMethods());
/** 选中的值,多个以逗号隔开 */
const model = defineModel<string>({ default: '' });
/** 选中的项,单选 */
const modelSelected = defineModel<Recordable>('selected');
/** 选中的项列表，多选 */
const modelSelecteds = defineModel<Recordable[]>('selecteds');
/** 选中的值,多个以逗号隔开 */
const modelSelectedLabel = defineModel<string>('selectedLabel');
const { reload, options } = useData(props);
const { selectedValueComputed, getSelected, getSelectedList, getSelectedValue, setSelected, clearSelected } =
  useSelected(props, options, {
    model,
    modelSelected,
    modelSelecteds,
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
