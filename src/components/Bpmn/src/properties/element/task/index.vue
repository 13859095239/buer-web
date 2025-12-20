<!--
  - ask 任务设置
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
      label="办理人"
    >
      <Assignee
        v-model="form"
        v-bind="{ methods }"
      />
    </TabPanel>
    <TabPanel
      value="tab3"
      label="操作设置"
    >
      <Operation
        v-model="form"
        v-bind="{ activeElement, methods }"
      />
    </TabPanel>
    <TabPanel
      value="tab4"
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

import Assignee from './Assignee.vue';
import Info from './Info.vue';
import Operation from './Operation.vue';
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
  const attrNameList = [
    'id',
    'name',
    // 基本信息
    'flowable:messageMode',
    'flowable:limitTime',
    'flowable:remind',
    'flowable:remindBefoureLimitTime',
    'flowable:remindIntervalTime',
    'flowable:remindCount',
    // 办理人相关属性
    'assignee',
    'candidateUsers',
    'flowable:assigneeType',
    'flowable:auditType',
    'flowable:variableType',
    'flowable:variableName',
    'flowable:multiSignPercent'
  ];
  attrNameList.forEach((attrName) => {
    const attrValue = businessObject.get(attrName);
    if (['flowable:messageMode', 'flowable:remind'].includes(attrName)) {
      // Boolean 类型处理
      form.value[attrName] = attrValue === undefined ? attrValue : Boolean(attrValue);
    } else {
      form.value[attrName] = businessObject.get(attrName);
    }
  });
}

defineExpose({ init, clearData });
</script>
