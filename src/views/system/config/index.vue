<!--
  - 配置列表页
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
    <Edit
      ref="editRef"
      @saved="tableMethods.reload()"
    />
  </BasicContainer>
</template>
<script setup lang="ts">
import { ref, shallowRef } from 'vue';

import { pageConfig, refreshCache, removeConfigByIds } from '/@/api/system/config';
import { BasicContainer } from '/@/components/Container';
import type { BasicTableProps, TableMethods } from '/@/components/Table';
import { ActionIconEnum, BasicTable } from '/@/components/Table';
import { useTableActionsColumn } from '/@/components/Table/src/hooks/useColumn';
import { deleteSuccess, deleteWarnModel, saveSuccess } from '/@/utils/prompt';

import Edit from './Edit.vue';

const editRef = ref<InstanceType<typeof Edit> | null>();
const tableMethods = ref<TableMethods>({} as TableMethods);
const tableProps = shallowRef<BasicTableProps>({
  title: '配置管理',
  getApi: (params) => pageConfig(params),
  toolbar: [
    {
      name: '新增',
      icon: ActionIconEnum.ADD,
      onClick: () => {
        editRef.value?.showAdd();
      }
    },
    {
      name: '删除',
      icon: ActionIconEnum.DELETE,
      theme: 'danger',
      isRelationSelected: true,
      onClick: ({ selectedRowKeys }) => {
        deleteWarnModel().then(() => {
          removeConfigByIds(selectedRowKeys).then(() => {
            deleteSuccess();
            tableMethods.value.reload();
          });
        });
      }
    },
    {
      name: '刷新缓存',
      icon: ActionIconEnum.REDO,
      onClick: () => {
        refreshCache().then(() => {
          saveSuccess();
        });
      }
    }
  ],
  columns: [
    { title: '名称', colKey: 'name' },
    { title: '键', colKey: 'configKey', width: 200 },
    { title: '值', colKey: 'value' },
    { title: '状态', colKey: 'status', format: 'status' },
    { title: '是否系统内置', colKey: 'systemFlag', format: 'is' },
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
            label: '删除',
            theme: 'danger',
            onClick: ({ id }) => {
              deleteWarnModel().then(() => {
                removeConfigByIds([id]).then(() => {
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
