<!--
  - 字典列表页
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
    <DictItemList ref="dictItemListRef" />
  </BasicContainer>
</template>
<script setup lang="ts">
import { ref, shallowRef } from 'vue';

import { pageDict, removeDictByIds } from '/@/api/system/dict';
import { BasicContainer } from '/@/components/Container';
import type { BasicTableProps, TableMethods } from '/@/components/Table';
import { BasicTable } from '/@/components/Table';
import { useTableActionsColumn } from '/@/components/Table/src/hooks/useColumn';
import { deleteSuccess, deleteWarnModel } from '/@/utils/prompt';

import DictItemList from './DictItemList.vue';
import Edit from './Edit.vue';

const editRef = ref<InstanceType<typeof Edit> | null>();
const tableMethods = ref<TableMethods>({} as TableMethods);
const dictItemListRef = ref<InstanceType<typeof DictItemList> | null>();

// 初始化Table对象
const tableProps = shallowRef<BasicTableProps>({
  getApi: (params) => pageDict(params),
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
          removeDictByIds(selectedRowKeys).then(() => {
            deleteSuccess();
            tableMethods.value.reload();
          });
        });
      }
    }
  ],
  columns: [
    { title: '字典名称', colKey: 'name', minWidth: 100 },
    { title: '字典key', colKey: 'dictKey', minWidth: 100 },
    {
      title: '是否系统内置',
      colKey: 'systemFlag',
      format: 'is',
      width: 120
    },
    { title: '描述', colKey: 'depiction', width: 200 },
    {
      title: '操作',
      colKey: 'actions',
      width: 280,
      fixed: 'right',
      cell: (_h, cell) =>
        useTableActionsColumn(cell, [
          {
            label: '编辑字典',
            onClick: ({ id }) => {
              editRef.value?.showEdit(id);
            }
          },
          {
            label: '编辑字典项',
            onClick: ({ dictKey }) => {
              dictItemListRef.value?.showEdit(dictKey);
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
                removeDictByIds([id]).then(() => {
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
    formSchemas: [
      { label: '字典名称', field: 'name', component: 'Input' },
      { label: '字典key', field: 'dictKey', component: 'Input' }
    ]
  }
});
</script>
