<!--
  - 单选 组件
  -
  - @author zoulan
  - @since 2023-08-15
  -->
<template>
  <RadioGroup v-model:value="model">
    <Radio
      v-for="(option, index) in options"
      :key="index"
      :value="option[props.valueField!]"
      >{{ option[props.labelField!] }}
    </Radio>
  </RadioGroup>
</template>
<script setup lang="ts">
import { defaultsDeep } from 'lodash-es';
import { Radio, RadioGroup } from 'tdesign-vue-next';

import { KEYS_LABEL, KEYS_VALUE, SELECT_PLACEHOLDER } from '/@/settings/componentSetting';

import { useData } from './hooks/useData';
import { useSelected } from './hooks/useSelected';
import type { BasicRadioProps, RadioEmit, RadioMethods } from './types';

const props = withDefaults(defineProps<BasicRadioProps>(), {
  immediate: true,
  placeholder: SELECT_PLACEHOLDER,
  labelField: KEYS_LABEL,
  valueField: KEYS_VALUE
});
const emit = defineEmits<RadioEmit>();
const methods: Partial<RadioMethods> = {};
const model = defineModel<string>();
/** 选中项 */
const modelSelected = defineModel<Recordable>('selected');
/** 选中项的lable */
const modelSelectedLabel = defineModel<string>('selectedLabel');
emit('update:methods', methods as Required<RadioMethods>);
props.onRegister?.(methods as Required<RadioMethods>);

const { reload, options } = useData(props);

const { getSelected, getSelectedValue, setSelected, clearSelected } = useSelected(props, model, options, {
  model,
  modelSelected,
  modelSelectedLabel
});
defaultsDeep(methods, {
  getSelected,
  getSelectedValue,
  setSelected,
  clearSelected
});
props.immediate && reload?.();
</script>
