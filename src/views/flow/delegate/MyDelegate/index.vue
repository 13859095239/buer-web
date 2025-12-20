<!--
  - 我的委托列表页
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
    <Edit
      ref="editRef"
      @saved="tableMethods.reload()"
    />
  </BasicContainer>
</template>
<script setup lang="ts">
import { ref, shallowRef } from 'vue';

import { pageDelegate, removeDelegateByIds } from '/@/api/flow/delegate';
import { BasicContainer } from '/@/components/Container';
import type { BasicTableProps, TableMethods } from '/@/components/Table';
import { ActionIconEnum, BasicTable } from '/@/components/Table';
import { deleteSuccess, deleteWarnModel } from '/@/utils/prompt';

import Edit from './Edit.vue';

const editRef = ref<InstanceType<typeof Edit> | null>();
const tableMethods = ref<TableMethods>({} as TableMethods);
const tableProps = shallowRef<BasicTableProps>({
  title: '我的委托管理',
  getApi: (params) => pageDelegate(params),
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
      onClick: (selectedRowKeys) => {
        deleteWarnModel().then(() => {
          removeDelegateByIds(selectedRowKeys).then(() => {
            deleteSuccess();
            tableMethods.value.reload();
          });
        });
      }
    }
  ],
  columns: [
    { title: '委托人', colKey: 'toUserName' },
    { title: '委托流程', colKey: 'modelName' },
    { title: '委托开始时间', colKey: 'beginTime' },
    { title: '委托结束时间', colKey: 'endTime' },
    { title: '描述', colKey: 'depiction' },
    {
      title: '操作',
      columnActions: [
        {
          label: '编辑',
          icon: ActionIconEnum.EDIT,
          onClick: ({ id }) => {
            editRef.value?.showEdit(id);
          }
        },
        {
          label: '查看',
          icon: ActionIconEnum.EDIT,
          onClick: ({ id }) => {
            editRef.value?.show(id);
          }
        },
        {
          label: '删除',
          icon: ActionIconEnum.DELETE,
          onClick: ({ id }) => {
            deleteWarnModel().then(() => {
              removeDelegateByIds([id]).then(() => {
                deleteSuccess();
                tableMethods.value.reload();
              });
            });
          }
        }
      ]
    }
  ],
  searchFormProps: {
    formSchemas: [
      { label: 'key', field: 'key', component: 'Input' },
      { label: '名称', field: 'name', component: 'Input' }
    ]
  }
});
</script>
