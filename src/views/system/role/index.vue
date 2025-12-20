<!--
  - 角色列表页
  -
  - @author zoulan
  - @since 2023-05-22
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
    <RoleMenu ref="roleMenuRef" />
    <RoleUser ref="roleUserRef" />
  </BasicContainer>
</template>
<script setup lang="ts">
import { ref, shallowRef } from 'vue';

import { pageRole, removeRoleByIds } from '/@/api/system/role';
import { BasicContainer } from '/@/components/Container';
import type { BasicTableProps, TableMethods } from '/@/components/Table';
import { BasicTable } from '/@/components/Table';
import { useTableActionsColumn } from '/@/components/Table/src/hooks/useColumn';
import { deleteSuccess, deleteWarnModel } from '/@/utils/prompt';

import Edit from './Edit.vue';
import RoleMenu from './RoleMenu.vue';
import RoleUser from './RoleUser.vue';

const editRef = ref<InstanceType<typeof Edit> | null>();
const tableMethods = ref<TableMethods>({} as TableMethods);
const roleMenuRef = ref<InstanceType<typeof RoleMenu> | null>();
const roleUserRef = ref<InstanceType<typeof RoleUser> | null>();

// 初始化Table对象
const tableProps = shallowRef<BasicTableProps>({
  getApi: (params) => pageRole(params),
  toolbar: [
    {
      name: '新增',
      onClick: () => {
        editRef.value?.showAdd();
      }
    },
    {
      name: '删除',
      isRelationSelected: true,
      theme: 'danger',
      onClick: ({ selectedRowKeys }) => {
        deleteWarnModel().then(() => {
          removeRoleByIds(selectedRowKeys).then(() => {
            deleteSuccess();
            tableMethods.value.reload();
          });
        });
      }
    }
  ],
  columns: [
    { title: '角色名称', colKey: 'name', minWidth: 100 },
    {
      title: '是否系统内置',
      colKey: 'systemFlag',
      format: 'is',
      width: 120
    },
    { title: '描述', colKey: 'depiction', width: 200 },
    { title: '排序', colKey: 'sort', width: 50 },
    {
      title: '操作',
      colKey: 'actions',
      width: 280,
      // 使用 cell 方法自定义单元格
      cell: (_h, cell) =>
        useTableActionsColumn(cell, [
          {
            label: '编辑角色',
            onClick: ({ id }) => {
              editRef.value?.showEdit(id);
            }
          },
          {
            label: '角色权限',
            onClick: ({ id }) => {
              roleMenuRef.value?.showEdit(id);
            }
          },
          {
            label: '角色用户',
            onClick: ({ id }) => {
              roleUserRef.value?.showEdit(id);
            }
          },
          {
            label: '删除',

            onClick: ({ id }) => {
              deleteWarnModel().then(() => {
                removeRoleByIds([id]).then(() => {
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
    formSchemas: [{ label: '角色名称', field: 'name', component: 'Input' }]
  }
});
</script>
