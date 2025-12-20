<!--
  - oss配置编辑页
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

import { getOssConfigById, saveOssConfig, updateOssConfigById } from '/@/api/resource/ossConfig';
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

/** 流程分类id */
let id: Nullable<string> = null;
/** modal配置 */
const modalProps = shallowRef<BasicModalProps>({
  title: `${id ? '新增' : '编辑'}通知公告`,
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
      label: '名称',
      field: 'name',
      component: 'Input',
      rules: [{ required: true }]
    },
    {
      label: '编码',
      field: 'code',
      component: 'Input',
      rules: [{ required: true }]
    },
    {
      label: '描述',
      field: 'depiction',
      component: 'InputTextArea',
      rules: [{ required: true }]
    },
    {
      label: '排序',
      field: 'sort',
      component: 'InputNumber'
    }
  ]
});

/** 清空数据 */
const clearData = () => {
  form.value = {};
};

/** 获取数据 */
const getData = async (id: string) => {
  const data = await getOssConfigById(id);
  form.value = data;
};

/** 保存数据 */
const saveOrUpdate = () => {
  if (!id) {
    return saveOssConfig(form.value!);
  } else {
    return updateOssConfigById(form.value!);
  }
};

/** 显示查看视图 */
const show = (_id: string) => {
  id = _id;
  formProps.value.editable = false;
  clearData();
  modalMethods.value.show();
  nextTick(() => {
    getData(id!);
  });
};

/** 显示新增视图 */
const showAdd = () => {
  clearData();
  id = null;
  formProps.value.editable = true;
  modalMethods.value.show();
};

/** 显示编辑视图 */
const showEdit = (_id: string) => {
  id = _id;
  formProps.value.editable = true;
  clearData();
  modalMethods.value.show();
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
