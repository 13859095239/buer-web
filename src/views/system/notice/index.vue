<!--
  - 通知公告列表页
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

import { pageNotice, removeNoticeByIds } from '/@/api/system/notice';
import { BasicContainer } from '/@/components/Container';
import type { BasicTableProps, TableMethods } from '/@/components/Table';
import { BasicTable } from '/@/components/Table';
import { useTableActionsColumn, useTableTagColumn } from '/@/components/Table/src/hooks/useColumn';
import { deleteSuccess, deleteWarnModel, saveSuccess } from '/@/utils/prompt';

import Edit from './Edit.vue';

const editRef = ref<InstanceType<typeof Edit> | null>();
const tableMethods = ref<TableMethods>({} as TableMethods);
const tableProps = shallowRef<BasicTableProps>({
  title: '通知公告管理',
  getApi: (params) => pageNotice(params),
  rowSelectionType: 'multiple',
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
          removeNoticeByIds(selectedRowKeys).then(() => {
            saveSuccess();
            tableMethods.value.reload();
          });
        });
      }
    }
  ],
  columns: [
    {
      title: '名称',
      colKey: 'title',
      fixed: 'left',
      width: 200
    },
    {
      title: '类型',
      colKey: 'noticeTypeName',
      width: 100,
      cell: (_h, cell) => useTableTagColumn(cell, cell.row.noticeTypeTheme)
    },
    {
      title: '创建人',
      colKey: 'createUserName',
      width: 100
    },
    { title: '创建时间', colKey: 'createTime', format: 'YYYY-MM-DD HH:mm', width: 150 },
    {
      title: '操作',
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
                removeNoticeByIds([id]).then(() => {
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
    formSchemas: [{ label: '标题', field: 'title', component: 'Input' }]
  }
});
</script>
