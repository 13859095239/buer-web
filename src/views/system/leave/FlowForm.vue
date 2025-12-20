<!--
  - 请假流程 表单组件
  -
  - @author zoulan
  - @since 2024-06-03
  -->
<template>
  <BasicFlowPage
    v-bind="flowProps"
    v-model:methods="flowMethods"
  >
    <BasicForm
      v-model="form"
      v-model:methods="formMethods"
      v-bind="formProps"
    />
  </BasicFlowPage>
</template>
<script setup lang="ts">
import { ref, shallowRef } from 'vue';

import { addLeave, completeTask, getLeaveByProcInstId, updateLeaveById } from '/@/api/system/leave';
import type { FlowFormProps, FlowPageMethods } from '/@/components/Flow';
import { BasicFlowPage } from '/@/components/Flow';
import type { BasicFormProps } from '/@/components/Form';
import { BasicForm } from '/@/components/Form';
import type { FormMethods } from '/@/components/Form/src/types/form';

const props = defineProps<FlowFormProps>();
const { flowFormMode, flowInfo, onSaved } = props;
const { modelKey, taskId, procInstId } = flowInfo;
const flowMethods = ref<FlowPageMethods>({} as FlowPageMethods);
const formMethods = ref<FormMethods>({} as FormMethods);
const form = ref<any>({
  id: undefined
});

/** flow配置 */
const flowProps = shallowRef({
  flowFormMode,
  flowInfo,
  async onCreateProcinst() {
    await addLeave({ ...form.value!, flowData: { modelKey } });
    onSaved();
  },
  onCompleteTask() {
    completeTask({ ...form.value!, flowData: { taskId } });
  }
});

/** form配置 */
const formProps = shallowRef<BasicFormProps>({
  formSchemas: [
    {
      label: '开始时间',
      field: 'leaveBeginTime',
      component: 'DatePicker',
      rules: [{ required: true }],
      span: 12
    },
    {
      label: '结束时间',
      field: 'leaveEndTime',
      component: 'DatePicker',
      rules: [{ required: true }],
      span: 12
    },
    {
      label: '描述',
      field: 'depiction',
      component: 'InputTextArea',
      span: 24
    }
  ]
});

if (flowFormMode !== 'create') {
  /** 获取表单数据 */
  getLeaveByProcInstId(procInstId!).then((data) => {
    form.value = data;
  });
}
</script>
