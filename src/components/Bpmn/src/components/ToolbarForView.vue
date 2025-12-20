<!--
  - Bpmn 小工具栏
  -
  - @author zoulan
  - @since 2024-06-05
  -->
<template>
  <Space :size="2">
    <Divider type="vertical" />
    <Tooltip content="缩小比例">
      <Button
        theme="default"
        @click="zoomOut()"
      >
        <div class="i-tdesign:zoom-out"></div>
      </Button>
    </Tooltip>
    <Tooltip content="当前比例，点击还原">
      <Button
        theme="default"
        @click="resetZoom()"
        >{{ currentScale }}</Button
      >
    </Tooltip>
    <Tooltip content="放大比例">
      <Button
        theme="default"
        @click="zoomIn()"
      >
        <div class="i-tdesign:zoom-in"></div>
      </Button>
    </Tooltip>
    <Divider type="vertical" />
    <Tooltip content="模拟流程">
      <Button
        theme="default"
        @click="simulationToggle()"
      >
        <div class="i-tdesign:rocket"></div>
      </Button>
    </Tooltip>
  </Space>
</template>
<script setup lang="ts">
import type BpmnViewer from 'bpmn-js/lib/NavigatedViewer';
import { Button, Divider, Space, Tooltip } from 'tdesign-vue-next';
import { toRefs } from 'vue';

import { useScales } from '/@/components/Bpmn/src/hooks/useScales';
import { useSimulation } from '/@/components/Bpmn/src/hooks/useSimulation';

interface Props {
  modeler: BpmnViewer;
}
const props = defineProps<Props>();
const { modeler } = toRefs(props);
const { zoomIn, zoomOut, resetZoom, currentScale } = useScales(modeler);
const { simulationToggle } = useSimulation(modeler);
</script>
<style lang="less" scoped>
.anticon {
  font-size: 18px;
}

.ant-divider {
  height: 20px;
}

.ant-btn {
  padding: 0px 8px;
}
</style>
