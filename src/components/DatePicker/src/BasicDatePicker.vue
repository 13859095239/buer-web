<!--
  - 日期选择 组件
  -
  - @author zoulan
  - @since 2024-05-08
  -->
<template>
  <DatePicker
    v-model:value="model"
    v-bind="timeModeComputed"
    :disableDate="disabledDateComputed"
    valueType="YYYY-MM-DD HH:mm:ss"
  >
  </DatePicker>
</template>
<script setup lang="ts">
import { defaultsDeep } from 'lodash-es';
import type { DateValue } from 'tdesign-vue-next';
import { DatePicker } from 'tdesign-vue-next';

import { useDatePicker } from './hooks/useDatePicker';
import type { BasicDatePickerProps, DatePickerEmit, DatePickerMethods } from './types';

const props = defineProps<BasicDatePickerProps>();
const emit = defineEmits<DatePickerEmit>();
/** 组件方法 */
const methods: Partial<DatePickerMethods> = {};
function getMethods(): DatePickerMethods {
  return methods as Required<DatePickerMethods>;
}
emit('update:methods', getMethods());
props.onRegister?.(getMethods());
const model = defineModel<DateValue>();
const { timeModeComputed, disabledDateComputed } = useDatePicker(props);
defaultsDeep(methods, {});
</script>
