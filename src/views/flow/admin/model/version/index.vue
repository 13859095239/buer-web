<!--
  - 流程版本列表页
  -
  - @author zoulan
  - @since 2024-06-09
  -->
<template>
  <BasicModal
    v-model:methods="modalMethods"
    v-bind="modalProps"
  >
    <BasicTable
      v-bind="tableProps"
      v-model:methods="tableMethods"
    />
    <VersionBpmn
      ref="versionBpmnRef"
      @saved="tableMethods.reload()"
    />
  </BasicModal>
</template>
<script setup lang="ts">
import { nextTick, ref, shallowRef } from 'vue';

import { deployModelByProcDefId } from '/@/api/flow/model';
import { activateProcDefById, pageProcessDefinition, suspendProcDefById } from '/@/api/flow/processDefinition';
import type { BasicModalProps, ModalMethods } from '/@/components/Modal';
import { BasicModal } from '/@/components/Modal';
import type { BasicTableProps, TableMethods } from '/@/components/Table';
import { BasicTable } from '/@/components/Table';
import { saveSuccess, warnModel } from '/@/utils/prompt';

import VersionBpmn from './VersionBpmn.vue';

const versionBpmnRef = ref<InstanceType<typeof VersionBpmn> | null>();
const modalMethods = ref<ModalMethods>({} as ModalMethods);
const tableMethods = ref<TableMethods>({} as TableMethods);

/** modal配置 */
const modalProps = shallowRef<BasicModalProps>({
  title: '流程版本管理',
  width: 'column-3',
  onSaved: async () => {},
  onClosed: () => {
    tableMethods.value.clearData();
  }
});

const tableProps = shallowRef<BasicTableProps>({
  immediate: false,
  getApi: (params) => pageProcessDefinition(params),
  columns: [
    {
      title: '流程版本',
      colKey: 'version',
      columType: 'tag',
      tagColor: () => {
        return 'error';
      },
      format: (value) => `V${value}`
    },
    { title: '激活状态', colKey: 'suspensionState' },
    {
      title: '发布时间',
      colKey: 'deployTime',
      format: 'YYYY-MM-DD HH:mm'
    },
    {
      title: '操作',
      width: 300,
      columnActions: [
        {
          label: '挂起',
          onClick: ({ id }) => {
            warnModel('挂起，挂起后该版本流程将停用，无法办理').then(() => {
              suspendProcDefById(id).then(() => {
                saveSuccess();
                tableMethods.value.reload();
              });
            });
          }
        },
        {
          label: '恢复',
          onClick: ({ id }) => {
            warnModel('恢复,恢复后该版本流程将可以使用').then(() => {
              activateProcDefById(id).then(() => {
                saveSuccess();
                tableMethods.value.reload();
              });
            });
          }
        },
        {
          label: '流程图',
          onClick: ({ id }) => {
            versionBpmnRef.value?.showEdit(id);
          }
        },
        {
          label: '发布该版本',
          onClick: ({ id }) => {
            warnModel('发布，发布后该版本替换当前模型').then(() => {
              deployModelByProcDefId(id).then(() => {
                saveSuccess();
                tableMethods.value.reload();
              });
            });
          }
        }
      ]
    }
  ]
});

/** 显示视版本列表 */
const showEdit = (modelKey: string) => {
  modalMethods.value.show();
  nextTick(() => {
    tableMethods.value.reload({ modelKey });
  });
};
defineExpose({
  showEdit
});
</script>
