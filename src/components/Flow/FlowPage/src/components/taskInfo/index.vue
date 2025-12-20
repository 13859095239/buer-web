<!--
  - 办理情况
  - 
  - @author zoulan
  - @since 2024-06-05
  -->
<template>
  <BasicTable
    v-bind="tableProps"
    v-model:methods="tableMethods"
  />
</template>
<script setup lang="ts">
import { ref } from 'vue';

import { pageTaskinst } from '/@/api/flow/taskinst';
import type { BasicTableProps, TableMethods } from '/@/components/Table';
import { BasicTable } from '/@/components/Table';

interface Props {
  procInstId: string;
}
const props = defineProps<Props>();
const { procInstId } = props;
const tableMethods = ref<TableMethods>({} as TableMethods);
/** 初始化Table对象 */
const tableProps: BasicTableProps = {
  title: '办理情况',
  getApi: (params) => pageTaskinst({ ...params, procInstId }),
  columns: [
    { title: '环节名称', colKey: 'name', minWidth: 300 },
    { title: '办理人员', colKey: 'depiction' },
    { title: '所在部门', colKey: 'depiction' },
    { title: '开始时间', colKey: 'depiction' },
    { title: '办理期限', colKey: 'depiction' },
    { title: '办理时间', colKey: 'depiction' },
    { title: '意见', colKey: 'depiction' }
  ]
};
</script>
