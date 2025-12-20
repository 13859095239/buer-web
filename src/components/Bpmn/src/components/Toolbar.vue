<!--
  - Bpmn 操作小工具栏
  -
  - @author zoulan
  - @since 2023-07-12
  -->
<template>
  <Space :size="2">
    <Tooltip
      v-if="props.bpmnProps.saveButton && mode === 'edit'"
      content="保存模型配置"
    >
      <Button @click="saveModel"> 保存 </Button>
    </Tooltip>
    <Tooltip
      v-if="mode === 'edit'"
      content="导入模型xml"
    >
      <Button
        theme="default"
        @click="importFileRef?.click()"
      >
        <div class="i-tdesign:cloud-upload"></div>
      </Button>
      <input
        ref="importFileRef"
        type="file"
        style="display: none"
        accept=".xml,.bpmn"
        @onChange="changeFile"
      />
    </Tooltip>
    <Tooltip content="导出模型xml">
      <Button
        theme="default"
        @click="saveXml"
      >
        <div class="i-tdesign:cloud-download"></div>
      </Button>
    </Tooltip>
    <Tooltip content="导出模型图片">
      <Button
        theme="default"
        @click="saveSvg"
      >
        <div class="i-tdesign:download"></div>
      </Button>
    </Tooltip>
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
    <Tooltip content="重置">
      <Button
        theme="default"
        @click="redo()"
      >
        <div class="i-tdesign:refresh"></div>
      </Button>
    </Tooltip>
    <Tooltip content="撤销上一步">
      <Button
        theme="default"
        @click="undo()"
      >
        <div class="i-tdesign:rollback"></div>
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
    <Divider type="vertical" />
    <Tooltip content="代码查看">
      <Button
        theme="default"
        @click="
          refreshResult();
          highlightRef!.show();
        "
      >
        <div class="i-tdesign:logo-codepen"></div>
      </Button>
    </Tooltip>
    <!-- 代码查看 -> 弹出查看代码组件 -->
    <BasicHighlightModal
      ref="highlightRef"
      title="代码查看"
      :value="resultData"
    />
    <Tooltip
      v-if="mode === 'edit'"
      content="快捷键查看"
    >
      <Button
        theme="default"
        @click="shortcutKeyRef!.show()"
      >
        <div class="i-tdesign:keyboard"></div>
      </Button>
    </Tooltip>
    <ShortcutKey ref="shortcutKeyRef" />
  </Space>
</template>
<script setup lang="ts">
import type Modeler from 'bpmn-js/lib/Modeler';
import { Button, Divider, Space, Tooltip } from 'tdesign-vue-next';
import type { Ref } from 'vue';
import { ref, toRefs } from 'vue';

import { BasicHighlightModal } from '/@/components/Highlight';

import type { BasicBpmnProps } from '../..';
import { useCommands } from '../hooks/useCommands';
import { useExports } from '../hooks/useExports';
import { useImports } from '../hooks/useImports';
import { useScales } from '../hooks/useScales';
import { useSimulation } from '../hooks/useSimulation';
import { useXml } from '../hooks/useXml';
import ShortcutKey from './ShortcutKey.vue';

interface Props {
  bpmnProps: BasicBpmnProps;
  modeler: Modeler;
}
const props = defineProps<Props>();
const emit = defineEmits<{
  saveModel: [];
}>();
const { modeler, bpmnProps } = toRefs(props);
const { mode } = bpmnProps.value;
const importFileRef = ref<HTMLInputElement>();
const shortcutKeyRef = ref<InstanceType<typeof ShortcutKey> | null>();
const highlightRef = ref<InstanceType<typeof BasicHighlightModal> | null>();

const { redo, undo } = useCommands(modeler);
const { saveXml, saveSvg } = useExports(modeler);
const { resultData, refreshResult } = useXml(modeler);
const { zoomIn, zoomOut, resetZoom, currentScale } = useScales(modeler);
const { simulationToggle } = useSimulation(modeler);
const { changeImportFile } = useImports(modeler);
function saveModel() {
  emit('saveModel');
}
function changeFile() {
  changeImportFile(importFileRef as Ref<HTMLInputElement>);
}
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
