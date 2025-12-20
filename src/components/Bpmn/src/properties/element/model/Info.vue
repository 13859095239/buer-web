<!--
  - 模型基础信息设置
  -
  - @author zoulan
  - @since 2024-05-28
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

interface Props {
  activeElement: any;
  methods: BpmnMethods;
}
const props = defineProps<Props>();
const { methods, activeElement } = props;
const form = defineModel<Partial<UserTaskPropertie>>({ required: true });
/** form配置 */
const formProps = shallowRef<BasicFormProps>({
  formSchemas: [
    {
      label: '节点id',
      field: 'id',
      component: 'Input'
    },
    {
      label: '节点名称',
      field: 'name',
      component: 'Input'
    },
    {
      label: '是否可执行',
      field: 'timeLimit',
      component: 'Switch'
    }
  ]
});

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
