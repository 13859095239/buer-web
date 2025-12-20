<!--
  - 配置编辑页
  -
  - @author zoulan
  - @since 2025-07-26
  -->
<template>
  <BasicModal
    v-model:methods="modalMethods"
    v-bind="modalProps"
  >
    <BasicForm
      v-model="form"
      v-model:methods="formMethods"
      v-bind="formProps"
    />
  </BasicModal>
</template>
<script setup lang="ts">
import { nextTick, ref, shallowRef, toRefs } from 'vue';

import { getDeptById, saveDept, treeDept, updateDeptById } from '/@/api/system/dept';
import type { BasicFormProps } from '/@/components/Form';
import { BasicForm } from '/@/components/Form';
import type { FormMethods } from '/@/components/Form/src/types/form';
import type { BasicModalProps, ModalMethods } from '/@/components/Modal';
import { BasicModal } from '/@/components/Modal';
import type { TableMethods } from '/@/components/Table';
import type { InsertTreeNodeType } from '/@/components/Table/src/types/table';
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

/** 部门id */
let id: Nullable<string> = null;
/** 部门父id */
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
      label: '部门名称',
      field: 'name',
      component: 'Input',
      rules: [{ required: true }]
    },
    {
      label: '上级部门',
      field: 'parentId',
      component: 'TreeSelect',
      treeSelectProps: {
        isLazy: false,
        multiple: false,
        getApi: (params) => treeDept(params)
      }
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
  const data = await getDeptById(id);
  form.value = data;
};

/** 保存数据 */
const saveOrUpdate = () => {
  if (!id) {
    return saveDept(form.value!);
  } else {
    return updateDeptById(form.value!);
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
  if (formMethods.value && formMethods.value.findField) {
    if (id === undefined) {
      formMethods.value.findField('parentId').show = false;
    }
    formMethods.value.findField('parentId').editable = false;
  }
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
