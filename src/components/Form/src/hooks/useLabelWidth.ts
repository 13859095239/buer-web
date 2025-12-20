/**
 * 表单label hooks
 *
 * @author zoulan
 * @since 2023-08-15
 */
import { computed, unref } from 'vue';

import { FORM_SETTING } from '/@/settings/projectSetting';

import type { BasicFormProps } from '../types/form';

export function useItemLabelWidth(props: BasicFormProps) {
  return computed(() => {
    const var1 = unref(props);
    const width = `${var1?.labelWidth || FORM_SETTING.labelWidth}px`;
    // 当inline行内布局时，设置label和内容的宽度
    if (props.layout === 'inline') {
      return {
        labelCol: { style: { width } },
        wrapperCol: {
          style: { width: `calc(100% - ${width})` }
        }
      };
    } else {
      return {};
    }
  });
}
