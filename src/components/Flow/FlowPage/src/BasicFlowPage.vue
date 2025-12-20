<!--
  - 流程办理组件
  - 本组件用途
  -- 流程查看、办理组件，为业务提供框架
  -- 处理非业务类的业务
  -- 业务类的表单，通过slot对外提供定制
  - @author zoulan
  - @since 2024-06-05
  -->
<template>
  <TabContainer
    v-model="activeKey"
    v-bind="tabContainerProps"
  >
    <!-- 表单信息 -->
    <template #flowForm>
      <slot @complete-task="completeTask"></slot>
    </template>
    <!-- 流程图 -->
    <template #bpmnView>
      <BpmnView
        v-bind="{
          procInstId,
          modelKey,
          procDefId,
          flowFormMode
        }"
      />
    </template>
    <!-- 办理情况 -->
    <template #taskInfo>
      <TaskInfo
        v-bind="{
          procInstId
        }"
      />
    </template>
    <!-- 抄送信息 -->
    <template #ccInfo>
      <CcInfo
        v-bind="{
          procInstId
        }"
      />
    </template>
  </TabContainer>
</template>
<script setup lang="ts">
import { assign } from 'lodash-es';
import { reactive, ref } from 'vue';

import type { TabContainerProps } from '/@/components/Container/TabContainer';
import { TabContainer } from '/@/components/Container/TabContainer';

import { BpmnView, CcInfo, TaskInfo } from './components';
import type { BasicFlowPageProps, FlowFormEmit, FlowPageMethods } from './types';

const props = withDefaults(defineProps<BasicFlowPageProps>(), {});
const emit = defineEmits<FlowFormEmit>();
const { flowFormMode, flowInfo, onCreateProcinst, onCompleteTask } = props;
const { procInstId, modelKey, procDefId } = flowInfo!;
/** 组件方法 */
const methods: Partial<FlowPageMethods> = {};
function getMethods(): FlowPageMethods {
  return methods as Required<FlowPageMethods>;
}
const activeKey = ref('flowForm');
const tabContainerProps: TabContainerProps = reactive({
  title: `${getFlowFormModeName()}`,
  subTitles: [
    // 新建流程时没有流水号
    ...(flowFormMode !== 'create' ? [{ label: `流水号：${flowInfo?.businessKey}` }] : []),
    ...[
      { label: flowFormMode === 'create' ? `流程名称：${flowInfo?.modelName}` : `实例名称：${flowInfo?.procInstName}` }
    ],
    ...(['todo', 'done'].includes(flowFormMode) ? [{ label: `当前环节：${flowInfo?.taskName}` }] : []),
    { label: '紧急' }
  ],
  titleIcon: 'flow',
  placement: 'left',
  options: [
    {
      label: '表单信息',
      value: 'flowForm',
      actions: [
        {
          label: '提交',
          show: ['create', 'todo'].includes(flowFormMode),
          onClick() {
            switch (flowFormMode) {
              case 'create':
                onCreateProcinst!();
                break;
              case 'todo':
                onCompleteTask!();
                break;
            }
          }
        }
      ]
    },
    {
      label: '流程图',
      value: 'bpmnView'
    },
    {
      label: '办理情况',
      value: 'taskInfo',
      show: flowFormMode !== 'create'
    },
    {
      label: '抄送信息',
      value: 'ccInfo',
      show: flowFormMode !== 'create'
    }
  ],
  gobalActions: [
    {
      label: '返回',
      theme: 'default',
      onClick: () => emit('close')
    }
  ]
});
function getFlowFormModeName() {
  switch (flowFormMode) {
    case 'create':
      return '新增流程';
    case 'todo':
      return '流程办理';
    case 'print':
      return '流程打印';
    default:
      return '流程查看';
  }
}

function completeTask() {}

props.onRegister?.(getMethods());

assign(methods, {
  /** 关闭modal */
  close: () => {},
  /** 关闭modal并刷新页面 */
  closeWithRefresh: () => {}
});
</script>
