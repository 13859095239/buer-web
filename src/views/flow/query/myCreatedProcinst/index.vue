<!--
  - 我发起的流程
  -
  - @author zoulan
  - @since 2024-06-13
  -->
<template>
  <BasicContainer>
    <BasicTable
      v-bind="tableProps"
      v-model:methods="tableMethods"
    />
    <BasicFlowRouter
      v-bind="flowRouterProps"
      v-model:methods="flowRouterMethods"
    />
  </BasicContainer>
</template>
<script setup lang="ts">
import { reactive, ref, shallowRef } from 'vue';

import { pageMyCreatedProcinst, removeProcinstByIds } from '/@/api/flow/procinst';
import { BasicContainer } from '/@/components/Container';
import type { BasicFlowRouterProps, FlowRouterMethods } from '/@/components/Flow';
import { BasicFlowRouter } from '/@/components/Flow';
import type { BasicTableProps, TableMethods } from '/@/components/Table';
import { BasicTable } from '/@/components/Table';
import { useTableActionsColumn } from '/@/components/Table/src/hooks/useColumn';
import { deleteSuccess, deleteWarnModel } from '/@/utils/prompt';

const tableMethods = ref<TableMethods>({} as TableMethods);

/** 流程路由组件方法 */
const flowRouterMethods = ref<FlowRouterMethods>({} as FlowRouterMethods);

/** flowRouter 配置 */
const flowRouterProps: BasicFlowRouterProps = reactive({
  onSaved() {
    tableMethods.value.reload();
  }
});

/** table 配置 */
const tableProps = shallowRef<BasicTableProps>({
  title: '我发起的流程',
  getApi: (params) => pageMyCreatedProcinst(params),
  columns: [
    { title: '工单号', colKey: 'businessKey', width: 120 },
    { title: '实例名称', colKey: 'name', width: 150 },
    { title: '当前步骤', colKey: 'taskName', width: 150 },
    { title: '当前办理人', colKey: 'assigneesName', width: 90 },
    { title: '申请人', colKey: 'startUserName', width: 90 },
    {
      title: '流程开始时间',
      colKey: 'startTime',
      format: 'YYYY-MM-DD HH:mm',
      width: 150
    },
    {
      title: '流程结束时间',
      colKey: 'endTime',
      format: 'YYYY-MM-DD HH:mm',
      width: 150
    },
    { title: '流程状态', colKey: 'procinstStatusName' },
    {
      title: '操作',
      colKey: 'actions',
      width: 200,
      fixed: 'right',
      cell: (_h, cell) =>
        useTableActionsColumn(cell, [
          {
            label: '详情',
            onClick: ({ procInstId }) => {
              flowRouterMethods.value.showViewProcinst(procInstId);
            }
          },
          {
            label: '重新申请',
            theme: 'danger',
            onClick: ({ id }) => {
              deleteWarnModel().then(() => {
                removeProcinstByIds([id]).then(() => {
                  deleteSuccess();
                  tableMethods.value.reload();
                });
              });
            }
          },
          {
            label: '删除',
            theme: 'danger',
            onClick: ({ id }) => {
              deleteWarnModel().then(() => {
                removeProcinstByIds([id]).then(() => {
                  deleteSuccess();
                  tableMethods.value.reload();
                });
              });
            }
          }
        ])
    }
  ]
});
</script>
