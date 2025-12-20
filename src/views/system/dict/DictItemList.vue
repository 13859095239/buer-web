<!--
  - 字典列表页
  -
  - @author zoulan
  - @since 2023-05-22
  -->
<template>
  <BasicDrawer
    v-model:methods="drawerMethods"
    v-bind="drawerProps"
  >
    <BasicContainer>
      <BasicTable
        v-bind="tableProps"
        v-model:methods="tableMethods"
      />
      <DictItemEdit
        ref="editRef"
        :dictKey="dictKey"
        @on-saved="tableMethods.reload()"
      />
    </BasicContainer>
  </BasicDrawer>
</template>
<script setup lang="ts">
import { nextTick, ref, shallowRef } from 'vue';

import { pageDictItem, removeDictItemByIds } from '/@/api/system/dict';
import { BasicContainer } from '/@/components/Container';
import type { BasicDrawerProps, DrawerMethods } from '/@/components/Drawer';
import { BasicDrawer } from '/@/components/Drawer';
import type { BasicTableProps, TableMethods } from '/@/components/Table';
import { ActionIconEnum, BasicTable } from '/@/components/Table';
import { useTableActionsColumn } from '/@/components/Table/src/hooks/useColumn';
import { deleteSuccess, deleteWarnModel } from '/@/utils/prompt';

import DictItemEdit from './DictItemEdit.vue';

const tableMethods = ref<TableMethods>({} as TableMethods);
const editRef = ref<InstanceType<typeof DictItemEdit> | null>();
let drawerMethods: DrawerMethods;
const dictKey = ref('');
/** drawerMethods配置 */
const drawerProps = shallowRef<BasicDrawerProps>({
  size: '800',
  title: '字典项管理',
  saveButton: false,
  onClosed: () => {}
});

// 初始化Table对象
const tableProps = shallowRef<BasicTableProps>({
  immediate: false,
  pagination: false,
  getApi: (params) => pageDictItem({ ...params, dictKey: dictKey.value }),
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
      theme: 'danger',
      isRelationSelected: true,
      onClick: ({ selectedRowKeys }) => {
        deleteWarnModel().then(() => {
          removeDictItemByIds(selectedRowKeys).then(() => {
            deleteSuccess();
            tableMethods.value.reload();
          });
        });
      }
    }
  ],
  columns: [
    { title: '名称', colKey: 'name', minWidth: 100 },
    { title: '值', colKey: 'value', minWidth: 50 },
    { title: '描述', colKey: 'description', width: 100 },
    { title: '排序', colKey: 'sort', width: 50 },
    {
      title: '操作',
      colKey: 'actions',
      cell: (_h, cell) =>
        useTableActionsColumn(cell, [
          {
            label: '编辑',
            onClick: ({ id }) => {
              editRef.value?.showEdit(id);
            }
          },
          {
            label: '删除',
            theme: 'danger',
            onClick: ({ id }) => {
              deleteWarnModel().then(() => {
                removeDictItemByIds([id]).then(() => {
                  deleteSuccess();
                  tableMethods.value.reload();
                });
              });
            }
          }
        ])
    }
  ]
});

/** 显示编辑视图 */
const showEdit = async (_dictKey: string) => {
  dictKey.value = _dictKey;
  drawerMethods!.show();
  await nextTick();
  tableMethods.value.reload();
};

defineExpose({
  showEdit
});
</script>
