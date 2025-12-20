<!--
  - 编号规则列表页
  -
  - @author zoulan
  - @since 2024-06-07
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

import { pageCodeRule, removeCodeRuleByIds } from '/@/api/system/codeRule';
import { BasicContainer } from '/@/components/Container';
import type { BasicTableProps, TableMethods } from '/@/components/Table';
import { BasicTable } from '/@/components/Table';
import { useTableActionsColumn } from '/@/components/Table/src/hooks/useColumn';
import { deleteSuccess, deleteWarnModel } from '/@/utils/prompt';

import Edit from './Edit.vue';

// 编号规则编辑组件
const editRef = ref<InstanceType<typeof Edit> | null>();

// Table 组件方法
const tableMethods = ref<TableMethods>({} as TableMethods);

/** Table 组件配置 */
const tableProps = shallowRef<BasicTableProps>({
  title: '编号规则管理',
  getApi: (params) => pageCodeRule(params),
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
          removeCodeRuleByIds(selectedRowKeys).then(() => {
            deleteSuccess();
            tableMethods.value.reload();
          });
        });
      }
    }
  ],
  columns: [
    { title: '编码', colKey: 'code' },
    { title: '名称', colKey: 'name' },
    { title: '流水号范例', colKey: 'example' },
    { title: '流水号前缀', colKey: 'name' },
    { title: '流水号日期类型', colKey: 'name' },
    { title: '流水号位数', colKey: 'name' },
    { title: '描述', colKey: 'name' },
    { title: '排序', colKey: 'sort' },
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
                removeCodeRuleByIds([id]).then(() => {
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
      { label: 'key', field: 'key', component: 'Input' },
      { label: '名称', field: 'name', component: 'Input' }
    ]
  }
});
</script>
