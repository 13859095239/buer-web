<!--
  - 请假流程列表页
  -
  - @author zoulan
  - @since 2023-09-02
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

import { pageLeave, removeLeaveByIds } from '/@/api/system/leave';
import { BasicContainer } from '/@/components/Container';
import type { BasicFlowRouterProps, FlowRouterMethods } from '/@/components/Flow';
import { BasicFlowRouter } from '/@/components/Flow';
import type { BasicTableProps, TableMethods } from '/@/components/Table';
import { BasicTable } from '/@/components/Table';
import { useTableActionsColumn } from '/@/components/Table/src/hooks/useColumn';
import { deleteSuccess, deleteWarnModel, warnModel } from '/@/utils/prompt';

const tableMethods = ref<TableMethods>({} as TableMethods);

// flowRouter 组件方法
const flowRouterMethods = ref<FlowRouterMethods>({} as FlowRouterMethods);

/** flowRouter 配置 */
const flowRouterProps: BasicFlowRouterProps = reactive({
  onSaved() {
    tableMethods.value.reload();
  }
});
/** table 配置 */
const tableProps = shallowRef<BasicTableProps>({
  title: '请假管理',
  getApi: (params) => pageLeave(params),
  toolbar: [
    {
      name: '新增',
      onClick: () => {
        flowRouterMethods.value.showAddProcinst!('leave');
      }
    },
    {
      name: '删除',
      theme: 'danger',
      isRelationSelected: true,
      onClick: ({ selectedRowKeys }) => {
        deleteWarnModel().then(() => {
          removeLeaveByIds(selectedRowKeys).then(() => {
            deleteSuccess();
            tableMethods.value.reload();
          });
        });
      }
    }
  ],
  columns: [
    { title: '请假开始时间', colKey: 'leaveBeginTime', format: 'YYYY-MM-DD HH:mm', width: 150 },
    { title: '请假结束时间', colKey: 'leaveEndTime', format: 'YYYY-MM-DD HH:mm', width: 150 },
    { title: '请假人', colKey: 'leaveUserName', width: 90 },
    { title: '流水号', colKey: 'procBusinessKey', width: 120 },
    { title: '流程开始时间', colKey: 'procStartTime', format: 'YYYY-MM-DD HH:mm', width: 150 },
    { title: '流程结束时间', colKey: 'procEndTime', format: 'YYYY-MM-DD HH:mm', width: 150 },
    { title: '流程状态', colKey: 'procStatus' },
    {
      title: '操作',
      colKey: 'actions',
      width: 200,
      fixed: 'right',
      cell: (_h, cell) =>
        useTableActionsColumn(cell, [
          {
            label: '编辑',
            onClick: ({ id }) => {
              // flowRouterMethods.value.showEditProcinst!(id);
            }
          },
          {
            label: '查看',
            onClick: ({ id }) => {
              flowRouterMethods.value.showViewProcinst!(id);
            }
          },
          {
            label: '撤回',
            theme: 'danger',
            onClick: ({ id }) => {
              warnModel('撤回').then(() => {
                removeLeaveByIds([id]).then(() => {
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
                removeLeaveByIds([id]).then(() => {
                  deleteSuccess();
                  tableMethods.value.reload();
                });
              });
            }
          }
        ])
    }
  ],
  searchFormProps: {
    formSchemas: [{ label: '名称', field: 'name', component: 'Input' }]
  }
});
</script>
