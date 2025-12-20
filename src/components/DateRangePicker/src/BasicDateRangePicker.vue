<!--
  - 日期范围选择 组件
  -
  - @author zoulan
  - @since 2024-05-08
  -->
<template>
  <DateRangePicker
    v-model="model"
    v-bind="timeModeComputed"
    :disabledDate="disabledDateComputed"
    valueFormat="YYYY-MM-DD HH:mm:ss"
  ></DateRangePicker>
</template>
<script setup lang="ts">
import { defaultsDeep } from 'lodash-es';
import type { DateRangeValue } from 'tdesign-vue-next';
import { DateRangePicker } from 'tdesign-vue-next';

import { useDatePicker } from './hooks/useDatePicker';
import type { BasicDateRangePickerProps, DateRangePickerEmit, DateRangePickerMethods } from './types';

const props = defineProps<BasicDateRangePickerProps>();
const emit = defineEmits<DateRangePickerEmit>();
/** 组件方法 */
const methods: Partial<DateRangePickerMethods> = {};
function getMethods(): DateRangePickerMethods {
  return methods as Required<DateRangePickerMethods>;
}
emit('update:methods', getMethods());
props.onRegister?.(getMethods());
const model = defineModel<DateRangeValue>();
const { timeModeComputed, disabledDateComputed } = useDatePicker(props);
defaultsDeep(methods, {});
</script>
