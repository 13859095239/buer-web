<!--
  - 密码重置
  -
  - @author zoulan
  - @since 2024-09-07
  -->
<template>
  <BasicModal
    v-model:methods="modalMethods"
    v-bind="modalProps"
  >
    <BasicForm
      v-model="form"
      v-model:methods="formMethods"
      v-bind="formProps"
    />
  </BasicModal>
</template>
<script setup lang="ts">
import { ref, shallowRef } from 'vue';

import { resetPassword } from '/@/api/system/user';
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

const form = ref<Recordable>({});
/** modal配置 */
const modalProps = shallowRef<BasicModalProps>({
  title: '重置密码',
  width: 'column-1',
  onSaved: async () => {
    saveOrUpdate().then(() => {
      saveSuccess();
      modalMethods.value.close();
      emit('saved');
    });
  },
  onClosed: () => {}
});

/** form配置 */
const formProps = shallowRef<BasicFormProps>({
  formSchemas: [
    {
      label: '用户名',
      field: 'username',
      component: 'Input',
      editable: false,
      span: 24
    },
    {
      label: '姓名',
      field: 'nickname',
      component: 'Input',
      editable: false,
      span: 24
    },
    {
      label: '新密码',
      field: 'newPassword',
      component: 'InputPassword',
      rules: [{ required: true }],
      span: 24
    },
    {
      label: '新密码确认',
      field: 'newPasswordConfirm',
      component: 'InputPassword',
      rules: [{ required: true }],
      span: 24
    }
  ]
});

/** 清空数据 */
const clearData = () => {
  form.value = {};
};

/** 保存数据 */
const saveOrUpdate = () => {
  const { id, newPassword } = form.value;
  return resetPassword(id, newPassword);
};

/** 显示编辑视图 */
const showEdit = (_id: string, username: string, nickname: string) => {
  formProps.value.editable = true;
  clearData();
  modalMethods.value.show();
  form.value.id = _id;
  form.value.username = username;
  form.value.nickname = nickname;
};

defineExpose({
  showEdit
});
</script>
