<!--
  - 抄送信息
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
  title: '抄送信息',
  getApi: (params) => pageTaskinst({ ...params, procInstId }),
  columns: [
    { title: '抄送来源', colKey: 'name', minWidth: 300 },
    { title: '抄送人', colKey: 'depiction' },
    { title: '抄送时间', colKey: 'depiction' },
    { title: '是否已阅办', colKey: 'depiction' },
    { title: '阅读时间', colKey: 'depiction' },
    { title: '意见', colKey: 'depiction' }
  ]
};
</script>
