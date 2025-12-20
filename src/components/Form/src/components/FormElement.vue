<!--
  - 表单元素 组件
  - 扩展框架通用的业务组件
  -
  - @author zoulan
  - @since 2023-08-15
  -->
<template>
  <!-- FormItem name属性用于rule验证 -->
  <FormItem
    :label="formSchema.label"
    :name="formSchema.field"
  >
    <!-- 插槽目的,在Form中实现自定义扩展组件 -->
    <slot>
      <span v-if="formSchema.component === 'Label'">{{ fieldModel }}</span>
      <!-- Input 组件 -->
      <Input
        v-else-if="formSchema.component === 'Input'"
        v-model:value="fieldModel"
        :disabled="!editable"
      />
      <!-- InputNumber组件 -->
      <Input
        v-else-if="formSchema.component === 'InputNumber'"
        v-model:value="fieldModel"
        :disabled="!editable"
        type="number"
      />
      <!-- InputPassword组件 
        -- -webkit-text-security chrome浏览器不提示密码保存
      -->
      <Input
        v-else-if="formSchema.component === 'InputPassword'"
        v-model:value="fieldModel"
        autocomplete="new-password"
        :disabled="!editable"
        type="password"
      />
      <!-- InputTextArea组件 -->
      <Textarea
        v-else-if="formSchema.component === 'InputTextArea'"
        v-model:value="fieldModel"
        :disabled="!editable"
        type="text"
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
        v-model:selectedLabel="selectedLabelValue"
        v-bind="{ formSchema, formModel, ...formSchema.selectProps, editable }"
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
      <!-- tree组件,选择模式 -->
      <BasicTree
        v-else-if="formSchema.component === 'Tree' && !formSchema.treeProps?.checkable"
        v-model:selectedValue="fieldModel"
        v-bind="{ formSchema, formModel, ...formSchema.treeProps }"
      />
      <!-- tree组件,复选模式 -->
      <BasicTree
        v-else-if="formSchema.component === 'Tree' && formSchema.treeProps?.checkable"
        v-model:checkedValue="fieldModel"
        v-bind="{ formSchema, formModel, ...formSchema.treeProps }"
      />
      <!-- TreeSelect,下拉选择树组件 -->
      <BasicTreeSelect
        v-else-if="formSchema.component === 'TreeSelect'"
        v-model="fieldModel"
        v-bind="{ formSchema, formModel, ...formSchema.treeSelectProps, editable }"
        class="w-full"
      />
      <!-- Upload上传组件 -->
      <BasicUpload
        v-else-if="formSchema.component === 'Upload'"
        v-model="fieldModel"
        v-model:modelData="extendFieldValue"
        v-bind="formSchema.uploadProps"
        class="w-full"
      />
      <BasicTiny
        v-else-if="formSchema.component === 'Editor'"
        v-model="fieldModel"
      />
      <!-- 选人组件 -->
      <BasicSelectUserModal
        v-else-if="formSchema.component === 'SelectUserModal'"
        v-model="fieldModel"
        v-model:data="modelRecords"
        v-bind="formSchema.selectUserModalProps"
      />
      <!-- 选图标组件 -->
      <BasicSelectIcon
        v-else-if="formSchema.component === 'SelectIcon'"
        v-model="fieldModel"
        v-bind="{ formSchema, formModel, ...formSchema.selectProps, editable }"
      />
    </slot>
  </FormItem>
</template>
<script setup lang="ts">
import { FormItem, Input, Textarea } from 'tdesign-vue-next';
import { computed, ref, toRefs, watch ,toValue} from 'vue';

import { BasicCascader } from '/@/components/Cascader';
import { BasicCheckbox } from '/@/components/Checkbox';
import { BasicCheckboxGroup } from '/@/components/CheckboxGroup';
import { BasicDatePicker } from '/@/components/DatePicker';
import { BasicDateRangePicker } from '/@/components/DateRangePicker';
import { BasicRadio } from '/@/components/Radio';
import { BasicSelect } from '/@/components/Select';
import { BasicSelectIcon } from '/@/components/SelectIcon';
import { BasicSwitch } from '/@/components/Switch';
import { BasicTiny } from '/@/components/Tiny';
import { BasicTree } from '/@/components/Tree';
import { BasicTreeSelect } from '/@/components/TreeSelect';
import { BasicUpload } from '/@/components/Upload';
import { isNullOrUnDefOrBlank } from '/@/utils/is';

import { BasicSelectUserModal } from '../../../SelectUserModal';
import type { BasicFormProps, FormSchema } from '../types/form';

interface Props {
  formProps: BasicFormProps;
  formSchema: FormSchema;
  formModel: Recordable;
}
const props = withDefaults(defineProps<Props>(), {});
const { formProps, formSchema } = toRefs(props);

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
    if (field.value === 'depiction.a') {
      formModel.value.depiction = {};
      formModel.value.depiction.a = value;
    } else {
      formModel.value[toValue(field)] = value;
    }
  }
});

/** 选中标签值（用于Select组件的selectedLabel） */
const selectedLabelValue = computed({
  get: () => {
    // 如果formSchema中有selectedLabelField配置，则从formModel中获取对应的值
    if (formSchema.value.selectedLabelField) {
      return formModel.value[formSchema.value.selectedLabelField];
    }
    return undefined;
  },
  set: (value) => {
    // 如果formSchema中有selectedLabelField配置，则更新formModel中对应的值
    if (formSchema.value.selectedLabelField) {
      formModel.value[formSchema.value.selectedLabelField] = value;
    }
  }
});
/**
 * 扩展列名
 * 需要扩展名的在组件，在组件的props中配置
 * 如：上传附件uploadProps中的
 *
 */
let extendField: string | undefined;
switch (formSchema.value.component) {
  case 'Upload':
    extendField = formSchema.value.uploadProps?.dataField;
}

/**
 * 扩展列值
 * 需要额外更新fromModel的列时使用
 * 如：上传附件返回fileGroupId、文件id列表
 * 如：选人控件返回userId、userName
 */
const extendFieldValue = computed({
  get: () => formModel.value[extendField!],
  set: (value) => {
    formModel.value[extendField!] = value;
  }
});

/** 是否编辑 */
const editable = computed(() =>
  isNullOrUnDefOrBlank(formSchema.value.editable) ? formProps.value.editable : formSchema.value.editable
);

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
<style lang="less" scoped>
:deep(input[type='password']) {
  input-security: disc;
  -webkit-text-security: disc !important;
}
</style>
