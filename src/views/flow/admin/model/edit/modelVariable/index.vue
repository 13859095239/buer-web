<!--
  - 流程变量 列表页
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

import { pageModelVariable, removeModelVariableByIds } from '/@/api/flow/modelVariable';
import type { BasicTableProps, TableMethods } from '/@/components/Table';
import { ActionIconEnum, BasicTable } from '/@/components/Table';
import { deleteWarnModel, saveSuccess } from '/@/utils/prompt';

import Edit from './Edit.vue';

const editRef = ref<InstanceType<typeof Edit> | null>();
const tableMethods = ref<TableMethods>({} as TableMethods);
let modelId: string | undefined;
const tableProps = shallowRef<BasicTableProps>({
  title: '流程变量管理',
  getApi: (params) => pageModelVariable({ ...params, modelId }),
  toolbar: [
    {
      name: '新增',
      icon: ActionIconEnum.ADD,
      onClick: () => {
        editRef.value?.showAddModelVariable(modelId!);
      }
    },
    {
      name: '删除',
      icon: ActionIconEnum.DELETE,
      theme: 'danger',
      isRelationSelected: true,
      onClick: (selectedRowKeys) => {
        deleteWarnModel().then(() => {
          removeModelVariableByIds(selectedRowKeys).then(() => {
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
    {
      title: '操作',
      columnActions: [
        {
          label: '编辑',
          icon: ActionIconEnum.EDIT,
          onClick: ({ id }) => {
            editRef.value?.showEditModelVariable(id);
          }
        },
        {
          label: '查看',
          icon: ActionIconEnum.EDIT,
          onClick: ({ id }) => {
            editRef.value?.showModelVariable(id);
          }
        },
        {
          label: '删除',
          popConfirm: '删除',
          icon: ActionIconEnum.DELETE,
          onClick: ({ id }) => {
            deleteWarnModel().then(() => {
              removeModelVariableByIds([id]).then(() => {
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
