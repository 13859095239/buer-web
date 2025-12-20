import type { Ref } from 'vue';
import { toValue } from 'vue';

import type { BasicSearchFormProps } from '../types';

export function useSearchFormMethods(searchFormProps: BasicSearchFormProps, formModel: Ref<Recordable>) {
  function resetFields() {
    const formData = toValue(formModel);
    for (const key in formData) {
      formData[key] = undefined;
    }
  }
  function search() {
    if (searchFormProps.onSearch) {
      searchFormProps.onSearch(getFormData());
    }
  }
  function getFormData() {
    return toValue(formModel);
  }
  return { resetFields, search, getFormData };
}
