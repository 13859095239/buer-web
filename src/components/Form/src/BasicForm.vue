<!--
  - 表单 组件
  -
  - @author zoulan
  - @since 2023-08-15
  -->
<template>
  <Form
    ref="formRef"
    :rules
    :data="model"
    :showErrorMessage="props.editable"
    :layout
    :labelWidth="props.labelWidth"
    labelAlign="right"
  >
    <Row>
      <template
        v-for="formSchema in props.formSchemas"
        :key="formSchema.field"
      >
        <!-- 预留marign-bottom位置给验证信息 -->
        <Col
          v-if="formSchema?.show?.(model) !== false"
          class="pb-[var(--td-comp-margin-xxl)]"
          :span="formSchema.span || 12"
        >
          <!-- divider 类型 -->
          <Divider
            v-if="formSchema.type === 'divider'"
            orientation="left"
            >{{ formSchema.drviderLabel }}
          </Divider>
          <!-- component 类型 -->
          <FormElement
            v-else
            v-model:formModel="model"
            :formSchema="formSchema"
            :formProps="props"
          >
            <!-- 插槽目的,在Form中实现自定义扩展组件 -->
            <slot :name="formSchema.field"></slot>
          </FormElement>
        </Col>
      </template>
      <slot></slot>
    </Row>
  </Form>
</template>
<script setup lang="ts">
import { assign } from 'lodash-es';
import type { FormInstanceFunctions } from 'tdesign-vue-next';
import { Col, Divider, Form, Row } from 'tdesign-vue-next';
import { ref } from 'vue';

import { FORM_LABLE_WIDTH } from '/@/settings/componentSetting';

import FormElement from './components/FormElement.vue';
import { useData } from './hooks/useData';
import { useFormMethods } from './hooks/useFormMethods';
import { useValidate } from './hooks/useValidate';
import type { BasicFormProps, FormEmit, FormMethods } from './types/form';

const props = withDefaults(defineProps<BasicFormProps>(), {
  layout: 'vertical',
  editable: true,
  labelWidth: FORM_LABLE_WIDTH
});
const emit = defineEmits<FormEmit>();
const formRef = ref<FormInstanceFunctions | null>(null);
/** 组件方法 */
const methods: Partial<FormMethods> = {};
function getMethods(): FormMethods {
  return methods as Required<FormMethods>;
}
/** form表单的model */
const model = defineModel<Recordable>({
  required: true,
  default: {}
});
const { layout } = props;
const loading = ref(false);
// const { labelCol, wrapperCol } = unref(useItemLabelWidth(props));
const { getFormData, getData, saveData, updateData, saveOrUpdateData, reloadData } = useData(props, model, loading);
const { rules, validate, clearValidate, resetFields } = useValidate(props, formRef);
const { findField } = useFormMethods(props, model);
reloadData();
assign(methods, {
  getData,
  reloadData,
  saveData,
  updateData,
  saveOrUpdateData,
  resetFields,
  findField,
  validate,
  clearValidate,
  getFormData,
  loading
});
emit('update:methods', methods as Required<FormMethods>);
props.onRegister?.(getMethods());
</script>
