/**
 * 表单基础方法 hooks
 *
 * @author zoulan
 * @since 2023-08-15
 */
import type { ModelRef } from 'vue';
import { unref } from 'vue';

import type { BasicFormProps, FormSchema } from '../types';

export function useFormMethods(formProps: BasicFormProps, formModel: ModelRef<Recordable<any>, string>) {
  function resetFields() {
    for (const key in unref(formModel)) {
      formModel[key] = undefined;
    }
  }
  /** 获取列配置 */
  function findField(field: string): FormSchema {
    return formProps.formSchemas.find((formSchema) => formSchema.field === field)!;
  }
  return { resetFields, findField };
}
