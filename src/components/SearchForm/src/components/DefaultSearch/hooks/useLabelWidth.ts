import { computed, unref } from 'vue';

import { FORM_SETTING } from '/@/settings/projectSetting';

import type { BasicSearchFormProps } from '../../../types';

export function useItemLabelWidth(props: BasicSearchFormProps) {
  return computed(() => {
    const var1 = unref(props);
    const width = `${var1?.labelWidth || FORM_SETTING.labelWidth}px`;
    // 当水平布局时，设置label和内容的宽度
    if (props.layout === 'horizontal') {
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
