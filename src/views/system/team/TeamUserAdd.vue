<!--
  - 团队用户新增页
  -
  - @author zoulan
  - @since 2024-08-22
  -->
<template>
  <BasicModal
    v-model:methods="modalMethods"
    v-bind="modalProps"
  >
    <BasicTable
      v-bind="tableProps"
      v-model:methods="tableMethods"
    />
  </BasicModal>
</template>
<script setup lang="ts">
import { nextTick, ref, shallowRef } from 'vue';

import { addTeamUser, getUserPageByTeam } from '/@/api/system/team';
import type { BasicModalProps, ModalMethods } from '/@/components/Modal';
import { BasicModal } from '/@/components/Modal';
import type { BasicTableProps, TableMethods } from '/@/components/Table';
import { BasicTable } from '/@/components/Table';
import { saveSuccess } from '/@/utils/prompt';

const emit = defineEmits<{
  (e: 'onSaved'): void;
}>();
const modalMethods = ref<ModalMethods>({} as ModalMethods);
const tableMethods = ref<TableMethods>({} as TableMethods);
/** 团队id */
let teamId: string | undefined;
/** modal配置 */
const modalProps = shallowRef<BasicModalProps>({
  title: '新增团队用户',
  width: 'column-2',
  onSaved: async () => {
    saveOrUpdate().then(() => {
      saveSuccess();
      modalMethods.value.close();
      emit('onSaved');
    });
  },
  onClosed: () => {
    tableMethods.value.clearData();
  }
});
const tableProps = shallowRef<BasicTableProps>({
  rowKey: 'id',
  getApi: (params) =>
    getUserPageByTeam({
      ...params,
      teamId,
      equalsTeamId: false
    }),
  onRegister: (method) => (tableMethods.value = method),
  columns: [
    { title: '用户名', colKey: 'username' },
    { title: '姓名', colKey: 'nickname' },
    { title: '手机号', colKey: 'phone' },
    { title: '所在部门', colKey: 'deptName' }
  ],
  searchFormProps: {
    formSchemas: [
      { label: '用户名', field: 'username', component: 'Input' },
      { label: '姓名', field: 'nickname', component: 'Input' },
      { label: '手机号', field: 'phone', component: 'Input' }
    ]
  }
});

/** 保存数据 */
const saveOrUpdate = () => {
  const userIds = tableMethods.value.getSelectedKeys();
  return addTeamUser({
    teamId,
    userIds
  });
};

/** 显示新增视图 */
const showAdd = async (_teamId: string) => {
  teamId = _teamId;
  modalMethods.value.show();
  await nextTick();
  tableMethods.value.reload();
};

defineExpose({
  showAdd
});
</script>
