<!--
  - 流程设计 列表页
  -
  - @author zoulan
  - @since 2023-07-12
  -->
<template>
  <BasicContainer>
    <BasicTable
      v-bind="tableProps"
      v-model:methods="tableMethods"
    />
    <Edit ref="editRef" />
    <Version ref="versionRef" />
  </BasicContainer>
</template>
<script setup lang="ts">
import { ref, shallowRef } from 'vue';

import { listCategory } from '/@/api/flow/category';
import { deployModelByModelId, pageModel, removeModelByIds } from '/@/api/flow/model';
import { BasicContainer } from '/@/components/Container';
import type { BasicTableProps, TableMethods } from '/@/components/Table';
import { BasicTable } from '/@/components/Table';
import { useTableActionsColumn } from '/@/components/Table/src/hooks/useColumn';
import { isNullOrUnDefOrBlank } from '/@/utils/is';
import { deleteSuccess, deleteWarnModel, saveSuccess, warnModel } from '/@/utils/prompt';

import Edit from './edit/index.vue';
import Version from './version/index.vue';

const editRef = ref<InstanceType<typeof Edit> | null>();
const versionRef = ref<InstanceType<typeof Version> | null>();
const tableMethods = ref<TableMethods>({} as TableMethods);
const tableProps = shallowRef<BasicTableProps>({
  title: '流程设计管理',
  getApi: (params) => pageModel(params),
  toolbar: [
    {
      name: '新增',
      onClick: () => {
        editRef.value?.showAddModel();
      }
    },
    {
      name: '删除',
      theme: 'danger',
      isRelationSelected: true,
      onClick: ({ selectedRowKeys }) => {
        deleteWarnModel().then(() => {
          removeModelByIds(selectedRowKeys).then(() => {
            deleteSuccess();
            tableMethods.value.reload();
          });
        });
      }
    }
  ],
  columns: [
    { title: '流程名称', colKey: 'name', width: 150 },
    { title: '流程标识', colKey: 'key', width: 150 },
    { title: '类型名称', colKey: 'categoryName', width: 150 },
    {
      columType: 'tag',
      title: '流程版本',
      colKey: 'lastDeployVersion',
      format: (value) => {
        if (!isNullOrUnDefOrBlank(value)) {
          return `V${value}`;
        } else {
          return '未发布';
        }
      },
      tagColor: (value) => {
        if (!isNullOrUnDefOrBlank(value)) {
          return 'error';
        } else {
          return 'default';
        }
      }
    },
    {
      title: '最后更新时间',
      colKey: 'lastUpdateTime',
      width: 150,
      format: 'YYYY-MM-DD HH:mm'
    },
    {
      title: '最后发布时间',
      colKey: 'lastDeployTime',
      width: 150,
      format: 'YYYY-MM-DD HH:mm'
    },
    { title: '排序', colKey: 'sort', width: 60 },
    {
      title: '操作',
      colKey: 'actions',
      width: 250,
      fixed: 'right',
      cell: (_h, cell) =>
        useTableActionsColumn(cell, [
          {
            label: '编辑',
            onClick: ({ id }) => {
              editRef.value?.showEditModel(id);
            }
          },
          {
            label: '发布',
            onClick: ({ id }) => {
              warnModel('发布,发布后将替换现有版本').then(() => {
                deployModelByModelId(id).then(() => {
                  saveSuccess('发布成功');
                  tableMethods.value.reload();
                });
              });
            }
          },
          {
            label: '版本管理',
            onClick: ({ key }) => {
              versionRef.value?.showEdit(key);
            }
          },
          {
            label: '删除',
            theme: 'danger',
            onClick: ({ id }) => {
              deleteWarnModel().then(() => {
                removeModelByIds([id]).then(() => {
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
      { label: '流程名称', field: 'name', component: 'Input' },
      { label: '流程标识', field: 'key', component: 'Input' },
      {
        label: '类型名称',
        field: 'category',
        component: 'Select',
        selectProps: { getApi: (params) => listCategory(params) }
      }
    ]
  }
});
</script>
