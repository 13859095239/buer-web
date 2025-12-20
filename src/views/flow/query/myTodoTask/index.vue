<!--
  - 我的待办列表页
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

import { pageMyTask } from '/@/api/flow/task';
import { BasicContainer } from '/@/components/Container';
import type { BasicFlowRouterProps, FlowRouterMethods } from '/@/components/Flow';
import { BasicFlowRouter } from '/@/components/Flow';
import type { BasicTableProps, TableMethods } from '/@/components/Table';
import { BasicTable } from '/@/components/Table';
import { useTableActionsColumn } from '/@/components/Table/src/hooks/useColumn';
import { isNullOrUnDefOrBlank } from '/@/utils/is';

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
  title: '我的待办',
  rowKey: 'id',
  getApi: (params) => pageMyTask(params),
  columns: [
    { title: '工单号', colKey: 'businessKey', width: 120 },
    { title: '流程名称', colKey: 'procInstName', width: 150 },
    { title: '当前步骤', colKey: 'name', width: 120 },
    { title: '申请人', colKey: 'startUserName', width: 90 },
    {
      title: '开始时间',
      colKey: 'createTime',
      format: 'YYYY-MM-DD HH:mm',
      width: 150
    },
    { title: '办理期限', colKey: 'dueDate', format: 'YYYY-MM-DD HH:mm' },
    {
      title: '操作',
      colKey: 'actions',
      width: 200,
      fixed: 'right',
      cell: (_h, cell) =>
        useTableActionsColumn(cell, [
          {
            label: '查看',
            onClick: ({ id, procInstId }) => {
              flowRouterMethods.value.showMyTodoTask(id, procInstId);
            }
          },
          {
            label: '办理',
            onClick: ({ id, procInstId }) => {
              flowRouterMethods.value.showMyTodoTask(id, procInstId);
            }
          },
          {
            label: '认领',
            show: isNullOrUnDefOrBlank(cell.row.assignee),
            onClick: ({ id }) => {
              flowRouterMethods.value.claimTask(id).finally(() => {
                tableMethods.value.reload();
              });
            }
          },
          {
            label: '撤销认领',
            show: !isNullOrUnDefOrBlank(cell.row.claimTime),
            onClick: ({ id }) => {
              flowRouterMethods.value.unclaimTask(id).finally(() => {
                tableMethods.value.reload();
              });
            }
          }
        ])
    }
  ]
});
</script>
