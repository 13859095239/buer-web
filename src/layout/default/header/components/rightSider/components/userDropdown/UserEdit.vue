<!--
  - 用户编辑页
  -
  - @author zoulan
  - @since 2023-09-02
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
import { nextTick, ref, shallowRef } from 'vue';

import { treeDept } from '/@/api/system/dept';
import { listPost } from '/@/api/system/post';
import { getMyUser, updateMyUser } from '/@/api/system/user';
import type { BasicFormProps } from '/@/components/Form';
import { BasicForm } from '/@/components/Form';
import type { FormMethods } from '/@/components/Form/src/types/form';
import type { BasicModalProps, ModalMethods } from '/@/components/Modal';
import { BasicModal } from '/@/components/Modal';
import { GENDER_LIST } from '/@/constants/systemConstants';
import { saveSuccess } from '/@/utils/prompt';

const emit = defineEmits<{
  (e: 'saved'): void;
}>();
const formMethods = ref<FormMethods>({} as FormMethods);
const modalMethods = ref<ModalMethods>({} as ModalMethods);

const form = ref<Recordable>({});
/** modal配置 */
const modalProps = shallowRef<BasicModalProps>({
  title: '账号修改',
  width: 'column-2',
  onSaved: async () => {
    updateMyUser(form.value!).then(() => {
      saveSuccess();
      modalMethods.value.close();
      emit('saved');
    });
  },
  onClosed: () => {}
});

/** form配置 */
const formProps = ref<BasicFormProps>({
  formSchemas: [
    {
      label: '用户名',
      field: 'username',
      component: 'Input',
      rules: [{ required: true }],
      span: 12
    },
    {
      label: '姓名',
      field: 'nickname',
      component: 'Input',
      rules: [{ required: true }],
      span: 12
    },
    {
      label: '所在部门',
      field: 'deptId',
      component: 'TreeSelect',
      editable: false,
      rules: [{ required: true }],
      treeSelectProps: {
        isLazy: false,
        multiple: false,
        getApi: (params) => treeDept(params)
      },
      span: 12
    },
    {
      label: '岗位',
      field: 'postId',
      component: 'Select',
      rules: [{ required: true }],
      editable: false,
      selectProps: {
        multiple: false,
        getApi: (params) => listPost(params)
      },
      span: 12
    },
    {
      label: '性别',
      field: 'gender',
      component: 'Radio',
      radioProps: {
        options: GENDER_LIST
      },
      rules: [{ required: true }],
      span: 12
    },
    {
      label: '手机号',
      field: 'phone',
      component: 'Input',
      rules: [{ required: true }],
      span: 12
    },
    {
      label: '办公电话',
      field: 'officeNumber',
      component: 'Input',
      rules: [{ required: true }],
      span: 12
    },
    {
      label: '邮箱',
      field: 'email',
      component: 'Input',
      rules: [{ required: true }],
      span: 12
    }
  ]
});

/** 清空数据 */
const clearData = () => {
  form.value = {};
};

/** 获取数据 */
const getData = async () => {
  const data = await getMyUser();
  form.value = data;
};

/** 显示编辑视图 */
const showEdit = async () => {
  clearData();
  formProps.value.editable = true;
  modalMethods.value.show();
  await nextTick();
  formMethods.value.findField('username').editable = false;
  nextTick(() => {
    getData();
  });
};

defineExpose({
  showEdit
});
</script>
