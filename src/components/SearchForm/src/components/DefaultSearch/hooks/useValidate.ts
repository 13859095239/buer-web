import { Form } from 'tdesign-vue-next';
import type { ModelRef } from 'vue';
import { computed, reactive } from 'vue';

import type { BasicSearchFormProps, Rule } from '/@/components/SearchForm/src/types';

const useForm = Form.useForm;
export function useValidate(formProps: BasicSearchFormProps, formModel: ModelRef<Recordable<any>, string>) {
  const rules = [];
  computed(() => {
    const r = {};
    formProps.formSchemas?.forEach((formSchema) => {
      if (formSchema.rules) {
        const rules = formSchema.rules;
        rules.forEach((rule) => setMessage(rule));
        r[formSchema.field as string] = formSchema.rules;
      }
    });
    return r;
  });
  const rulesRef = reactive(rules);
  const { validate, validateField, clearValidate } = useForm(formModel, rulesRef, {
    onValidate: (...args) => console.log(...args)
  });
  return { validate, validateField, clearValidate };
}
function setMessage(rule: Rule): void {
  if (rule.message) return;
  const array: string[] = [];
  rule.required && array.push('不能为空');
  switch (rule.type) {
    case 'array':
      array.push('数组类型');
      break;
    case 'boolean':
      array.push('boolean类型');
      break;
    case 'date':
      array.push('日期类型');
      break;
    case 'email':
      array.push('email类型');
      break;
    case 'enum':
      array.push('枚举型');
      break;
    case 'float':
      array.push('浮点型');
      break;
    case 'integer':
      array.push('integer型');
      break;
    case 'number':
      array.push('number型');
      break;
    case 'object':
      array.push('object型');
      break;
    case 'regexp':
      array.push('regexp型');
      break;
    case 'string':
      array.push('字符型');
      break;
    case 'url':
      array.push('url型');
      break;
  }
  rule.min !== undefined && array.push(`>=${rule.min}`);
  rule.max !== undefined && array.push(`>=${rule.max}`);
  rule.message = `${array.join(',')}!`;
}
