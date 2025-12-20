<!--
  - 编号规则编辑页
  -
  - @author zoulan
  - @since 2024-06-07
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

import { getCodeRuleById, saveCodeRule, updateCodeRuleById } from '/@/api/system/codeRule';
import { useDictRadio } from '/@/components/Dict/src/hooks/useDictRadio';
import type { BasicFormProps } from '/@/components/Form';
import { BasicForm } from '/@/components/Form';
import type { FormMethods } from '/@/components/Form/src/types/form';
import type { BasicModalProps, ModalMethods } from '/@/components/Modal';
import { BasicModal } from '/@/components/Modal';
import { saveSuccess } from '/@/utils/prompt';

const emit = defineEmits<{
  (e: 'saved'): void;
}>();
// From 组件方法
const formMethods = ref<FormMethods>({} as FormMethods);
// Modal 组件方法
const modalMethods = ref<ModalMethods>({} as ModalMethods);

// 表单数据
const form = ref<Recordable>({});

/** 编号规则id */
let id: Nullable<string> = null;
/** Modal 组件配置 */
const modalProps = shallowRef<BasicModalProps>({
  title: `${id ? '新增' : '编辑'}编号规则`,
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

/** Form 组件配置 */
const formProps = shallowRef<BasicFormProps>({
  labelWidth: 130,
  formSchemas: [
    {
      label: '编码',
      field: 'code',
      component: 'Input',
      rules: [{ required: true }]
    },
    {
      label: '名称',
      field: 'name',
      component: 'Input',
      rules: [{ required: true }]
    },
    {
      label: '流水号前缀',
      field: 'prefix',
      component: 'Input',
      rules: [{ required: true }]
    },
    {
      label: '流水号日期类型',
      field: 'codeRuleDateType',
      component: 'Radio',
      radioProps: useDictRadio('codeRuleDateType'),
      rules: [{ required: true }]
    },
    {
      label: '流水号位数',
      field: 'digit',
      component: 'Input',
      rules: [{ required: true }]
    },
    {
      label: '描述',
      field: 'depiction',
      component: 'InputTextArea'
    },
    {
      label: '排序',
      field: 'sort',
      component: 'InputNumber',
      rules: [{ required: true, min: 0, max: 99 }]
    }
  ]
});

/** 清空数据 */
function clearData() {
  form.value = {};
}

/** 获取数据 */
async function getData(id: string) {
  const data = await getCodeRuleById(id);
  form.value = data;
}

/** 保存数据 */
async function saveOrUpdate() {
  // 表单验证
  const validateResult = await formMethods.value.validate();
  if (!validateResult) {
    return Promise.reject();
  }
  if (!id) {
    return saveCodeRule(form.value!);
  } else {
    return updateCodeRuleById(form.value!);
  }
}

/** 显示查看视图 */
function show(_id: string) {
  id = _id;
  formProps.value.editable = false;
  clearData();
  modalMethods.value.show();
  nextTick(() => {
    getData(id!);
  });
}

/** 显示新增视图 */
function showAdd() {
  clearData();
  id = null;
  formProps.value.editable = true;
  modalMethods.value.show();
}

/** 显示编辑视图 */
function showEdit(_id: string) {
  id = _id;
  formProps.value.editable = true;
  clearData();
  modalMethods.value.show();
  nextTick(() => {
    getData(id!);
  });
}

// 对外暴露组件方法
defineExpose({
  show,
  showAdd,
  showEdit
});
</script>
