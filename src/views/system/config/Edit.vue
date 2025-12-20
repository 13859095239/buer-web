<!--
  - 配置编辑页
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

import { getConfigById, saveConfig, updateConfigById } from '/@/api/system/config';
import type { BasicFormProps } from '/@/components/Form';
import { BasicForm } from '/@/components/Form';
import type { FormMethods } from '/@/components/Form/src/types/form';
import type { BasicModalProps, ModalMethods } from '/@/components/Modal';
import { BasicModal } from '/@/components/Modal';
import { IS_LIST, LOCK_FLAG_LIST } from '/@/constants/systemConstants';
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
  title: `${id ? '新增' : '编辑'}配置`,
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
      label: '键',
      field: 'configKey',
      component: 'Input',
      rules: [{ required: true }]
    },
    {
      label: '值',
      field: 'value',
      component: 'Input',
      rules: [{ required: true }]
    },
    {
      label: '状态',
      field: 'status',
      component: 'Radio',
      radioProps: {
        options: LOCK_FLAG_LIST
      },
      rules: [{ required: true }]
    },
    {
      label: '是否系统内置',
      field: 'systemFlag',
      component: 'Radio',
      radioProps: {
        options: IS_LIST
      },
      rules: [{ required: true }]
    }
  ]
});

/** 清空数据 */
const clearData = () => {
  form.value = {};
};

/** 获取数据 */
const getData = async (id: string) => {
  const data = await getConfigById(id);
  form.value = data;
};

/** 保存数据 */
const saveOrUpdate = () => {
  if (!id) {
    return saveConfig(form.value!);
  } else {
    return updateConfigById(form.value!);
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
