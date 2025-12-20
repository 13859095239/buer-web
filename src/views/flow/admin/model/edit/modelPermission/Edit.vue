<!--
  - 流程权限 编辑页
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

import { getModelPermissionById, saveModelPermission, updatePermissionById } from '/@/api/flow/modelPermission';
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
  title: `${formModel.value.id ? '新增' : '编辑'}流程权限`,
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
const getPermission = async (id: string) => {
  const data = await getModelPermissionById(id);
  formModel.value = data;
};

/**
 * 显示流程权限信息
 *
 * @param id 流程权限ID
 */
const showPermission = (id: string) => {
  clearData();
  formProps.value.editable = false;
  formModel.value = { id };
  modalMethods.value.show();
  nextTick(() => {
    getModelPermissionById(id);
  });
};

/** 显示新增流程权限 */
const showAddPermission = (modelId: string) => {
  clearData();
  formModel.value = { modelId };
  formProps.value.editable = true;
  modalMethods.value.show();
};

/**
 * 显示编辑流程权限
 *
 * @param id 流程权限id
 */
const showEditPermission = (id: string) => {
  clearData();
  formProps.value.editable = true;
  modalMethods.value.show();
  nextTick(() => {
    getPermission(id);
  });
};

/**
 * 保存变量
 */
const saveOrUpdate = () => {
  if (formModel.value.id === undefined) {
    return saveModelPermission(formModel.value!);
  } else {
    return updatePermissionById(formModel.value!);
  }
};

defineExpose({
  showPermission,
  showAddPermission,
  showEditPermission
});
</script>
