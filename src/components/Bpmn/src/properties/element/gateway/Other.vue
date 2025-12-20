<!--
  -  gateway网关其他设置
  -
  - @author zoulan
  - @since 2024-06-23
  -->
<template>
  <div class="relative h-250px">
    <div class="relative text-left">执行监听器</div>
    <div class="relative">
      <ExecuteListener
        ref="executeListenerRef"
        v-bind="{ activeElement, methods }"
      />
    </div>
  </div>
  <div class="relative h-250px">
    <div class="relative text-left">扩展属性</div>
    <div class="relative">
      <Variable
        ref="variableRef"
        v-bind="{ activeElement, methods }"
      />
    </div>
  </div>
</template>
<script lang="ts" setup>
import { ref } from 'vue';

import type { BpmnMethods, UserTaskPropertie } from '/@/components/Bpmn/src/types';

import ExecuteListener from '../components/ExecuteListener/index.vue';
import Variable from '../components/Variable/index.vue';

interface Props {
  activeElement: any;
  methods: BpmnMethods;
}
const props = defineProps<Props>();
const { methods } = props;
const executeListenerRef = ref<InstanceType<typeof ExecuteListener> | null>();
const variableRef = ref<InstanceType<typeof Variable> | null>();
const form = defineModel<Partial<UserTaskPropertie>>({ required: true });

/** 清空数据 */
const clearData = () => {
  form.value = {};
};

defineExpose({
  clearData
});
</script>
