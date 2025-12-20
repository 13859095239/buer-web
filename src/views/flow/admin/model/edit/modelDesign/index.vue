<!--
  - 流程设计页
  -
  - @author zoulan
  - @since 2024-05-15
  -->
<template>
  <BasicBpmn
    v-model:methods="bpmnMethods"
    v-bind="basicBpmnProps"
  />
</template>
<script lang="ts" setup>
import { ref } from 'vue';

import type { ModelVO } from '/@/api/flow/model';
import { getModelBpmn, updateModelEditorBpmn } from '/@/api/flow/model';
import type { BasicBpmnProps, BpmnMethods } from '/@/components/Bpmn';
import { BasicBpmn } from '/@/components/Bpmn';
import { saveSuccess } from '/@/utils/prompt';

const emit = defineEmits<{
  (e: 'saved'): void;
}>();

// bpmn 组件方法
const bpmnMethods = ref<BpmnMethods>({} as BpmnMethods);

/** 注册bpmn */
const basicBpmnProps: BasicBpmnProps = {};

const dataForm = ref<ModelVO>({} as ModelVO);

/**
 * 初始化数据
 */
async function init(modelId: string) {
  const modelXml = await getModelBpmn(modelId);
  dataForm.value = {
    id: modelId,
    modelXml
  };
  bpmnMethods.value.importXML(modelXml);
}

/** 保存数据 */
async function saveData() {
  const { xml } = await bpmnMethods.value.getXml();
  dataForm.value!.modelXml = xml!;
  const { id, modelXml } = dataForm.value;
  updateModelEditorBpmn({
    modelId: id,
    modelXml
  }).then(() => {
    saveSuccess();
  });
}

/** 清空数据 */
const clearData = () => {
  dataForm.value.modelXml = undefined;
  bpmnMethods.value.importXML(undefined);
};

defineExpose({
  init,
  saveData,
  clearData
});
</script>
