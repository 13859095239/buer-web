<!--
  - 角色用户编辑页
  -
  - @author zoulan
  - @since 2023-09-02
  -->
<template>
  <BasicModal
    v-model:methods="modalMethods"
    v-bind="modalProps"
  >
    <BasicTable v-bind="tableProps" />
    <RoleUserAdd
      ref="roleUserAddRef"
      @on-saved="tableMethods.reload()"
    />
  </BasicModal>
</template>
<script setup lang="ts">
import { nextTick, ref, shallowRef } from 'vue';

import { treeDept } from '/@/api/system/dept';
import { deleteRoleUserById, getUserPageByRole } from '/@/api/system/role';
import type { BasicModalProps, ModalMethods } from '/@/components/Modal';
import { BasicModal } from '/@/components/Modal';
import type { BasicTableProps, TableMethods } from '/@/components/Table';
import { BasicTable } from '/@/components/Table';
import { deleteSuccess, deleteWarnModel } from '/@/utils/prompt';

import RoleUserAdd from './RoleUserAdd.vue';

const emit = defineEmits<{
  (e: 'onSaved'): void;
}>();
const roleUserAddRef = ref<InstanceType<typeof RoleUserAdd> | null>();
const tableMethods = ref<TableMethods>({} as TableMethods);
const modalMethods = ref<ModalMethods>({} as ModalMethods);

const form = ref<Recordable>({});

/** 角色id */
let id: Nullable<string> = null;
/** modal配置 */
const modalProps = shallowRef<BasicModalProps>({
  title: '编辑角色用户',
  width: 'column-3',
  footer: false,
  onSaved: async () => {
    modalMethods.value.close();
    emit('onSaved');
  },
  onClosed: () => {}
});

// table参数
const tableProps = shallowRef<BasicTableProps>({
  rowSelectionType: 'multiple',
  immediate: false,
  onRegister: (method) => (tableMethods.value = method),
  getApi: (params) => getUserPageByRole({ ...params, roleId: id, equalsRoleId: true }),
  toolbar: [
    {
      name: '新增',
      onClick: () => {
        roleUserAddRef.value?.showAdd(id!);
      }
    },
    {
      name: '删除',
      theme: 'danger',
      isRelationSelected: true,
      onClick: ({ selectedRowKey }) => {
        deleteWarnModel().then(() => {
          deleteRoleUserById(id!, selectedRowKey).then(() => {
            deleteSuccess();
            tableMethods.value.clearSelected();
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
    formSchemas: [
      { label: '用户名', field: 'username', component: 'Input' },
      { label: '姓名', field: 'nickname', component: 'Input' },
      { label: '手机号', field: 'phone', component: 'Input' },
      {
        label: '部门',
        field: 'deptId',
        component: 'TreeSelect',
        treeSelectProps: {
          isLazy: false,
          multiple: false,
          getApi: (params) => treeDept(params)
        }
      }
    ]
  }
});

/** 清空数据 */
const clearData = () => {
  form.value = {};
};

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
