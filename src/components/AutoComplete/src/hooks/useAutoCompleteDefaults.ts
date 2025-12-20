/**
 * Rate props 默认值 hooks
 *
 * @author zoulan
 * @since 2024-05-08
 */
import { defaultsDeep } from 'lodash-es';
import type { UnwrapNestedRefs } from 'vue';
import { reactive } from 'vue';

import { RADIO_SETTING } from '/@/settings/componentSetting';

import type { BasicAutoCompleteProps } from '../types';

export function useAutoCompleteDefaults(
  autoCompleteProps: BasicAutoCompleteProps
): UnwrapNestedRefs<BasicDateRangePickerProps> {
  defaultsDeep(autoCompleteProps, RADIO_SETTING);
  return reactive(autoCompleteProps);
}
