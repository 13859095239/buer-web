<!--
  - 驳回至历史节点
  -
  - @author zoulan
  - @since 2024-06-18
  -->
<template>
  <div class="w-full flex">
    <div class="grow">
      <ToolbarForView
        v-if="modeler"
        v-bind="{ modeler }"
      />
      <div
        ref="canvas"
        class="h-660px w-full"
      ></div>
    </div>
  </div>
</template>
<script setup lang="ts">
import BpmnViewer from 'bpmn-js/lib/NavigatedViewer';
import TokenSimulationModule from 'bpmn-js-token-simulation/lib/viewer';
import { onMounted, ref } from 'vue';

import { getBpmnByProcessDefinitionId, getNewestBpmnByModelKey } from '/@/api/flow/processDefinition';
import { ToolbarForView } from '/@/components/Bpmn';
import type { FlowFormMode } from '/@/components/Flow/types';

interface Props {
  procDefId: string;
  modelKey: string;
  procInstId: string;
  flowFormMode: FlowFormMode;
}
const props = defineProps<Props>();
const { procInstId, flowFormMode, procDefId, modelKey } = props;
// bpmn画布
const canvas = ref<HTMLElement>();
const modeler = ref<BpmnViewer<any>>();
onMounted(async () => {
  // 初始化 BpmnViewer
  modeler.value = new BpmnViewer({
    // 渲染容器
    container: canvas.value,
    // 宽度
    width: '100%',
    // 高度
    height: '100%',
    // 自定义且与默认扩展包一起使用的模块列表
    additionalModules: [
      // 流程模拟
      TokenSimulationModule
    ]
  });
  // 获取模型Xml
  let modelXml = '';
  // 导入模型Xml
  switch (flowFormMode) {
    // 新建流程的时候，用最新版本的bpmn
    case 'create':
      modelXml = await getNewestBpmnByModelKey(modelKey);
      break;
    // 历史版本，用历史版本的bpmn
    default:
      modelXml = await getBpmnByProcessDefinitionId(procDefId);
      break;
  }
  // 导入模型Xml
  await modeler.value.importXML(modelXml);
});
</script>
<style lang="scss">
@import url('/@/components/Bpmn/src/style/index.scss');
</style>
