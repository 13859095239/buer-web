<!--
  - 部门列表页
  -
  - @author zoulan
  - @since 2025-07-26
  -->
<template>
  <BasicContainer>
    <BasicTable
      v-bind="tableProps"
      v-model:methods="tableMethods"
    />
    <Edit
      ref="editRef"
      v-bind="{ tableMethods }"
    />
  </BasicContainer>
</template>
<script setup lang="ts">
import { ref, shallowRef } from 'vue';

import { removeDeptByIds, treeDept, updateDeptTreeSort } from '/@/api/system/dept';
import { BasicContainer } from '/@/components/Container';
import type { BasicTableProps, TableMethods } from '/@/components/Table';
import { BasicTable } from '/@/components/Table';
import { useTableActionsColumn } from '/@/components/Table/src/hooks/useColumn';
import { deleteSuccess, deleteWarnModel, saveSuccess } from '/@/utils/prompt';

import Edit from './Edit.vue';

const editRef = ref<InstanceType<typeof Edit> | null>();
const tableMethods = ref<TableMethods>({} as TableMethods);
const tableProps = shallowRef<BasicTableProps>({
  title: '部门管理',
  tableType: 'tree',
  pagination: false,
  tableDrag: {
    drag: true,
    onDrag: async (sortIds) => {
      updateDeptTreeSort(sortIds)
        .then(() => saveSuccess())
        .catch(() => tableMethods.value.reload());
    }
  },
  getApi: (params) => treeDept({ ...params, isLazy: false }),
  toolbar: [
    {
      name: '新增根节点',
      onClick: () => {
        editRef.value?.showAdd(null, null, 'appendTo');
      }
    }
  ],
  columns: [
    { title: '部门名称', colKey: 'name', width: 200 },
    { title: '描述', colKey: 'depiction', width: 200 },
    { title: '排序', colKey: 'sort', width: 60 },
    {
      title: '操作',
      colKey: 'actions',
      width: 'auto',
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
            label: '新增子节点',
            onClick: ({ id }) => {
              editRef.value?.showAdd(id, id, 'appendTo');
            }
          },
          {
            label: '新增前节点',
            onClick: ({ id, parentId }) => {
              editRef.value?.showAdd(id, parentId, 'insertBefore');
            }
          },
          {
            label: '新增后节点',
            onClick: ({ id, parentId }) => {
              editRef.value?.showAdd(id, parentId, 'insertAfter');
            }
          },
          {
            label: '删除',
            theme: 'danger',
            onClick: ({ id }) => {
              deleteWarnModel().then(() => {
                removeDeptByIds([id]).then(() => {
                  deleteSuccess();
                  tableMethods.value.removeTreeNode(id);
                });
              });
            }
          }
        ])
    }
  ]
});
</script>
