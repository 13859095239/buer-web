<!--
  - 字典编辑页
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

import { getDictItemById, saveDictItem, updateDictItemById } from '/@/api/system/dict';
import type { BasicFormProps } from '/@/components/Form';
import { BasicForm } from '/@/components/Form';
import type { FormMethods } from '/@/components/Form/src/types/form';
import type { BasicModalProps, ModalMethods } from '/@/components/Modal';
import { BasicModal } from '/@/components/Modal';
import { saveSuccess } from '/@/utils/prompt';

const props = withDefaults(
  defineProps<{
    dictKey: string;
  }>(),
  {}
);
const emit = defineEmits<{
  (e: 'onSaved'): void;
}>();
const formMethods = ref<FormMethods>({} as FormMethods);
const modalMethods = ref<ModalMethods>({} as ModalMethods);

const form = ref<Recordable>({});

/** 角色id */
let id: Nullable<string> = null;
/** modal配置 */
const modalProps = shallowRef<BasicModalProps>({
  title: `${id ? '新增' : '编辑'}字典`,
  onSaved: async () => {
    saveOrUpdate().then(() => {
      saveSuccess();
      modalMethods.value.close();
      emit('onSaved');
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
      label: '值',
      field: 'value',
      component: 'Input',
      rules: [{ required: true }]
    },
    {
      label: '描述',
      field: 'description',
      component: 'InputTextArea',
      rules: [{ required: true }]
    },
    {
      label: '排序',
      field: 'sort',
      component: 'InputNumber',
      rules: [{ required: true, number: true, min: 0, max: 99 }]
    }
  ]
});

/** 清空数据 */
const clearData = () => {
  form.value = {};
};

/** 获取数据 */
const getData = async (id: string) => {
  const data = await getDictItemById(id);
  form.value = data;
};

/** 保存数据 */
const saveOrUpdate = () => {
  form.value.dictKey = props.dictKey;
  if (!id) {
    return saveDictItem(form.value!);
  } else {
    return updateDictItemById(form.value!);
  }
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
  showAdd,
  showEdit
});
</script>
