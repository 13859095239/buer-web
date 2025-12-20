<!--
  - 角色编辑页
  -
  - @author zoulan
  - @since 2023-09-02
  -->
<template>
  <BasicDrawer
    v-model:methods="drawerMethods"
    v-bind="drawerProps"
  >
    <BasicForm
      v-model="form"
      v-model:methods="formMethods"
      v-bind="formProps"
    />
  </BasicDrawer>
</template>
<script setup lang="ts">
import { nextTick, ref, shallowRef } from 'vue';

import { treeMenu } from '/@/api/system/menu';
import { getMenusByRoleId, getRoleById, saveMenusByRole } from '/@/api/system/role';
import type { BasicDrawerProps, DrawerMethods } from '/@/components/Drawer';
import { BasicDrawer } from '/@/components/Drawer';
import type { BasicFormProps } from '/@/components/Form';
import { BasicForm } from '/@/components/Form';
import type { FormMethods } from '/@/components/Form/src/types/form';
import { saveSuccess } from '/@/utils/prompt';

const emit = defineEmits<{
  (e: 'saved'): void;
}>();
const formMethods = ref<FormMethods>({} as FormMethods);
let drawerMethods: DrawerMethods;

const form = ref<Recordable>({});

/** 角色id */
let id: Nullable<string> = null;
/** drawerMethods配置 */
const drawerProps = shallowRef<BasicDrawerProps>({
  title: '编辑角色权限',
  onSaved: async () => {
    drawerMethods!.loading.openLoading();
    saveOrUpdate().then(() => {
      saveSuccess();
      drawerMethods!.loading.closeLoading();
      drawerMethods!.close();
    });
  },
  onClosed: () => {}
});

/** form配置 */
const formProps = shallowRef<BasicFormProps>({
  labelWidth: 100,
  formSchemas: [
    {
      label: '角色名',
      field: 'name',
      component: 'Label'
    },
    {
      label: '描述',
      field: 'depiction',
      component: 'Label'
    },
    {
      label: '权限',
      field: 'menuIds',
      component: 'Tree',
      treeProps: {
        height: 300,
        isLazy: false,
        checkable: true,
        getApi: (params) => treeMenu(params)
      }
    }
  ]
});

/** 清空数据 */
const clearData = () => {
  form.value = {};
};

/** 获取数据 */
const getData = async (id: string) => {
  const data = await getMenusByRoleId(id, {
    transform: async (r) => {
      const role = await getRoleById(id);
      return {
        name: role.name,
        depiction: role.depiction,
        menuIds: r
      };
    }
  });
  form.value = data;
};

/** 保存数据 */
const saveOrUpdate = () => {
  const menuIds = form.value.menuIds;
  const record = { roleId: id, menuIds };
  return saveMenusByRole(record);
};

/** 显示编辑视图 */
const showEdit = (_id: string) => {
  id = _id;
  formProps.value.editable = true;
  clearData();
  drawerMethods!.show();
  nextTick(() => {
    getData(id!);
  });
};

defineExpose({
  showEdit
});
</script>
