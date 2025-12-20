<!--
  - 流程变量 编辑页
  -
  - @author zoulan
  - @since 2024-05-15
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
import { nextTick, ref, shallowRef } from 'vue';

import { getModelVariableById, saveModelVariable, updateVariableById } from '/@/api/flow/modelVariable';
import type { BasicFormProps } from '/@/components/Form';
import { BasicForm } from '/@/components/Form';
import type { FormMethods } from '/@/components/Form/src/types/form';
import type { BasicModalProps, ModalMethods } from '/@/components/Modal';
import { BasicModal } from '/@/components/Modal';
import { saveSuccess } from '/@/utils/prompt';

const emit = defineEmits<{
  (e: 'saved'): void;
}>();
const formMethods = ref<FormMethods>({} as FormMethods);
const modalMethods = ref<ModalMethods>({} as ModalMethods);

const formModel = ref<Recordable>({
  id: undefined,
  modelId: undefined
});

/** modal配置 */
const modalProps = shallowRef<BasicModalProps>({
  title: `${formModel.value.id ? '新增' : '编辑'}流程变量`,
  onSaved: async () => {
    await saveOrUpdate();
    saveSuccess();
    modalMethods.value.close();
    emit('saved');
  },
  onClosed: () => {}
});

/** form配置 */
const formProps = shallowRef<BasicFormProps>({
  formSchemas: [
    {
      label: '变量编码',
      field: 'code',
      component: 'Input',
      rules: [{ required: true }]
    },
    {
      label: '变量名称',
      field: 'name',
      component: 'Input',
      rules: [{ required: true }]
    },
    {
      label: '描述',
      field: 'depiction',
      component: 'InputTextArea'
    }
  ]
});

/** 清空数据 */
const clearData = () => {
  formModel.value = {};
};
const getModelVariable = async (id: string) => {
  const data = await getModelVariableById(id);
  formModel.value = data;
};

/** 显示新增模型变量 */
const showAddModelVariable = (modelId: string) => {
  clearData();
  formModel.value = { modelId };
  formProps.value.editable = true;
  modalMethods.value.show();
};

/**
 * 显示流程变量信息
 *
 * @param id 流程变量id
 */
const showModelVariable = (id: string) => {
  clearData();
  formProps.value.editable = false;
  formModel.value = { id };
  modalMethods.value.show();
  nextTick(() => {
    getModelVariable(id);
  });
};

/**
 * 显示模型变量
 *
 * @param id 模型变量 id
 */
const showEditModelVariable = (id: string) => {
  clearData();
  formProps.value.editable = true;
  modalMethods.value.show();
  nextTick(() => {
    getModelVariable(id);
  });
};

/**
 * 保存变量
 */
const saveOrUpdate = () => {
  if (formModel.value.id === undefined) {
    return saveModelVariable(formModel.value!);
  } else {
    return updateVariableById(formModel.value!);
  }
};

defineExpose({
  showModelVariable,
  showAddModelVariable,
  showEditModelVariable
});
</script>
