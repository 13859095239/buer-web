<!--
  - startEvent 事件设置
  -
  - @author zoulan
  - @since 2024-05-25
  -->
<template>
  <Tabs v-model:value="activeKey">
    <TabPanel
      value="tab1"
      label="基础信息"
    >
      <Info
        v-model="form"
        v-bind="{ activeElement, methods }"
      />
    </TabPanel>
    <TabPanel
      value="tab2"
      label="其他设置"
    >
      <Other
        v-model="form"
        v-bind="{ activeElement, methods }"
      />
    </TabPanel>
  </Tabs>
</template>
<script lang="ts" setup>
import type Modeler from 'bpmn-js/lib/Modeler';
import { getBusinessObject } from 'bpmn-js/lib/util/ModelUtil';
import { TabPanel, Tabs } from 'tdesign-vue-next';
import { ref, toRefs } from 'vue';

import type { BpmnMethods, UserTaskPropertie } from '/@/components/Bpmn/src/types';

import Info from './Info.vue';
import Other from './Other.vue';

interface Props {
  modeler: Modeler;
  methods: BpmnMethods;
  activeElement: any;
}
const props = defineProps<Props>();
const activeKey = ref('tab1');
const { activeElement } = toRefs(props);

const form = ref<Partial<UserTaskPropertie>>({});

/** 清空数据 */
function clearData() {
  form.value = {};
}

/** 初始化数据 */
function init() {
  clearData();
  const businessObject = getBusinessObject(activeElement.value);
  form.value.id = businessObject.id;
  form.value.name = businessObject.name;
}

defineExpose({ init, clearData });
</script>
