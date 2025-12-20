<!--
  - 流程路由 组件
  - 本组件用途
  -- 提供统一对外的流程页,BasicFlowRouter->FlowForm(具体的业务页),内部嵌套BasicFlowPage组件
  -- 弹出页面->加载流程数据->根据webPath路径加载FlowForm组件
  -
  - @author zoulan
  - @since 2024-06-05
  -->
<template>
  <BasicModal
    v-model:methods="modalMethods"
    v-bind="modalProps"
  >
    <!-- 该页面跳转至FlowForm(具体的业务页)，该页面嵌套在BasicFlowPage中 -->
    <component
      :is="flowFormComponent"
      v-if="flowInfo"
      v-bind="{ flowFormMode, flowInfo, onSaved }"
      @close="modalMethods?.close"
    />
  </BasicModal>
</template>
<script setup lang="ts">
import { assign } from 'lodash-es';
import { ref, shallowRef } from 'vue';

import { claimTask, unclaimTask } from '/@/api/flow/task';
import type { BasicModalProps, ModalMethods } from '/@/components/Modal';
import { BasicModal } from '/@/components/Modal';
import { saveError, saveSuccess } from '/@/utils/prompt';

import { useData } from './hooks/useData';
import type { BasicFlowRouterProps, FlowRouterEmit, FlowRouterMethods } from './types';

const props = withDefaults(defineProps<BasicFlowRouterProps>(), {});
const emit = defineEmits<FlowRouterEmit>();
const flowFormComponent = ref();
/** 组件方法 */
const methods: Partial<FlowRouterMethods> = {};
function getMethods(): FlowRouterMethods {
  return methods as Required<FlowRouterMethods>;
}
emit('update:methods', getMethods());

const modalMethods = ref<ModalMethods>({} as ModalMethods);

/** 初始化Modal */
const modalProps = shallowRef<BasicModalProps>({
  title: '',
  header: false,
  footer: false,
  fullscreen: true,
  onSaved: async () => {}
});

const {
  flowFormMode,
  flowInfo,
  clearData,
  showAddProcinst,
  showMyTodoTask,
  showMyDoneTaskinst,
  showViewProcinst,
  showPrintProcinst
} = useData(props, modalMethods, flowFormComponent);

/**
 * 认领任务
 *
 * @param taskId 任务ID
 * @returns void
 *
 */
function claim(taskId: string): Promise<boolean> {
  return new Promise((resolve, reject) => {
    claimTask(taskId)
      .then(() => {
        saveSuccess('认领成功');
        return resolve(true);
      })
      .catch(() => {
        saveError('认领失败');
        return reject(new Error('认领失败'));
      });
  });
}

/**
 * 撤销认领任务
 *
 * @param taskId 任务ID
 * @returns void
 *
 */
function unclaim(taskId: string): Promise<boolean> {
  return new Promise((resolve, reject) => {
    unclaimTask(taskId)
      .then(() => {
        saveSuccess('取消认领成功');
        return resolve(true);
      })
      .catch(() => {
        saveError('取消认领失败');
        return reject(new Error('取消认领失败'));
      });
  });
}

assign(methods, {
  clearData,
  showAddProcinst,
  showMyTodoTask,
  showMyDoneTaskinst,
  showViewProcinst,
  showPrintProcinst,
  claimTask: claim,
  unclaimTask: unclaim
});
props.onRegister?.(getMethods());
function onSaved() {
  modalMethods.value.close();
  props.onSaved?.();
}
</script>
