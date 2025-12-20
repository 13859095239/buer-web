<!--
  - 流程图页
  -
  - @author zoulan
  - @since 2024-06-09
  -->
<template>
  <BasicModal
    v-model:methods="modalMethods"
    v-bind="modalProps"
  >
    <BasicBpmn
      v-model:methods="bpmnMethods"
      v-bind="basicBpmnProps"
    />
  </BasicModal>
</template>
<script setup lang="ts">
import { ref, shallowRef } from 'vue';

import { deployModelByProcDefId } from '/@/api/flow/model';
import { getBpmnByProcessDefinitionId } from '/@/api/flow/processDefinition';
import type { BasicBpmnProps, BpmnMethods } from '/@/components/Bpmn';
import { BasicBpmn } from '/@/components/Bpmn';
import type { BasicModalProps, ModalMethods } from '/@/components/Modal';
import { BasicModal } from '/@/components/Modal';
import { saveSuccess, warnModel } from '/@/utils/prompt';

const emit = defineEmits<{
  (e: 'saved'): void;
}>();
const modalMethods = ref<ModalMethods>({} as ModalMethods);
let bpmnMethods: BpmnMethods;

/** 流程实例id */
let id: Nullable<string> = null;
/** 注册bpmn */
const basicBpmnProps: BasicBpmnProps = { mode: 'edit' };
/** modal配置 */
const modalProps = shallowRef<BasicModalProps>({
  title: `查看流程图`,
  fullscreen: true,
  onSaved: async () => {
    await saveOrUpdate();
    modalMethods.value.close();
    emit('saved');
  },
  onClosed: () => {
    clearData();
  }
});

/** 清空数据 */
const clearData = () => {
  bpmnMethods.importXML(undefined);
  id = null;
};

/** 保存数据 */
const saveOrUpdate = () => {
  warnModel('发布，发布后该版本替换当前模型').then(() => {
    deployModelByProcDefId(id!).then(() => {
      saveSuccess();
    });
  });
};

/** 显示流程图 */
const showEdit = async (procDefId: string) => {
  id = procDefId;
  modalMethods.value.show();
  // 获取模型Xml
  const modelXml = await getBpmnByProcessDefinitionId(procDefId);
  await bpmnMethods.importXML(modelXml);
};

defineExpose({
  showEdit
});
</script>
<style lang="scss">
@import url('/@/components/Bpmn/src/style/index.scss');
</style>
