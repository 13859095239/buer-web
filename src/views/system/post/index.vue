<!--
  - 岗位列表页
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
      ref="noticeRef"
      @saved="tableMethods.reload()"
    />
  </BasicContainer>
</template>
<script setup lang="ts">
import type { Ref } from 'vue';
import { ref, shallowRef } from 'vue';

import { pagePost, updatePostByTableEditor } from '/@/api/system/post';
import { BasicContainer } from '/@/components/Container';
import type { BasicTableProps, TableMethods } from '/@/components/Table';
import { BasicTable } from '/@/components/Table';
import { useTableFormatColumn } from '/@/components/Table/src/hooks/useColumn';
import {
  useEditorCell,
  useInputEditor,
  useInputNumberEditor,
  useRadioEditor
} from '/@/components/Table/src/hooks/useEditorComponents';

const tableMethods: Ref<TableMethods> = ref({} as TableMethods);

const tableProps = shallowRef<BasicTableProps>({
  title: '岗位管理',
  editor: true,
  getApi: (params) => pagePost(params),
  toolbar: [
    {
      name: '保存',
      onClick: () => {
        const editorData = tableMethods!.value.getEditorData();
        updatePostByTableEditor(editorData).then(() => {
          tableMethods!.value.clearEditorData();
          tableMethods!.value.reload();
        });
      }
    },
    {
      name: '新增',
      onClick: () => {
        tableMethods!.value.addNewRow({});
      }
    },
    {
      name: '删除',
      theme: 'danger',
      isRelationSelected: true,
      onClick: () => {
        tableMethods!.value.deleteRowByKeys(tableMethods!.value.getSelectedKeys());
      }
    }
  ],
  columns: [
    {
      title: '名称',
      colKey: 'name',
      cell: (_h, cell) => useEditorCell(cell),
      edit: useInputEditor(tableMethods, {
        rules: [{ required: true }, { max: 50, message: '字符数量不能超过 50' }]
      })
    },
    {
      title: '领导岗位',
      colKey: 'leader',
      cell: (_h, cell) => useTableFormatColumn(cell, 'is'),
      edit: useRadioEditor(tableMethods, {
        props: {
          options: [
            { name: '是', id: '1' },
            { name: '否', id: '0' }
          ]
        },
        rules: [{ required: true }]
      })
    },
    {
      title: '排序',
      colKey: 'sort',
      cell: (_h, cell) => useEditorCell(cell),
      edit: useInputNumberEditor(tableMethods, {
        rules: [{ required: true }]
      })
    }
  ],
  searchFormProps: {
    formSchemas: [{ label: '名称', field: 'name', component: 'Input' }]
  }
});
</script>
