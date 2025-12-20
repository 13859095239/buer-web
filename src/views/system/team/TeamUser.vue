<!--
  - 团队用户编辑页
  -
  - @author zoulan
  - @since 2024-08-24
  -->
<template>
  <BasicModal
    v-model:methods="modalMethods"
    v-bind="modalProps"
  >
    <BasicTable v-bind="tableProps" />
    <TeamUserAdd
      ref="teamUserAddRef"
      @on-saved="tableMethods.reload()"
    />
  </BasicModal>
</template>
<script setup lang="ts">
import { nextTick, ref, shallowRef } from 'vue';

import { deleteTeamUserById, getUserPageByTeam } from '/@/api/system/team';
import type { BasicModalProps, ModalMethods } from '/@/components/Modal';
import { BasicModal } from '/@/components/Modal';
import type { BasicTableProps, TableMethods } from '/@/components/Table';
import { BasicTable } from '/@/components/Table';
import { deleteSuccess, deleteWarnModel } from '/@/utils/prompt';

import TeamUserAdd from './TeamUserAdd.vue';

const emit = defineEmits<{
  (e: 'saved'): void;
}>();
const teamUserAddRef = ref<InstanceType<typeof TeamUserAdd> | null>();
const tableMethods = ref<TableMethods>({} as TableMethods);
const modalMethods = ref<ModalMethods>({} as ModalMethods);

const form = ref<Recordable>({});

/** 团队id */
let id: Nullable<string> = null;
/** modal配置 */
const modalProps = shallowRef<BasicModalProps>({
  title: '编辑团队用户',
  width: 'column-3',
  saveButton: false,
  onSaved: async () => {
    await saveOrUpdate();
    modalMethods.value.close();
    emit('saved');
  },
  onClosed: () => {}
});

// table参数
const tableProps = shallowRef<BasicTableProps>({
  immediate: false,
  rowKey: 'userId',
  onRegister: (method) => (tableMethods.value = method),
  getApi: (params) => getUserPageByTeam({ ...params, teamId: id, equalsTeamId: true }),
  toolbar: [
    {
      name: '新增',
      onClick: () => {
        teamUserAddRef.value?.showAdd(id!);
      }
    },
    {
      name: '删除',
      isRelationSelected: true,
      onClick: ({ selectedRowKeys }) => {
        deleteWarnModel().then(() => {
          deleteTeamUserById(id!, selectedRowKeys).then(() => {
            deleteSuccess();
            tableMethods.value.reload();
          });
        });
      }
    }
  ],
  columns: [
    { title: '用户名', colKey: 'username' },
    { title: '姓名', colKey: 'nickname' },
    { title: '手机号', colKey: 'phone' },
    { title: '部门', colKey: 'deptName' }
  ],
  searchFormProps: {
    formSchemas: [{ label: '姓名', field: 'name', component: 'Input' }]
  }
});

/** 清空数据 */
const clearData = () => {
  form.value = {};
};

/** 保存数据 */
const saveOrUpdate = () => {};

/** 显示查看视图 */
const show = (_id: string) => {
  id = _id;
  clearData();
  modalMethods.value.show();
  nextTick(() => {
    tableMethods.value.reload();
  });
};

/** 显示新增视图 */
const showAdd = () => {
  clearData();
  id = null;
  modalMethods.value.show();
};

/** 显示编辑视图 */
const showEdit = async (_id: string) => {
  id = _id;
  clearData();
  modalMethods.value.show();
  await nextTick();
  tableMethods.value.reload();
};

defineExpose({
  show,
  showAdd,
  showEdit
});
</script>
