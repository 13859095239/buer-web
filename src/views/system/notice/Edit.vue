<!--
  - 通知公告编辑页
  -
  - @author zoulan
  - @since 2023-09-02
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
import { nextTick, ref, shallowRef } from 'vue';

import { addNotice, getNoticeById, updateNoticeById } from '/@/api/system/notice';
import { useDictRadio } from '/@/components/Dict/src/hooks/useDictRadio';
import type { BasicFormProps } from '/@/components/Form';
import { BasicForm } from '/@/components/Form';
import type { FormMethods } from '/@/components/Form/src/types/form';
import type { BasicModalProps, ModalMethods } from '/@/components/Modal';
import { BasicModal } from '/@/components/Modal';
import type { UploadMethods } from '/@/components/Upload';
import { saveSuccess } from '/@/utils/prompt';

const emit = defineEmits<{
  (e: 'saved'): void;
}>();
const formMethods = ref<FormMethods>({} as FormMethods);
const modalMethods = ref<ModalMethods>({} as ModalMethods);

const form = ref<Recordable>({});

/** 公告id */
let id: Nullable<string> = null;
let uploadMethods: UploadMethods;

/** modal配置 */
const modalProps = shallowRef<BasicModalProps>({
  title: `${id ? '新增' : '编辑'}通知公告`,
  width: 'larger',
  onSaved: async () => {
    saveOrUpdate().then(() => {
      saveSuccess();
      modalMethods.value.close();
      emit('saved');
    });
  },
  onClosed: () => {
    clearData();
  }
});

/** form配置 */
const formProps = shallowRef<BasicFormProps>({
  formSchemas: [
    {
      label: '标题',
      field: 'title',
      component: 'Input',
      rules: [{ required: true }]
    },
    {
      label: '类型',
      field: 'noticeType',
      component: 'Radio',
      radioProps: useDictRadio('noticeType'),
      rules: [{ required: true }]
    },
    {
      label: '内容',
      field: 'content',
      component: 'Editor',
      rules: [{ required: true }]
    },
    {
      label: '附件',
      field: 'fileGroupId',
      component: 'Upload',
      uploadProps: {
        dataField: 'fileGroupData',
        onRegister: (method) => (uploadMethods = method)
      }
    }
  ]
});

/** 清空数据 */
const clearData = () => {
  form.value = {
    content: ''
  };
  uploadMethods?.clearData();
};

const getData = async (id: string) => {
  const data = await getNoticeById(id);
  form.value = data;
};

/**
 * 显示公告信息
 *
 * @param _id 公告id
 */
const show = (_id: string) => {
  id = _id;
  formProps.value.editable = false;
  clearData();
  modalMethods.value.show();
  nextTick(() => {
    getData(id!);
  });
};

/** 显示新增公告 */
const showAdd = () => {
  clearData();
  id = null;
  formProps.value.editable = true;
  modalMethods.value.show();
};

/**
 * 显示编辑公告
 *
 * @param _id 公告id
 */
const showEdit = (_id: string) => {
  id = _id;
  formProps.value.editable = true;
  clearData();
  modalMethods.value.show();
  nextTick(() => {
    getData(id!);
  });
};

/** 保存公告 */
const saveOrUpdate = async () => {
  // 表单验证
  const validateResult = await formMethods.value.validate();
  if (!validateResult) {
    return Promise.reject();
  }
  if (!id) {
    return addNotice(form.value!);
  } else {
    return updateNoticeById(form.value!);
  }
};

defineExpose({
  show,
  showAdd,
  showEdit
});
</script>
