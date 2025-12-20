<!--
  - userTask 用户任务基础信息设置
  -
  - @author zoulan
  - @since 2024-05-27
  -->
<template>
  <BasicForm
    v-model="form"
    v-bind="formProps"
  />
</template>
<script lang="ts" setup>
import { shallowRef } from 'vue';

import type { BpmnMethods, UserTaskPropertie } from '/@/components/Bpmn/src/types';
import type { BasicFormProps } from '/@/components/Form';
import { BasicForm } from '/@/components/Form';

interface Props {
  activeElement: any;
  methods: BpmnMethods;
}
const props = defineProps<Props>();
const { methods } = props;
const form = defineModel<Partial<UserTaskPropertie>>({ required: true });
/** form配置 */
const formProps = shallowRef<BasicFormProps>({
  layout: 'vertical',
  formSchemas: [
    {
      label: '节点id',
      field: 'id',
      component: 'Input'
    },
    {
      label: '节点名称',
      field: 'name',
      component: 'Input',
      onChange(value) {
        methods.updateAcitiviProperties({ name: value });
      }
    },
    {
      label: '通知方式',
      field: 'flowable:messageMode',
      component: 'Checkbox',
      onChange(value) {
        methods.updateAcitiviProperties({ 'flowable:messageMode': value });
      }
    },
    {
      label: '办理期限(小时)',
      field: 'flowable:limitTime',
      component: 'InputNumber',
      onChange(value) {
        methods.updateAcitiviProperties({ 'flowable:limitTime': value });
      }
    },
    {
      label: '是否自动催办',
      field: 'flowable:remind',
      component: 'Switch',
      onChange(value) {
        methods.updateAcitiviProperties({ 'flowable:remind': value });
      }
    },
    {
      label: '办理期限前多少小时催办',
      field: 'flowable:remindBefoureLimitTime',
      component: 'InputNumber',
      onChange(value) {
        methods.updateAcitiviProperties({ 'flowable:remindBefoureLimitTime': value });
      }
    },
    {
      label: '间隔多少小时再次催办',
      field: 'flowable:remindIntervalTime',
      component: 'InputNumber',
      onChange(value) {
        methods.updateAcitiviProperties({ 'flowable:remindIntervalTime': value });
      }
    },
    {
      label: '最大催办次数',
      field: 'flowable:remindCount',
      component: 'InputNumber',
      onChange(value) {
        methods.updateAcitiviProperties({ 'flowable:remindCount': value });
      }
    }
  ]
});

/** 清空数据 */
const clearData = () => {
  form.value = {};
};

defineExpose({
  clearData
});
</script>
