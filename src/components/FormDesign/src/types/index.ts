export interface BasicFormDesignProps {
  /** 注册事件 */
  onRegister?: (formDesignMethods: FormDesignMethods) => void;
}
export interface FormDesignMethods {}
export interface FormDesignEmit {
  (e: 'update:methods', formDesignMethods: Required<FormDesignMethods>): void;
}

export interface ElementGroup {
  label: string;
  elements: ElementGroupItem[];
}
export interface ElementGroupItem {
  code: string;
  label: string;
  icon: string;
}

export interface FormDesignConfig {
  /** label宽度,默认值componentSetting中设置 */
  labelWidth?: number;
  /** 布局列数 */
  cols: number;
  formDesignSchemas: FormDesignSchema[];
}

/** 列 */
export interface FormDesignSchema {
  /* 列对象 */
  field?: string;
  /* 标题 */
  label?: string;
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
  /* 上传组件参数 */
  uploadProps?: BasicUploadProps & { dataField: string };
  /* 开关选择器参数 */
  switchProps?: BasicSwitchProps;
  /* 是否必填 */
  required?: boolean;
  /* 规则 */
  rules?: Rule[];
  /**  列占用span数,一行24,默认值:24 */
  span?: number;
  /* 列类型，默认值 */
  type?: FormSchemaType;
  /* drvider label */
  drviderLabel?: string;
  /** 是否显示 */
  show?: boolean;
  /* 是否允许编辑 */
  editable?: boolean;
  /* 值改变事件 */
  onChange?: (value) => void;
}
