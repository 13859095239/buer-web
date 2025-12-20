<!--
  - 流程权限 列表页
  -
  - @author zoulan
  - @since 2024-05-15
  -->
<template>
  <div class="full">
    <BasicTable
      v-bind="tableProps"
      v-model:methods="tableMethods"
    />
    <Edit
      ref="editRef"
      @saved="tableMethods.reload()"
    />
  </div>
</template>
<script setup lang="ts">
import { ref, shallowRef } from 'vue';

import { pageModelPermission, removeModelPermissionByIds } from '/@/api/flow/modelPermission';
import type { BasicTableProps, TableMethods } from '/@/components/Table';
import { ActionIconEnum, BasicTable } from '/@/components/Table';
import { deleteWarnModel, saveSuccess } from '/@/utils/prompt';

import Edit from './Edit.vue';

const editRef = ref<InstanceType<typeof Edit> | null>();
const tableMethods = ref<TableMethods>({} as TableMethods);
let modelId: string | undefined;
const tableProps = shallowRef<BasicTableProps>({
  title: '流程权限管理',
  getApi: (params) => pageModelPermission(params),
  toolbar: [
    {
      name: '新增',
      icon: ActionIconEnum.ADD,
      onClick: () => {
        editRef.value?.showAddPermission(modelId!);
      }
    },
    {
      name: '删除',
      icon: ActionIconEnum.DELETE,
      theme: 'danger',
      isRelationSelected: true,
      onClick: (selectedRowKeys) => {
        deleteWarnModel().then(() => {
          removeModelPermissionByIds(selectedRowKeys).then(() => {
            saveSuccess();
            tableMethods.value.reload({ modelId });
          });
        });
      }
    }
  ],
  columns: [
    { title: '编码', colKey: 'code' },
    { title: '名称', colKey: 'name' },
    { title: '描述', colKey: 'depiction' },
    { title: '创建人', colKey: 'createUser' },
    { title: '创建时间', colKey: 'createTime', format: 'YYYY-MM-DD HH:mm' },
    {
      title: '操作',
      columnActions: [
        {
          label: '编辑',
          icon: ActionIconEnum.EDIT,
          onClick: ({ id }) => {
            editRef.value?.showEditPermission(id);
          }
        },
        {
          label: '查看',
          icon: ActionIconEnum.EDIT,
          onClick: ({ id }) => {
            editRef.value?.showPermission(id);
          }
        },
        {
          label: '删除',
          popConfirm: '删除',
          icon: ActionIconEnum.DELETE,
          onClick: ({ id }) => {
            deleteWarnModel().then(() => {
              removeModelPermissionByIds([id]).then(() => {
                saveSuccess();
                tableMethods.value.reload({ modelId });
              });
            });
          }
        }
      ]
    }
  ]
});

/**
 * 初始化数据
 */
async function init(_modelId: string) {
  modelId = _modelId;
  tableMethods.value.reload({ modelId });
}

/** 清空数据 */
const clearData = () => {
  tableMethods.value.clearData();
};

defineExpose({
  init,
  clearData
});
</script>
