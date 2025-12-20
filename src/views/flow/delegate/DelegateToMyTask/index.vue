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
import { reactive, shallowRef } from 'vue';

import { pageMyTask } from '/@/api/flow/task';
import { BasicContainer } from '/@/components/Container';
import type { BasicFlowRouterProps, FlowRouterMethods } from '/@/components/Flow';
import { BasicFlowRouter } from '/@/components/Flow';
import type { BasicTableProps, TableMethods } from '/@/components/Table';
import { BasicTable } from '/@/components/Table';

const tableMethods = ref<TableMethods>({} as TableMethods);
let flowRouterMethods: FlowRouterMethods;

/** flowRouter 配置 */
const flowRouterProps: BasicFlowRouterProps = reactive({
  onSaved() {
    tableMethods.value.reload();
  }
});

/** table 配置 */
const tableProps = shallowRef<BasicTableProps>({
  title: '我的待办',
  getApi: (params) => pageMyTask(params),
  columns: [
    { title: '工单号', colKey: 'businessKey' },
    { title: '流程名称', colKey: 'procInstName' },
    { title: '当前步骤', colKey: 'taskName' },
    { title: '申请人', colKey: 'startUserName' },
    {
      title: '步骤创建时间',
      colKey: 'createTime',
      format: 'YYYY-MM-DD HH:mm'
    },
    { title: '办理期限', colKey: 'dueDate', format: 'YYYY-MM-DD HH:mm' },
    {
      title: '操作',
      columnActions: [
        {
          label: '办理',
          onClick: ({ id }) => {
            flowRouterMethods.showMyTodoTask!(id);
          }
        }
      ]
    }
  ]
});
</script>
