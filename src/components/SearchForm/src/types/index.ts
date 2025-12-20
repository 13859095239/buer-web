export type ComponentType =
  | 'Label'
  | 'Input'
  | 'InputNumber'
  | 'Select'
  | 'Radio'
  | 'Checkbox'
  | 'CheckboxGroup'
  | 'TreeSelect'
  | 'Cascader'
  | 'DatePicker'
  | 'DateRangePicker'
  | 'Switch'
  | 'AutoComplete';
import type { FormRule } from 'tdesign-vue-next';
import type { VNode } from 'vue';

import type { BasicCascaderProps } from '/@/components/Cascader';
import type { BasicCheckboxProps } from '/@/components/Checkbox';
import type { BasicCheckboxGroupProps } from '/@/components/CheckboxGroup';
import type { BasicDatePickerProps } from '/@/components/DatePicker';
import type { BasicDateRangePickerProps } from '/@/components/DateRangePicker';
import type { BasicRadioProps } from '/@/components/Radio/src/types';
import type { BasicSelectProps } from '/@/components/Select';
import type { BasicSwitchProps } from '/@/components/Switch';
import type { BasicTreeProps } from '/@/components/Tree';
import type { BasicTreeSelectProps } from '/@/components/TreeSelect';

export type Rule = FormRule & {
  trigger?: 'blur' | 'change' | ['change', 'blur'];
};

/**
 * 醒目提醒时的数字颜色
 */
export type NumberColorType = 'info' | 'warning' | 'danger';

/**
 * tab切换查询项
 */
export interface SearchTabItem {
  key: string;
  name: string;
  number?: boolean;
  numberColor?: NumberColorType;
}

export interface BasicSearchFormProps {
  type?: 'default' | 'advanced';
  inputSearchPlaceholder?: string;
  inputSearchField?: string;
  span?: number;
  tabs?: SearchTabItem[];
  tabField?: string;
  /* Form方法 */
  formMethods?: SearchFormMethods;
  /**
   * 布局
   * vertical,纵向布局
   * inline,行内布局
   */
  layout?: 'vertical' | 'inline';
  /* label宽度 */
  labelWidth?: number;
  /* 列集合 */
  formSchemas: Array<SearchFormSchema>;
  /* 注册事件 */
  onRegister?: (tableMethods: SearchFormMethods) => void;
  /* 值改变事件 */
  onSearch?: (formData: Recordable) => void;
}

export type RegisterFn = (props: BasicSearchFormProps) => SearchFormMethods;

export interface SearchFormSchema {
  /* 列对象 */
  field?: string;
  /* 标题 */
  label?: string | VNode;
  /* 组件 */
  component?: ComponentType;
  /* 下拉选择树组件参数 */
  treeSelectProps?: BasicTreeSelectProps;
  /* 树组件参数 */
  treeProps?: BasicTreeProps;
  /* 下拉组件参数 */
  selectProps?: BasicSelectProps;
  /* 复选框组件参数 */
  checkboxProps?: BasicCheckboxProps;
  /* 复选框group组件参数 */
  checkboxGroupProps?: BasicCheckboxGroupProps;
  /* 单选框组件参数 */
  radioProps?: BasicRadioProps;
  /* 日期选择组件参数 */
  datePickerProps?: BasicDatePickerProps;
  /* 日期范围选择组件参数 */
  dateRangePickerProps?: BasicDateRangePickerProps;
  /* cascader级联选择框组件参数  */
  cascaderProps?: BasicCascaderProps;
  /* 开关选择器参数 */
  switchProps?: BasicSwitchProps;
  /* 是否必填 */
  required?: boolean;
  /* 规则 */
  rules?: Rule[];
  /* 列占用span数,一行24 */
  span?: number;
  /* 列类型 */
  type?: FormSchemaType;
  /** 是否显示 */
  show?: boolean;
  /* 值改变事件 */
  onChange?: (value) => void;
}
export type FormSchemaType = 'component' | 'divider';
export interface SearchFormMethods {
  getFormData: () => Recordable;
  resetFields: () => void;
  search: () => void;
}

export interface SearchFormEmit {
  (e: 'update:methods', FormMethods: Required<SearchFormMethods>): void;
  (e: 'update:modelValue', record?: Recordable): void;
}
