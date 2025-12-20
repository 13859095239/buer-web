/**
 * 表单基础类型定义
 *
 * @author zoulan
 * @since 2023-08-15
 */
import type { FormInstanceFunctions, FormProps, FormRule } from 'tdesign-vue-next';

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
import type { BasicUploadProps } from '/@/components/Upload';

import type { BasicSelectUserModalProps } from '../../../SelectUserModal/src/types';
import type { ComponentType } from './';

export type Rule = FormRule & {
  trigger?: 'blur' | 'change' | ['change', 'blur'];
};
export interface BasicFormProps extends Pick<FormProps, 'data'> {
  /** Form方法 */
  formMethods?: FormMethods;

  /** key,通常传id */
  keyParms?: Recordable;

  /** 获取数据 */
  getApi?: (...arg: any) => Promise<any>;

  /** 新增数据 */
  saveApi?: (...arg: any) => Promise<any>;

  /** 获取数据 */
  updateApi?: (...arg: any) => Promise<any>;

  /**
   * 布局
   * vertical纵向布局
   * inline行内布局
   */
  layout?: 'vertical' | 'inline';

  /** label宽度,默认值componentSetting中设置 */
  labelWidth?: number;

  /** 列 */
  formSchemas: Array<FormSchema>;

  /** loading */
  loading?: boolean;

  /** 注册事件 */
  onRegister?: (tableMethods: FormMethods) => void;

  /** 值改变事件 */
  onValueChange?: (formData: Recordable) => void;

  /** 是否允许编辑,不允许编辑时,所有组件禁用状态且失去表单校验功能 */
  editable?: boolean;
}

export type RegisterFn = (props: BasicFormProps) => FormMethods;

/** 列 */
export interface FormSchema {
  /** 列对象 */
  field?: string;
  /** 标题 */
  label?: string;
  /** 组件 */
  component?: ComponentType;
  /** 下拉选择树组件参数 */
  treeSelectProps?: BasicTreeSelectProps;
  /** 树组件参数 */
  treeProps?: BasicTreeProps;
  /** 下拉组件参数 */
  selectProps?: BasicSelectProps;
  /** 复选框组件参数 */
  checkboxProps?: BasicCheckboxProps;
  /** 复选框group组件参数 */
  checkboxGroupProps?: BasicCheckboxGroupProps;
  /** 单选框组件参数 */
  radioProps?: BasicRadioProps;
  /** 日期选择组件参数 */
  datePickerProps?: BasicDatePickerProps;
  /** 日期范围选择组件参数 */
  dateRangePickerProps?: BasicDateRangePickerProps;
  /** cascader级联选择框组件参数  */
  cascaderProps?: BasicCascaderProps;
  /** 上传组件参数 */
  uploadProps?: BasicUploadProps & { dataField: string };
  /** 开关选择器组件参数 */
  switchProps?: BasicSwitchProps;
  /** 人员选择组件参数 */
  selectUserModalProps?: BasicSelectUserModalProps;
  /** 是否必填 */
  required?: boolean;
  /** 规则 */
  rules?: Rule[];
  /**  列占用span数,一行24,默认值:24 */
  span?: number;
  /** 列类型，默认值 */
  type?: FormSchemaType;
  /** drvider label */
  drviderLabel?: string;
  /** 是否显示该列 */
  show?: (formData: Recordable) => boolean;
  /** 是否允许编辑 */
  editable?: boolean;
  /** 选中标签字段名（用于Select组件显示已选中的标签文本） */
  selectedLabelField?: string;
  /** 值改变事件 */
  onChange?: (value) => void;
}
export type FormSchemaType = 'component' | 'divider';
export interface FormMethods {
  /**
   * 获取数据
   * @returns void
   */
  getData: () => void;

  /**
   * 刷新数据
   * @returns void
   */
  reloadData: () => void;
  getFormData: () => Recordable;
  saveData: () => Promise<any>;
  updateData: () => Promise<any>;
  saveOrUpdateData: () => Promise<any>;
  clearValidate: () => void;
  resetFields: () => FormInstanceFunctions['reset'];
  validate: FormInstanceFunctions['validate'];
  /** 获取列配置 */
  findField: (field: string) => FormSchema;
}

export interface FormEmit {
  (e: 'update:methods', FormMethods: Required<FormMethods>): void;
  (e: 'update:modelValue', recordable?: Recordable): void;
}
