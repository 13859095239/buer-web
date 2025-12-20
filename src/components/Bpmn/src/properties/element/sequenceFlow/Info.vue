<!--
  - sequenceFlow连接线基础信息设置
  - 配置文件
  - <bpmn:conditionExpression xsi:type="bpmn2:tFormalExpression">
  -   ${operationType == 'agree'}
  - </bpmn:conditionExpression>
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
import { SEQUENCE_FLOW_TYPE_LIST } from '/@/constants/flowConstants';

interface Props {
  activeElement: any;
  methods: BpmnMethods;
}
const props = defineProps<Props>();
const { methods } = props;
const form = defineModel<Partial<UserTaskPropertie>>({ required: true });
const moddle = methods.getModdle();
const elementRegistry = methods.getElementRegistry();
/** form配置 */
const formProps = shallowRef<BasicFormProps>({
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
      label: '流转类型',
      field: 'sequenceFlowType',
      component: 'Radio',
      radioProps: {
        options: SEQUENCE_FLOW_TYPE_LIST
      },
      onChange(value) {
        const line = methods.getActiveElement();
        const sourceId = line.businessObject.sourceRef.id;
        const sourceShape = elementRegistry.get(sourceId);
        // 修改连接线的属性同时会修改target元素并触发element.changed
        // 关闭元素改变事件
        methods.stopChangeActiveElement();
        if (!value || value === 'normal') {
          methods.updateAcitiviProperties({ conditionExpression: null });
          delete line.businessObject.conditionExpression;
        } else if (value === 'default') {
          methods.updateProperties(sourceShape as any, { default: line });
          methods.updateAcitiviProperties({ conditionExpression: null });
          delete line.businessObject.conditionExpression;
        } else if (value === 'condition') {
          methods.updateAcitiviProperties({
            conditionExpression: moddle.create('bpmn:FormalExpression')
          });
        }
        methods.setActiveElement(line);
        // 开启元素改变事件
        methods.startChangeActiveElement();
      }
    },
    {
      label: '条件表达',
      field: 'conditionExpression',
      component: 'Input',
      onChange(value) {
        if (!value) {
          methods.updateAcitiviProperties({
            conditionExpression: undefined
          });
          return;
        }
        const conditionExpression = moddle.create('bpmn:FormalExpression', {
          body: value
        });
        methods.updateAcitiviProperties({ conditionExpression });
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
