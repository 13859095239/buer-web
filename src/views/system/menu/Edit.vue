<!--
  - 菜单编辑页
  -
  - @author zoulan
  - @since 2025-07-26
  -->
<template>
  <BasicModal
    v-model:methods="modalMethods"
    v-bind="modalProps"
  >
    {{ form }}
    <BasicForm
      v-model="form"
      v-model:methods="formMethods"
      v-bind="formProps"
    />
  </BasicModal>
</template>
<script setup lang="ts">
import { nextTick, ref, shallowRef, toRefs } from 'vue';

import { getMenuById, saveMenu, treeMenu, updateMenuById } from '/@/api/system/menu';
import type { BasicFormProps } from '/@/components/Form';
import { BasicForm } from '/@/components/Form';
import type { FormMethods } from '/@/components/Form/src/types/form';
import type { BasicModalProps, ModalMethods } from '/@/components/Modal';
import { BasicModal } from '/@/components/Modal';
import type { TableMethods } from '/@/components/Table';
import type { InsertTreeNodeType } from '/@/components/Table/src/types/table';
import { IS_LIST, MENU_TYPE_ENUM, MENU_TYPE_LIST } from '/@/constants/systemConstants';
import { saveSuccess } from '/@/utils/prompt';

const props = defineProps<Props>();
const emit = defineEmits<{
  (e: 'saved'): void;
}>();

const formMethods = ref<FormMethods>({} as FormMethods);
const modalMethods = ref<ModalMethods>({} as ModalMethods);

interface Props {
  tableMethods: TableMethods;
}
const { tableMethods } = toRefs(props);
const form = ref<Recordable>({});

/** 菜单id */
let id: Nullable<string> = null;
/** 菜单父id */
let parentId: Nullable<string> = null;
/** 锚定树节点id */
let anchorId: Nullable<string> = null;

/** 树表格插入节点类型 */
let insertTreeNodeType: InsertTreeNodeType = 'noAnchor';
/** modal配置 */
const modalProps = shallowRef<BasicModalProps>({
  title: `${id ? '新增' : '编辑'}部门`,
  width: 'column-1',
  onSaved: async () => {
    saveOrUpdate().then((_id) => {
      id = id || _id;
      form.value.id = id;
      saveSuccess();
      if (insertTreeNodeType === 'noAnchor') {
        // 编辑模式，没有具体锚定树节点
        if (parentId === form.value.parentId) {
          // 父节点未变化
          tableMethods.value.updateTreeNode(form.value);
        } else {
          // 父节点变化
          tableMethods.value.moveTreeNode(form.value.parentId, form.value);
        }
      } else {
        // 有锚定树节点
        tableMethods.value.insertTreeNode(anchorId!, form.value, insertTreeNodeType!);
      }
      modalMethods.value.close();
      emit('saved');
    });
  },
  onClosed: () => {}
});

/** form配置 */
const formProps = ref<BasicFormProps>({
  formSchemas: [
    {
      label: '菜单名称',
      field: 'name',
      component: 'Input',
      rules: [{ required: true }]
    },
    {
      label: '上级菜单',
      field: 'parentId',
      component: 'TreeSelect',
      treeSelectProps: {
        isLazy: false,
        multiple: false,
        getApi: (params) => treeMenu(params)
      }
    },
    {
      label: '菜单类型',
      field: 'menuType',
      rules: [{ required: true }],
      component: 'Radio',
      radioProps: {
        options: MENU_TYPE_LIST
      }
    },
    {
      label: '组件地址',
      field: 'component',
      component: 'Input',
      rules: [{ required: true }],
      show: () => form.value.menuType === MENU_TYPE_ENUM.MENU && form.value.frameFlag !== '1'
    },
    {
      label: '是否外链',
      field: 'frameFlag',
      component: 'Radio',
      radioProps: {
        options: IS_LIST
      },
      rules: [{ required: true }],
      show: () => form.value.menuType === MENU_TYPE_ENUM.MENU
    },
    {
      label: '外链地址',
      field: 'frameUrl',
      component: 'Input',
      rules: [{ required: true }],
      show: () => form.value.menuType === MENU_TYPE_ENUM.MENU && form.value.frameFlag === '1'
    },
    {
      label: '路由地址',
      field: 'path',
      component: 'Input',
      rules: [{ required: true }]
    },
    {
      label: '菜单权限标识',
      field: 'permission',
      component: 'Input',
      rules: [{ required: true }],
      show: () => form.value.menuType === MENU_TYPE_ENUM.PERMISSION
    },
    {
      label: '图标',
      field: 'icon',
      component: 'SelectIcon',
      rules: [{ required: true }],
      show: () => form.value.menuType !== MENU_TYPE_ENUM.PERMISSION
    },
    {
      label: '是否显示',
      field: 'visibleFlag',
      component: 'Radio',
      radioProps: {
        options: IS_LIST
      },
      rules: [{ required: true }],
      show: () => form.value.menuType !== MENU_TYPE_ENUM.PERMISSION
    },
    {
      label: '描述',
      field: 'depiction',
      component: 'InputTextArea'
    }
  ]
});

/** 清空数据 */
const clearData = () => {
  form.value = {};
};

/** 获取数据 */
const getData = async (id: string) => {
  const data = await getMenuById(id);
  form.value = data;
};

/** 保存数据 */
const saveOrUpdate = () => {
  if (!id) {
    return saveMenu(form.value!);
  } else {
    return updateMenuById(form.value!);
  }
};

/** 显示查看视图 */
const show = (_id: string) => {
  id = _id;
  parentId = null;
  anchorId = null;
  formProps.value.editable = false;
  clearData();
  modalMethods.value.show();
  nextTick(() => {
    getData(id!);
  });
};

/** 显示新增视图 */
const showAdd = async (
  _anchorId: Nullable<string>,
  _parentId: Nullable<string>,
  _insertTreeNodeType: InsertTreeNodeType
) => {
  clearData();
  id = null;
  anchorId = _anchorId;
  parentId = _parentId;
  form.value.parentId = parentId;
  insertTreeNodeType = _insertTreeNodeType;
  formProps.value.editable = true;
  modalMethods.value.show();
  await nextTick();
  // 确保 formMethods 已经初始化
  if (id === undefined) {
    formMethods.value.findField('parentId').show = false;
  }
  formMethods.value.findField('parentId').editable = false;
};

/** 显示编辑视图 */
const showEdit = (_id: Nullable<string>) => {
  id = _id;
  parentId = null;
  anchorId = null;
  insertTreeNodeType = 'noAnchor';
  formProps.value.editable = true;
  clearData();
  modalMethods.value.show();
  nextTick(() => {
    getData(id!);
  });
};

defineExpose({
  show,
  showAdd,
  showEdit
});
</script>
