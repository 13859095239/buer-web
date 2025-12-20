<!--
  - 任务监听事件编辑页
  - 配置文件
  - <extensionElements>
  -   <activiti:taskListener event="create" class="com.example.MyTaskCreateListener">
  -     <activiti:field name="myParam" stringValue="${myProcessVariable}"/>
  -   </activiti:taskListener>
  - </extensionElements>
  -
  - @author zoulan
  - @since 2024-06-23
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
import { ref, shallowRef } from 'vue';

import type { BasicFormProps, FormMethods } from '/@/components/Form';
import { BasicForm } from '/@/components/Form';
import type { BasicModalProps, ModalMethods } from '/@/components/Modal';
import { BasicModal } from '/@/components/Modal';
import { TASK_LISTENER_EVENT_LIST } from '/@/constants/flowConstants';

const emit = defineEmits<{
  /**
   * 保存事件
   * @param extensionObject 扩展属性对象
   * @rowIndex 当前行
   */
  (e: 'saved', extensionObject: Recordable, rowIndex?: number): void;
}>();
const formMethods = ref<FormMethods>({} as FormMethods);
const modalMethods = ref<ModalMethods>({} as ModalMethods);

const form = ref<Recordable>({});

/** 当前编辑 table rowIndex */
let rowIndex: number | undefined;
/** modal配置 */
const modalProps = shallowRef<BasicModalProps>({
  title: `${rowIndex === 0 ? '新增' : '编辑'}任务事件`,
  onSaved: async () => {
    saveOrUpdate();
  }
});

/** form配置 */
const formProps = shallowRef<BasicFormProps>({
  formSchemas: [
    {
      label: '事件类型',
      field: 'event',
      component: 'Radio',
      radioProps: {
        options: TASK_LISTENER_EVENT_LIST
      },
      rules: [{ required: true }]
    },
    {
      label: '创建时参数',
      field: 'value',
      component: 'Input',
      rules: [{ required: true }]
    }
  ]
});

/** 清空数据 */
const clearData = () => {
  form.value = {};
};

/** 保存数据 */
const saveOrUpdate = () => {
  return emit('saved', form.value!, rowIndex);
};

/** 显示新增视图 */
const showAdd = () => {
  clearData();
  rowIndex = undefined;
  modalMethods.value.show();
};

/** 显示编辑视图 */
const showEdit = (formData, index: number) => {
  clearData();
  rowIndex = index;
  form.value = formData;
  modalMethods.value.show();
};
/** 关闭视图 */
const close = () => modalMethods.value.close();
defineExpose({
  showAdd,
  showEdit,
  close
});
</script>
