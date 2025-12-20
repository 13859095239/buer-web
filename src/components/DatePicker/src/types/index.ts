/**
 * DatePicker type
 *
 * @author zoulan
 * @since 2024-05-08
 */
import type { DateValue, DisableDate } from 'tdesign-vue-next';

/** 日期禁止选择 */
export type DisabledDateFunction = (dateValue: DateValue) => boolean;
/**
 * DatePicker 参数 extends Pick<DatePickerProps, 'picker'>
 */
export interface BasicDatePickerProps {
  /**
   * 设置选择器类型
   * year 年
   * month 月
   * date 日
   * hour 时
   * minute 分
   * second 秒
   * quarter 季度
   */
  picker: 'year' | 'month' | 'date' | 'hour' | 'minute' | 'second' | 'quarter';

  /**
   *
   * geNow 大于等于当前时间
   * gtNow 大于当前时间
   * leNow 小于等于当前时间
   * ltNow 小于当前时间
   * DisableDate 自定义禁用时间
   */
  disabledDate?: 'geNow' | 'gtNow' | 'leNow' | 'ltNow' | DisableDate | undefined;
  /** selectedValue改变事件 */
  onSelectedChange?: (selectItem) => void;

  /** 注册事件 */
  onRegister?: (radioMethods: DatePickerMethods) => void;
}

/**
 * DatePicker 对外方法
 */
export interface DatePickerMethods {}
export interface DatePickerEmit {
  (e: 'update:methods', radioMethods: Required<DatePickerMethods>): void;
}
