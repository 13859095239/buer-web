/**
 * DatePicker 通用 hooks
 *
 * @author zoulan
 * @since 2024-05-08
 */
import dayjs from 'dayjs';
import { isArray, isFunction } from 'lodash-es';
import type { DatePickerProps, DisableDate } from 'tdesign-vue-next';
import { computed } from 'vue';

import type { BasicDatePickerProps } from '../types';

interface TimeMode extends Pick<DatePickerProps, 'format' | 'enableTimePicker' | 'mode'> {}
export function useDatePicker(props: BasicDatePickerProps) {
  /** 设置选择器时间类型 */
  const timeModeComputed = computed((): TimeMode => {
    switch (props.picker) {
      case 'year':
        // 年
        return { mode: 'year', format: 'YYYY', enableTimePicker: false };
      case 'month':
        // 月
        return { mode: 'month', format: 'YYYY-MM', enableTimePicker: false };
      case 'date':
        // 日
        return { mode: 'date', format: 'YYYY-MM-DD', enableTimePicker: false };
      case 'quarter':
        // 季度
        return { mode: 'quarter', enableTimePicker: false };
      case 'hour':
        // 时
        return { mode: 'date', format: 'YYYY-MM-DD HH', enableTimePicker: true };
      case 'minute':
        // 分
        return { mode: 'date', format: 'YYYY-MM-DD HH:mm', enableTimePicker: true };
      case 'second':
        // 秒
        return { mode: 'date', format: 'YYYY-MM-DD HH:mm:ss', enableTimePicker: true };
    }
  });
  /** 禁用的时间 */
  const disabledDateComputed = computed((): DisableDate | undefined => {
    const { disabledDate } = props;
    if (disabledDate === 'geNow') {
      // 大于等于当前时间
      return (DateValue) => {
        return dayjs(DateValue) >= dayjs().startOf('day');
      };
    } else if (disabledDate === 'gtNow') {
      // 大于当前时间
      return (dateValue) => {
        return dayjs(dateValue) > dayjs().endOf('day');
      };
    } else if (disabledDate === 'leNow') {
      // 小于等于当前时间
      return (dateValue) => {
        return dayjs(dateValue) <= dayjs().endOf('day');
      };
    } else if (disabledDate === 'ltNow') {
      // 小于当前时间
      return (dateValue) => {
        return dayjs(dateValue) < dayjs().startOf('day');
      };
    } else if (isFunction(disabledDate) || isArray(disabledDate)) {
      // 自定义禁用时间,
      return disabledDate;
    } else {
      return undefined;
    }
  });

  return { timeModeComputed, disabledDateComputed };
}
