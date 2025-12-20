<!--
  - userTask 操作设置
  -
  - @author zoulan
  - @since 2024-05-27
  -->
<template>
  <BasicForm
    v-model="form"
    v-bind="formProps"
  />
</template>
<script lang="ts" setup>
import { shallowRef, watch } from 'vue';

import type { BpmnMethods, UserTaskPropertie } from '/@/components/Bpmn/src/types';
import type { BasicFormProps } from '/@/components/Form';
import { BasicForm } from '/@/components/Form';
import type { FormSchema } from '/@/components/Form/src/types';
import { OPERATION_BUTTON_LIST } from '/@/constants/flowConstants';

interface Props {
  activeElement: any;
  methods: BpmnMethods;
}
const props = defineProps<Props>();
const { methods, activeElement } = props;
const form = defineModel<Partial<UserTaskPropertie>>({ required: true });

/** form配置 */
const formProps = shallowRef<BasicFormProps>({
  formSchemas: getFormSchemas()
});
/** 通过operationButtonData获取FormSchemas配置 */
function getFormSchemas() {
  const formSchemas: FormSchema[] = [];
  OPERATION_BUTTON_LIST.forEach((operationButton) => {
    const { id, name } = operationButton;
    formSchemas.push({
      label: name,
      field: id,
      component: 'Checkbox',
      span: 12,
      onChange(value) {}
    });
    formSchemas.push({
      label: '名称',
      field: `${id}Name`,
      component: 'Input',
      span: 12,
      onChange(value) {}
    });
  });
  return formSchemas;
}

/** 清空数据 */
const clearData = () => {
  form.value = {};
};

watch(
  () => [form.value.name],
  ([value]) => {
    methods.updateProperties(activeElement, {
      name: value
    });
  }
);

defineExpose({
  clearData
});
</script>
