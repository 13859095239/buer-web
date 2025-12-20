<!--
  - 流程模型 编辑页
  -
  - @author zoulan
  - @since 2024-05-15
  -->
<template>
  <BasicForm
    v-model="formModel"
    v-model:methods="formMethods"
    class="w-600px"
    v-bind="formProps"
  />
</template>
<script setup lang="ts">
import { ref, shallowRef } from 'vue';

import { listCategory } from '/@/api/flow/category';
import type { ModelUpdateDTO } from '/@/api/flow/model';
import { getModelById, saveModel, updateModelById } from '/@/api/flow/model';
import { listCodeRule } from '/@/api/system/codeRule';
import type { BasicFormProps } from '/@/components/Form';
import { BasicForm } from '/@/components/Form';
import type { FormMethods } from '/@/components/Form/src/types/form';
import { saveSuccess } from '/@/utils/prompt';

const emit = defineEmits<{
  (e: 'saved'): void;
}>();
const formMethods = ref<FormMethods>({} as FormMethods);
const formModel = ref<ModelUpdateDTO>({
  /** 模型id */
  id: undefined
});

/** form配置 */
const formProps = shallowRef<BasicFormProps>({
  formSchemas: [
    {
      label: '流程名称',
      field: 'name',
      component: 'Input',
      rules: [{ required: true }]
    },
    {
      label: '流程标识',
      field: 'key',
      component: 'Input',
      rules: [
        { required: true },
        {
          pattern: /^[a-z][\w-]*$/,
          message: 'Key需以小写字母开头,仅允许字母/数字/下划线/短横线',
          trigger: 'blur'
        }
      ]
    },
    {
      label: '流程类型',
      field: 'category',
      component: 'Select',
      selectProps: {
        multiple: false,
        getApi: (params) => listCategory(params)
      },
      rules: [{ required: true }]
    },
    {
      label: '编号规则',
      field: 'codeRuleId',
      component: 'Select',
      selectProps: {
        multiple: false,
        getApi: (params) => listCodeRule(params)
      },
      rules: [{ required: true }]
    },
    {
      label: 'web路径',
      field: 'webPath',
      component: 'Input',
      rules: [{ required: true }]
    },
    {
      label: '流程管理员',
      field: 'adminUser',
      component: 'SelectUserModal'
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
      component: 'InputNumber',
      rules: [{ required: true, min: 0, max: 99 }]
    }
  ]
});

const getData = async (id: string) => {
  const data = await getModelById(id);
  formModel.value = data;
};

/**
 * 初始化数据
 */
function init(modelId: string) {
  getData(modelId);
}

/** 清空数据 */
const clearData = () => {
  formModel.value = {};
};

/**
 * 保存模型
 */
async function saveData(): Promise<string> {
  if (formModel.value.id === undefined) {
    formModel.value.id = await saveModel(formModel.value!);
  } else {
    await updateModelById(formModel.value!);
  }
  saveSuccess();
  return formModel.value.id;
}

defineExpose({
  saveData,
  clearData,
  init
});
</script>
