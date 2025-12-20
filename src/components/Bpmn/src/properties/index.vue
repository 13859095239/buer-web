<!--
  - 侧边属性栏 入口
  - 编辑流程元素属性
  -
  - @author zoulan
  - @since 2024-05-25
  -->
<template>
  <div>
    <template v-if="!activeElement || !activeElement.type"></template>
    <template v-else>
      <Model
        v-if="activeElement.type === ElementTypeEnum.PROCESS"
        ref="elementRef"
        v-bind="{ modeler, methods, activeElement }"
      />
      <Task
        v-else-if="[ElementTypeEnum.USER_TASK].includes(activeElement.type as ElementTypeEnum)"
        ref="elementRef"
        v-bind="{ modeler, methods, activeElement }"
      />
      <Event
        v-else-if="
          [ElementTypeEnum.START_EVENT, ElementTypeEnum.END_EVENT].includes(activeElement.type as ElementTypeEnum)
        "
        ref="elementRef"
        v-bind="{ modeler, methods, activeElement }"
      />
      <SequenceFlow
        v-else-if="activeElement.type === ElementTypeEnum.SEQUENCE_FLOW"
        ref="elementRef"
        v-bind="{ modeler, methods, activeElement }"
      />
      <Gateway
        v-else-if="
          [
            ElementTypeEnum.PARALLEL_GATEWAY,
            ElementTypeEnum.EXCLUSIVE_GATEWAY,
            ElementTypeEnum.INCLUSIVE_GATEWAY,
            ElementTypeEnum.EVENT_BASED_GATEWAY
          ].includes(activeElement.type as ElementTypeEnum)
        "
        ref="elementRef"
        v-bind="{ modeler, methods, activeElement }"
      />
    </template>
  </div>
</template>
<script setup lang="ts">
import type { Element } from 'bpmn-js/lib/model/Types';
import type Modeler from 'bpmn-js/lib/Modeler';
import { computed, ref, toRefs, watch } from 'vue';

import { templateLoaded } from '/@/utils/template';

import type { BpmnMethods } from '../types';
import { ElementTypeEnum } from '../types';
import { Event, Gateway, Model, SequenceFlow, Task } from './element';

interface Props {
  modeler: Modeler<any>;
  methods: BpmnMethods;
  activeElement: Element;
}

const props = defineProps<Props>();

const emit = defineEmits<{
  (e: 'saved'): void;
}>();

const elementRef = ref();

const { modeler, activeElement } = toRefs(props);

/** 当前活动元素id */
const activeElementId = computed(() => (activeElement.value ? activeElement.value.id : undefined));

// 监听activeElementId,刷新element组件数据。
watch(activeElementId, () => {
  templateLoaded(elementRef).then(() => {
    elementRef.value?.init();
  });
});

defineExpose({});
</script>
