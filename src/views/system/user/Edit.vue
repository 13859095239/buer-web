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
import { getUserById, saveUser, updateUserById } from '/@/api/system/user';
import type { BasicFormProps } from '/@/components/Form';
import { BasicForm } from '/@/components/Form';
import type { FormMethods } from '/@/components/Form/src/types/form';
import type { BasicModalProps, ModalMethods } from '/@/components/Modal';
import { BasicModal } from '/@/components/Modal';
import { GENDER_LIST, LOCK_FLAG_LIST } from '/@/constants/systemConstants';
import { PASSWORD_ERROR_MESSAGE, PASSWORD_STRONG_REGEX } from '/@/settings/projectSetting';
import { saveSuccess } from '/@/utils/prompt';

const emit = defineEmits<{
  (e: 'saved'): void;
}>();
const formMethods = ref<FormMethods>({} as FormMethods);
const modalMethods = ref<ModalMethods>({} as ModalMethods);
const editable = ref(false);
const form = ref<Recordable>({});
/** 用户id */
let id: Nullable<string> = null;
/** modal配置 */
const modalProps = shallowRef<BasicModalProps>({
  title: `${id ? '新增' : '编辑'}配置`,
  width: 'column-2',
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
const formProps = ref<BasicFormProps>({
  editable: editable.value,
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
      label: '密码',
      field: 'password',
      component: 'InputPassword',
      rules: [
        { required: true },
        {
          validator: (val) => PASSWORD_STRONG_REGEX.test(val),
          message: PASSWORD_ERROR_MESSAGE
        }
      ],
      span: 12
    },
    {
      label: '所在部门',
      field: 'deptId',
      component: 'TreeSelect',
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
      field: 'postIds',
      selectedLabelField: 'postNames',
      component: 'Select',
      selectProps: {
        multiple: true,
        drag: true,
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
      rules: [{ required: true }, { telnumber: true }],
      span: 12
    },
    {
      label: '办公电话',
      field: 'officeNumber',
      component: 'Input',
      rules: [{ telnumber: true }],
      span: 12
    },
    {
      label: '邮箱',
      field: 'email',
      component: 'Input',
      rules: [{ email: true }],
      span: 12
    },
    {
      label: '状态',
      field: 'lockFlag',
      component: 'Radio',
      radioProps: { options: LOCK_FLAG_LIST },
      rules: [{ required: true }],
      span: 12
    },
    {
      label: '排序',
      field: 'sort',
      component: 'InputNumber',
      rules: [{ required: true, number: true }],
      span: 12
    }
  ]
});

/** 清空数据 */
const clearData = () => {
  form.value = {};
};

/** 获取数据 */
const getData = async (id: string) => {
  const data = await getUserById(id);
  form.value = data;
};

/** 保存数据 */
const saveOrUpdate = async () => {
  // 表单验证
  const validateResult = await formMethods.value.validate();
  if (!validateResult) {
    return Promise.reject(new Error('表单验证未通过'));
  }
  if (!id) {
    return saveUser(form.value!);
  } else {
    return updateUserById(form.value!);
  }
};
/** 显示查看视图 */
const show = async (_id: string) => {
  editable.value = false;
  id = _id;
  formProps.value.editable = false;
  clearData();
  modalMethods.value.show();
  await nextTick();
  getData(id!);
  formMethods.value.findField('password').show = false;
};

/** 显示新增视图 */
const showAdd = async () => {
  editable.value = true;
  clearData();
  id = null;
  modalMethods.value.show();
  formProps.value.editable = true;
  await nextTick();
  formMethods.value.findField('password').show = true;
  formMethods.value.findField('username').editable = true;
};

/** 显示编辑视图 */
const showEdit = async (_id: string) => {
  editable.value = true;
  clearData();
  id = _id;
  formProps.value.editable = true;
  modalMethods.value.show();
  await nextTick();
  formMethods.value.findField('password').show = false;
  formMethods.value.findField('username').editable = false;
  nextTick(() => {
    getData(id!);
  });
};

defineExpose({
  show,
  showAdd,
  showEdit
});
</script>
