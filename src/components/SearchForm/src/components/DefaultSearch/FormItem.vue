<template>
  <FormItem :label="formSchema.label">
    <slot>
      <span v-if="formSchema.component === 'Label'">{{ fieldModel }}</span>
      <!-- Input 组件 -->
      <Input
        v-else-if="formSchema.component === 'Input'"
        v-model:value="fieldModel"
      />
      <!-- InputNumber组件 -->
      <InputNumber
        v-else-if="formSchema.component === 'InputNumber'"
        v-model:value="fieldModel"
      />
      <!-- Checkbox组件 -->
      <BasicCheckbox
        v-else-if="formSchema.component === 'Checkbox'"
        v-model="fieldModel"
        v-bind="{ formSchema, formModel, ...formSchema.checkboxProps! }"
      />
      <!-- BasicCheckboxGroup组件 -->
      <BasicCheckboxGroup
        v-else-if="formSchema.component === 'CheckboxGroup'"
        v-model="fieldModel"
        v-bind="{ formSchema, formModel, ...formSchema.checkboxGroupProps! }"
      />
      <!-- Radio组件 -->
      <BasicRadio
        v-else-if="formSchema.component === 'Radio'"
        v-model="fieldModel"
        v-bind="{ formSchema, formModel, ...formSchema.radioProps }"
      />
      <!-- Switch 组件 -->
      <BasicSwitch
        v-else-if="formSchema.component === 'Switch'"
        v-model="fieldModel"
        v-bind="formSchema.switchProps"
      />
      <!-- Select组件 -->
      <BasicSelect
        v-else-if="formSchema.component === 'Select'"
        v-model="fieldModel"
        v-bind="{ formSchema, formModel, ...formSchema.selectProps }"
      />
      <!-- cascader级联选择框组件 -->
      <BasicCascader
        v-else-if="formSchema.component === 'Cascader'"
        v-bind="formSchema.cascaderProps"
        v-model="fieldModel"
      />
      <!-- 日期选择组件 -->
      <BasicDatePicker
        v-else-if="formSchema.component === 'DatePicker'"
        v-bind="formSchema.datePickerProps"
        v-model="fieldModel"
      />
      <!-- 日期范围选择组件 -->
      <BasicDateRangePicker
        v-else-if="formSchema.component === 'DateRangePicker'"
        v-bind="formSchema.dateRangePickerProps"
        v-model="fieldModel"
      />
      <!-- TreeSelect,下拉选择树组件 -->
      <BasicTreeSelect
        v-else-if="formSchema.component === 'TreeSelect'"
        v-model:value="fieldModel"
        v-bind="{ formSchema, formModel, ...formSchema.treeSelectProps }"
        class="w-full"
      />
    </slot>
  </FormItem>
</template>
<script setup lang="ts">
import { FormItem, Input, InputNumber } from 'tdesign-vue-next';
import { computed, ref, toRefs, watch, toValue } from 'vue';

import { BasicCascader } from '/@/components/Cascader';
import { BasicCheckboxGroup } from '/@/components/CheckboxGroup';
import { BasicDatePicker } from '/@/components/DatePicker';
import { BasicDateRangePicker } from '/@/components/DateRangePicker';
import { BasicRadio } from '/@/components/Radio';
import { BasicSelect } from '/@/components/Select';
import { BasicSwitch } from '/@/components/Switch';
import { BasicTreeSelect } from '/@/components/TreeSelect';

import type { SearchFormSchema } from '../../types';

interface Props {
  formSchema: SearchFormSchema;
  formModel: Recordable;
}
const props = withDefaults(defineProps<Props>(), {});
const { formSchema } = toRefs(props);

/** form表单的model */
const formModel = defineModel<Recordable>('formModel', { required: true });
/** 通用model，绑定Recordable[]类型的值 */
const modelRecords = ref<Recordable[]>([]);
/** 列名 */
const field = computed(() => formSchema.value.field!);
/** 列值 */
const fieldModel = computed({
  get: () => formModel.value[toValue(field)],
  set: (value) => {
    formModel.value[toValue(field)] = value;
  }
});

// 监听列值改变
watch(
  fieldModel,
  (value) => {
    // 值改变，触发onChange事件
    if (formSchema.value.onChange) {
      formSchema.value.onChange(value);
    }
  },
  { immediate: false }
);
</script>
