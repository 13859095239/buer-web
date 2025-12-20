<!--
  - 执行监听器列表页
  -
  - @author zoulan
  - @since 2024-06-07
  -->
<template>
  <div class="full">
    <BasicTable
      v-bind="tableProps"
      v-model:methods="tableMethods"
    />
    <Edit
      ref="editRef"
      @saved="saved"
    />
  </div>
</template>
<script setup lang="ts">
import { ref, shallowRef } from 'vue';

import type { BpmnMethods } from '/@/components/Bpmn';
import type { BasicTableProps, TableMethods } from '/@/components/Table';
import { ActionIconEnum, BasicTable } from '/@/components/Table';
import { deleteSuccess, deleteWarnModel } from '/@/utils/prompt';

import type { ExtensionType } from '../../../../types';
import Edit from './Edit.vue';

interface Props {
  methods: BpmnMethods;
  activeElement: any;
}
const props = defineProps<Props>();
const { methods, activeElement } = props;
const editRef = ref<InstanceType<typeof Edit> | null>();
const tableMethods = ref<TableMethods>({} as TableMethods);
const data = ref<Recordable[]>([]);
const extensionType: ExtensionType = 'ExecutionListener';
const tableProps = shallowRef<BasicTableProps>({
  title: '执行监听器管理',
  height: 300,
  getApi: () => {
    return new Promise((resolve) => {
      data.value = methods.getExtensionObjectList(activeElement, extensionType);
      resolve({ records: data.value });
    });
  },
  toolbar: [
    {
      name: '新增',
      icon: ActionIconEnum.ADD,
      onClick: () => {
        editRef.value?.showAdd();
      }
    }
  ],
  columns: [
    { title: '触发类型', colKey: 'event', width: 100 },
    { title: '参数', colKey: 'value', width: 'fill' },
    {
      title: '操作',
      width: 100,
      columnActions: [
        {
          label: '编辑',
          onClick: (record, index) => {
            editRef.value?.showEdit(record, index);
          }
        },
        {
          label: '删除',
          onClick: ({}, index) => {
            deleteWarnModel().then(() => {
              data.value.splice(index, 1);
              methods.updateExtensions(activeElement, extensionType, data.value);
              tableMethods.value.reload();
              deleteSuccess();
            });
          }
        }
      ]
    }
  ]
});

/**
 * 保存
 * @param extensionObject 扩展属性对象
 * @rowIndex 当前行
 */
function saved(extensionObject: Recordable, rowIndex?: number) {
  // 新增
  if (rowIndex === undefined) {
    data.value.push(extensionObject);
  }
  // 修改
  else {
    data.value[rowIndex!] = extensionObject;
  }
  // bpmnXml元素的扩展属性
  methods.updateExtensions(activeElement, extensionType, data.value);
  editRef.value?.close();
  tableMethods.value.reload();
}
</script>
