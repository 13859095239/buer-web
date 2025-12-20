<!--
  - oauth令牌列表页
  -
  - @author zoulan
  - @since 2024-09-08
  -->
<template>
  <BasicContainer>
    <BasicTable
      v-bind="tableProps"
      v-model:methods="tableMethods"
    />
  </BasicContainer>
</template>
<script setup lang="ts">
import { ref, shallowRef } from 'vue';

import { pageTokenEndpoint, removeTokenEndpointByTokens } from '/@/api/auth/oauthToken';
import { BasicContainer } from '/@/components/Container';
import type { BasicTableProps, TableMethods } from '/@/components/Table';
import { ActionIconEnum, BasicTable } from '/@/components/Table';
import { useTableActionsColumn } from '/@/components/Table/src/hooks/useColumn';
import { deleteSuccess, deleteWarnModel } from '/@/utils/prompt';

const tableMethods = ref<TableMethods>({} as TableMethods);
const tableProps = shallowRef<BasicTableProps>({
  title: '令牌管理',
  getApi: (params) => pageTokenEndpoint(params),
  toolbar: [
    {
      name: '删除',
      icon: ActionIconEnum.DELETE,
      theme: 'danger',
      isRelationSelected: true,
      onClick: ({ selectedRowKeys }) => {
        deleteWarnModel().then(() => {
          removeTokenEndpointByTokens(selectedRowKeys).then(() => {
            deleteSuccess();
            tableMethods.value.reload();
          });
        });
      }
    }
  ],
  columns: [
    { title: '用户名', colKey: 'username' },
    { title: '客户端', colKey: 'clientId' },
    { title: '令牌', colKey: 'scopes' },
    { title: '授权模式', colKey: 'token' },
    { title: '令牌有效期', colKey: 'validity' },
    {
      title: '操作',
      colKey: 'actions',
      width: 60,
      fixed: 'right',
      cell: (_h, cell) =>
        useTableActionsColumn(cell, [
          {
            label: '删除',
            theme: 'danger',
            onClick: ({ id }) => {
              deleteWarnModel().then(() => {
                removeTokenEndpointByTokens(id).then(() => {
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
    formSchemas: [{ label: '用户名', field: 'username', component: 'Input' }]
  }
});
</script>
