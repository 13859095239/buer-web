<!--
  - 菜单列表页
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

import { pageMenu, removeMenuByIds, treeMenu, updateMenuTreeSort } from '/@/api/system/menu';
import { BasicContainer } from '/@/components/Container';
import type { BasicTableProps, TableMethods } from '/@/components/Table';
import { BasicTable } from '/@/components/Table';
import {
  useTableActionsColumn,
  useTableIconColumn,
  useTableStaticOptionColumn
} from '/@/components/Table/src/hooks/useColumn';
import { MENU_TYPE_ENUM, MENU_TYPE_LIST } from '/@/constants/systemConstants';
import { deleteSuccess, deleteWarnModel, saveSuccess } from '/@/utils/prompt';

import Edit from './Edit.vue';

pageMenu({});
const editRef = ref<InstanceType<typeof Edit> | null>();
const tableMethods = ref<TableMethods>({} as TableMethods);
const tableProps = shallowRef<BasicTableProps>({
  title: '菜单管理',
  tableType: 'tree',
  pagination: false,
  tableDrag: {
    drag: true,
    onDrag: async (sortIds) => {
      updateMenuTreeSort(sortIds)
        .then(() => saveSuccess())
        .catch(() => tableMethods.value.reload());
    }
  },
  getApi: (params) => treeMenu({ ...params, isLazy: false }),
  toolbar: [
    {
      name: '新增根节点',
      onClick: () => {
        editRef.value?.showAdd(null, null, 'appendTo');
      }
    }
  ],
  columns: [
    {
      title: '菜单名称',
      colKey: 'name',
      width: 200,
      cell: (_h, cell) => useTableIconColumn(cell, `i-tdesign:${cell.row.icon}`)
    },
    {
      title: '菜单类型',
      colKey: 'type',
      width: 100,
      cell: (_h, cell) => useTableStaticOptionColumn(cell, MENU_TYPE_LIST, 'tag')
    },
    { title: '路径', colKey: 'path', width: 200 },
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
            show: cell.row.menuType === MENU_TYPE_ENUM.PATH,
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
                removeMenuByIds([id]).then(() => {
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
