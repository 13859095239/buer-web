<!--
  - Checkbox 组件
  -
  - @author zoulan
  - @since 2024-07-16
  -->
<template>
  <Checkbox v-model="model">{{ label }}</Checkbox>
</template>
<script setup lang="ts">
import { defaultsDeep } from 'lodash-es';
import { Checkbox } from 'tdesign-vue-next';

import type { BasicCheckboxProps, CheckboxEmit, CheckboxMethods } from './types';

const props = withDefaults(defineProps<BasicCheckboxProps>(), {});
const emit = defineEmits<CheckboxEmit>();
const { label } = props;
/** 组件方法 */
const methods: Partial<CheckboxMethods> = {};
function getMethods(): CheckboxMethods {
  return methods as Required<CheckboxMethods>;
}
emit('update:methods', getMethods());
props.onRegister?.(getMethods());
const model = defineModel<boolean>();

defaultsDeep(methods, {});
</script>
