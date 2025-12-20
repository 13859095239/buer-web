<!--
  - 团队列表页
  -
  - @author zoulan
  - @since 2024-08-24
  -->
<template>
  <BasicContainer>
    <BasicTable
      v-bind="tableProps"
      v-model:methods="tableMethods"
    />
    <Edit
      ref="editRef"
      @on-saved="tableMethods.reload()"
    />
    <TeamUser ref="teamUserRef" />
  </BasicContainer>
</template>
<script setup lang="ts">
import { ref, shallowRef } from 'vue';

import { pageTeam, removeTeamByIds } from '/@/api/system/team';
import { BasicContainer } from '/@/components/Container';
import type { BasicTableProps, TableMethods } from '/@/components/Table';
import { BasicTable } from '/@/components/Table';
import { useTableActionsColumn } from '/@/components/Table/src/hooks/useColumn';
import { deleteSuccess, deleteWarnModel } from '/@/utils/prompt';

import Edit from './Edit.vue';
import TeamUser from './TeamUser.vue';

const editRef = ref<InstanceType<typeof Edit> | null>();
const tableMethods = ref<TableMethods>({} as TableMethods);
const teamUserRef = ref<InstanceType<typeof TeamUser> | null>();

// 初始化Table对象
const tableProps = shallowRef<BasicTableProps>({
  getApi: (params) => pageTeam(params),
  toolbar: [
    {
      name: '新增',
      onClick: () => {
        editRef.value?.showAdd();
      }
    },
    {
      name: '删除',
      theme: 'danger',
      isRelationSelected: true,
      onClick: ({ selectedRowKeys }) => {
        deleteWarnModel().then(() => {
          removeTeamByIds(selectedRowKeys).then(() => {
            deleteSuccess();
            tableMethods.value.reload();
          });
        });
      }
    }
  ],
  columns: [
    { title: '团队名称', colKey: 'name', minWidth: 100 },
    { title: '描述', colKey: 'depiction', width: 200 },
    {
      title: '操作',
      colKey: 'actions',
      width: 280,
      fixed: 'right',
      cell: (_h, cell) =>
        useTableActionsColumn(cell, [
          {
            label: '编辑团队',
            onClick: ({ id }) => {
              editRef.value?.showEdit(id);
            }
          },
          {
            label: '查看',
            onClick: ({ id }) => {
              editRef.value?.show(id);
            }
          },
          {
            label: '团队用户',
            onClick: ({ id }) => {
              teamUserRef.value?.showEdit(id);
            }
          },
          {
            label: '删除',
            theme: 'danger',
            onClick: ({ id }) => {
              deleteWarnModel().then(() => {
                removeTeamByIds([id]).then(() => {
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
    formSchemas: [{ label: '团队名称', field: 'name', component: 'Input' }]
  }
});
</script>
