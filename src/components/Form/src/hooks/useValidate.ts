/**
 * 表单验证 hooks
 *
 * @author zoulan
 * @since 2023-08-15
 */
import type { FormInstanceFunctions } from 'tdesign-vue-next';
import type { Ref } from 'vue';
import { reactive } from 'vue';

import { errorMessage } from '/@/utils/prompt';

import type { BasicFormProps } from '../types/form';

export function useValidate(formProps: BasicFormProps, fromRef: Ref<FormInstanceFunctions | null>) {
  // 规则列表
  const rules = reactive({});
  // 自定义formSchemas中，转换成form组件需要的rules验证对象
  formProps.formSchemas?.forEach((formSchema) => {
    if (formSchema.rules) {
      const formSchemaRules = formSchema.rules;
      rules[formSchema.field!] = formSchemaRules;
      formSchemaRules.forEach((rule) => {
        rule.trigger = 'change';
        rule.type = 'error';
      });
    }
  });
  const resetFields = fromRef.value?.reset;
  const clearValidate = fromRef.value?.clearValidate;
  const validate = async (): Promise<boolean> => {
    const validateResult = await fromRef.value?.validate();
    if (validateResult !== true) {
      errorMessage('表单验证失败！');
      return false;
    }
    return true;
  };
  return { rules, validate, clearValidate, resetFields };
}
