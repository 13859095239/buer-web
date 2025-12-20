<!--
  - 新建流程列表页
  -
  - @author zoulan
  - @since 2024-06-04
  -->
<template>
  <BasicContainer>
    <BasicTable
      v-bind="tableProps"
      v-model:methods="tableMethods" />
    <BasicFlowRouter
      v-bind="flowRouterProps"
      v-model:methods="flowRouterMethods"
  /></BasicContainer>
</template>
<script setup lang="ts">
import { reactive, ref, shallowRef } from 'vue';

import { pageModel } from '/@/api/flow/model';
import { BasicContainer } from '/@/components/Container';
import type { BasicFlowRouterProps, FlowRouterMethods } from '/@/components/Flow';
import { BasicFlowRouter } from '/@/components/Flow';
import type { BasicTableProps, TableMethods } from '/@/components/Table';
import { BasicTable } from '/@/components/Table';
import { useTableActionsColumn } from '/@/components/Table/src/hooks/useColumn';

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
  title: '流程类型',
  getApi: (params) => pageModel(params),
  rowSelectionType: false,
  columns: [
    { title: '类型名称', colKey: 'name' },
    { title: '排序', colKey: 'sort' },
    {
      title: '操作',
      colKey: 'actions',
      width: 200,
      fixed: 'right',
      cell: (_h, cell) =>
        useTableActionsColumn(cell, [
          {
            label: '创建流程',
            onClick: ({ key }) => {
              flowRouterMethods!.showAddProcinst!(key);
            }
          }
        ])
    }
  ],
  searchFormProps: {
    formSchemas: [
      { label: '流程名称', field: 'name', component: 'Input' },
      { label: '流程类型', field: 'name', component: 'Input' }
    ]
  }
});
</script>
