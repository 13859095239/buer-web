<!--
  - 用户列表页
  -
  - @author zoulan
  - @since 2023-07-12
  -->
<template>
  <BasicModal
    v-model:methods="modalMethods"
    v-bind="modalProps"
  >
    <SiderContainer>
      <template #sider>
        <BasicTree
          v-model="deptId"
          v-bind="treeProps"
        />
      </template>
      <div></div>
      <Button @click="onSaved()">确定</Button>

      <BasicTable
        v-model:selectedRowKeys="selectedRowKeys"
        v-model:selectedRows="selectedRows"
        v-model:methods="tableMethods"
        v-bind="tableProps"
      />
    </SiderContainer>
  </BasicModal>
</template>
<script setup lang="ts">
import { Button } from 'tdesign-vue-next';
import { ref, shallowRef } from 'vue';

import { treeDept } from '/@/api/system/dept';
import { pageUser } from '/@/api/system/user';
import { SiderContainer } from '/@/components/Container';
import type { BasicModalProps, ModalMethods } from '/@/components/Modal';
import { BasicModal } from '/@/components/Modal';
import type { BasicTableProps, TableMethods } from '/@/components/Table';
import { BasicTable } from '/@/components/Table';
import type { BasicTreeProps } from '/@/components/Tree';
import { BasicTree } from '/@/components/Tree';

const emit = defineEmits<{
  (e: 'saved', records: Recordable[]): void;
}>();
const tableMethods = ref<TableMethods>({} as TableMethods);
const modalMethods = ref<ModalMethods>({} as ModalMethods);
const deptId = ref<string | undefined>();
const selectedRowKeys = ref<string[]>();
const selectedRows = ref<Recordable[]>([]);
// modal 配置
const modalProps = shallowRef<BasicModalProps>({
  top: '8%',
  width: 'larger',
  title: '人员选择',
  footer: false
});
/** 初始化部门树对象 */
const treeProps = shallowRef<BasicTreeProps>({
  isLazy: false,
  searchForm: {
    name: '名称'
  },
  getApi: (params) => treeDept(params),
  onSelectedChange: () => {
    tableMethods.value.reload();
  }
});

/** 初始化Table */
const tableProps = shallowRef<BasicTableProps>({
  immediate: false,
  title: '用户管理',
  getApi: (params) => pageUser({ ...params, deptId: deptId.value }),
  columns: [
    { title: '用户名', colKey: 'username', width: 150 },
    { title: '姓名', colKey: 'nickname', width: 150 },
    { title: '手机号', colKey: 'phone', width: 120 },
    { title: '状态', colKey: 'lockFlag', format: 'status', width: 100 },
    { title: '排序', colKey: 'sort', width: 100 }
  ],
  searchFormProps: {
    type: 'default',
    inputSearchField: 'name',
    inputSearchPlaceholder: '姓名',
    formSchemas: [
      { label: '用户名', field: 'username', component: 'Input' },
      { label: '姓名', field: 'name', component: 'Input' },
      { label: '手机号', field: 'phone', component: 'Input' }
    ]
  }
});
function onSaved() {
  emit('saved', selectedRows.value);
  modalMethods.value.close();
}
defineExpose({
  showModal: (ids?: string) => {
    selectedRowKeys.value = ids?.split(',');
    modalMethods.value.show();
  }
});
</script>
