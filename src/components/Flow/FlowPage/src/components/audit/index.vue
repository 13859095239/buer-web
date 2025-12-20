<!--
  - 步骤审批页
  -
  - @author zoulan
  - @since 2024-06-12
  -->
<template>
  <BasicModal
    v-model:methods="modalMethods"
    v-bind="modalProps"
  >
    <BasicForm
      v-model="formModel"
      v-model:methods="formMethods"
      v-bind="formProps"
    />
  </BasicModal>
</template>
<script setup lang="ts">
import { ref, shallowRef } from 'vue';

import { completeTask } from '/@/api/flow/task';
import type { BasicFormProps } from '/@/components/Form';
import { BasicForm } from '/@/components/Form';
import type { FormMethods } from '/@/components/Form/src/types/form';
import type { BasicModalProps, ModalMethods } from '/@/components/Modal';
import { saveSuccess } from '/@/utils/prompt';

const emit = defineEmits<{
  (e: 'saved'): void;
}>();
const formMethods = ref<FormMethods>({} as FormMethods);
const modalMethods = ref<ModalMethods>({} as ModalMethods);
const formModel = ref<Recordable>({
  /** 模型id */
  id: undefined
});

/** modal配置 */
const modalProps = shallowRef<BasicModalProps>({
  title: `提交任务`,
  onSaved: async () => {
    completeTask(formModel.value).then(() => {
      saveSuccess();
      modalMethods.value.close();
      emit('saved');
    });
  },
  onClosed: () => {
    clearData();
  }
});

/** form配置 */
const formProps = shallowRef<BasicFormProps>({
  formSchemas: [
    {
      label: '审批意见',
      field: 'remark',
      component: 'InputTextArea',
      rules: [{ required: true }]
    }
  ]
});

/**
 * 初始化数据
 * @param taskId 流程任务id
 */
function init(taskId: string) {
  formModel.value.taskId = taskId;
}

/** 清空数据 */
const clearData = () => {
  formModel.value = {};
};

defineExpose({
  clearData,
  init
});
</script>
