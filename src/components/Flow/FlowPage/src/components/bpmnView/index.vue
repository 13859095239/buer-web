<!--
  - 流程图查看
  -
  - @author zoulan
  - @since 2024-06-06
  -->
<template>
  <div class="w-full flex">
    <div class="grow">
      <!-- 顶部小工具栏 -->
      <ToolbarForView
        v-if="modeler"
        v-bind="{ modeler }"
      />
      <!-- BPMN流程图组件 -->
      <div
        ref="canvas"
        class="h-660px w-full"
      ></div>
    </div>
    <!-- 点击查看某个任务信息 -->
    <TaskInfo
      ref="taskInfoRef"
      v-bind="{ procInstId }"
    />
  </div>
</template>
<script setup lang="ts">
import type { Element } from 'bpmn-js/lib/model/Types';
import BpmnViewer from 'bpmn-js/lib/NavigatedViewer';
import TokenSimulationModule from 'bpmn-js-token-simulation/lib/viewer';
import { onMounted, ref } from 'vue';

import { getBpmnByProcessDefinitionId, getNewestBpmnByModelKey } from '/@/api/flow/processDefinition';
import { ToolbarForView } from '/@/components/Bpmn';
import type { FlowFormMode } from '/@/components/Flow/types';

import TaskInfo from './TaskInfo.vue';

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
const taskInfoRef = ref<InstanceType<typeof TaskInfo> | null>();
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
  // 元素点击事件;
  modeler.value.on('element.click', (e: any) => {
    const element: Element = e.element;
    taskInfoRef.value!.show(procInstId, element.id);
  });
  // 获取模型Xml
  const modelXml = await getBpmnByProcessDefinitionId(procDefId);
  // 导入模型Xml
  await modeler.value.importXML(modelXml);
});
</script>
<style lang="scss">
@import url('/@/components/Bpmn/src/style/index.scss');
</style>
