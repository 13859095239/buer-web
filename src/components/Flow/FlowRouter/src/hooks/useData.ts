/**
 * 流程数据 hooks
 *
 * @author zoulan
 * @since 2024-06-02
 */
import type { Ref } from 'vue';
import { defineAsyncComponent, nextTick, ref } from 'vue';

import { getCreateProcinstInfo, getProcinstById, getProcinstInfoById } from '/@/api/flow/procinst';
import { getMyTaskInfo } from '/@/api/flow/task';
import { getMyDoneTaskInfo } from '/@/api/flow/taskinst';
import type { ModalMethods } from '/@/components/Modal';

import type { FlowFormMode, FlowInfo } from '../../../types';
import type { BasicFlowRouterProps } from '../types';

export function useData(props: BasicFlowRouterProps, modalMethods: Ref<ModalMethods>, flowFormComponent: Ref<any>) {
  const flowInfo = ref<FlowInfo>();
  const flowFormMode = ref<FlowFormMode>();

  /** 弹出新增流程 */
  async function showAddProcinst(modelKey: string): Promise<void> {
    clearData();
    const ModelVO = await getCreateProcinstInfo(modelKey);
    flowFormMode.value = 'create';
    flowInfo.value = {
      procDefId: ModelVO.procDefId,
      modelKey: ModelVO.modelKey,
      modelName: ModelVO.modelName,
      modelWebPath: ModelVO.modelWebPath
    };
    loadFlowFormPath();
  }

  /** 弹出办理流程 */
  async function showMyTodoTask(taskId: string): Promise<void> {
    clearData();
    flowFormMode.value = 'todo';
    flowInfo.value = await getMyTaskInfo(taskId);
    loadFlowFormPath();
  }

  /** 弹出查看我的已办流程 */
  async function showMyDoneTaskinst(taskId: string): Promise<void> {
    clearData();
    flowFormMode.value = 'done';
    flowInfo.value = await getMyDoneTaskInfo(taskId);
    loadFlowFormPath();
  }

  /** 弹出查看流程信息 */
  async function showViewProcinst(procInstId: string): Promise<void> {
    clearData();
    flowFormMode.value = 'view';
    flowInfo.value = await getProcinstInfoById(procInstId);
    loadFlowFormPath();
  }

  /** 弹出查看打印信息 */
  async function showPrintProcinst(procInstId: string): Promise<void> {
    clearData();
    flowFormMode.value = 'print';
    flowInfo.value = await getProcinstById(procInstId);
    loadFlowFormPath();
  }

  /** 加载FlowForm路径 */
  function loadFlowFormPath() {
    nextTick(() => {
      modalMethods.value.show();
      const path = `/@/views/${flowInfo.value?.modelWebPath}.vue`;
      const flowForm = defineAsyncComponent(() => import(path));
      flowFormComponent.value = flowForm;
    });
  }

  /** 清空数据 */
  function clearData() {
    flowInfo.value = undefined;
    flowFormComponent.value = undefined;
  }

  return {
    flowFormMode,
    flowInfo,
    clearData,
    showAddProcinst,
    showMyTodoTask,
    showMyDoneTaskinst,
    showViewProcinst,
    showPrintProcinst
  };
}
