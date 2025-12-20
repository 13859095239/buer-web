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

import { pageMyDoneTaskinst } from '/@/api/flow/taskinst';
import { BasicContainer } from '/@/components/Container';
import type { BasicFlowRouterProps, FlowRouterMethods } from '/@/components/Flow';
import { BasicFlowRouter } from '/@/components/Flow';
import type { BasicTableProps, TableMethods } from '/@/components/Table';
import { BasicTable } from '/@/components/Table';
import { useTableActionsColumn } from '/@/components/Table/src/hooks/useColumn';

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
  title: '我的已办',
  getApi: (params) => pageMyDoneTaskinst(params),
  columns: [
    { title: '工单号', colKey: 'businessKey', width: 120 },
    { title: '流程名称', colKey: 'procInstName', width: 150 },
    { title: '当前步骤', colKey: 'name', width: 120 },
    { title: '申请人', colKey: 'startUserName', width: 90 },
    {
      title: '开始时间',
      colKey: 'startTime',
      format: 'YYYY-MM-DD HH:mm',
      width: 150
    },
    { title: '办理时间', colKey: 'endTime', format: 'YYYY-MM-DD HH:mm', width: 150 },
    {
      title: '操作',
      colKey: 'actions',
      width: 200,
      fixed: 'right',
      cell: (_h, cell) =>
        useTableActionsColumn(cell, [
          {
            label: '详情',
            onClick: ({ id }) => {
              flowRouterMethods.value.showMyDoneTaskinst(id);
            }
          }
        ])
    }
  ]
});
</script>
