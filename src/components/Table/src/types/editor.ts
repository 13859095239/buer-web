/**
 * 表格编辑相关类型定义
 *
 * @author zoulan
 * @since 2023-08-15
 */
import type { BasicCheckboxProps } from '/@/components/Checkbox';
import type { BasicRadioProps } from '/@/components/Radio';
import type { BasicSelectProps } from '/@/components/Select';
import type { BasicTreeSelectProps } from '/@/components/TreeSelect';

export type Rule = RuleObject & {
  trigger?: 'blur' | 'change' | ['change', 'blur'];
};

/** 编辑控件类型 */
export type ComponentType =
  | 'Input'
  | 'InputNumber'
  | 'InputTextArea'
  | 'InputPassword'
  | 'Select'
  | 'Radio'
  | 'Checkbox'
  | 'TreeSelect'
  | 'Cascader'
  | 'DatePicker'
  | 'Rate'
  | 'Switch'
  | 'AutoComplete';

/** 列编辑配置 */
export interface ColumnEditor {
  /* 列对象 */
  field?: string;
  /* 组件 */
  component?: ComponentType;
  /* 下拉选择树组件参数 */
  treeSelectProps?: BasicTreeSelectProps;
  /* 下拉组件参数 */
  selectProps?: ColumnEditorSelectProps;
  /* 复选框组件参数 */
  checkboxProps?: BasicCheckboxProps;
  /* 单选框组件参数 */
  radioProps?: ColumnEditorRadioProps;
  /* 是否必填 */
  required?: boolean;
  /* 规则 */
  rules?: Rule[];
  /* 是否允许编辑 */
  editable?: boolean;
}

/** 更新数据类型对象 */
export type EditorUpdateMap = Map<
  /** 行key */
  string,
  /** 更新数据 */
  EditorUpdateFieldMap
>;

export type EditorUpdateFieldMap = Map<string, { source?: string; target?: string }>;

/** 完整编辑数据 */
export interface EditorIntactData {
  /** 新增的数据列表 */
  addList: Recordable[];
  /** 更新的数据列表 */
  updateMap: EditorUpdateMap;
  /** 删除的数据列表 */
  deleteList: Recordable[];
}

/** 编辑数据，用于提交后端的数据 */
export interface EditorData {
  /** 新增的数据列表 */
  addList: Recordable[];
  /** 更新的数据列表 */
  updateList: Recordable[];
  /** 删除的数据列表 */
  deleteKeys: string;
}

/** 列编辑 SelectProps  */
export interface ColumnEditorSelectProps extends BasicSelectProps {
  /**  更新列 label 字段  */
  columnLabelField: string;
  /**  更新列 value 字段  */
  columnValueField: string;
}

/** 列编辑 RadioProps  */
export interface ColumnEditorRadioProps extends BasicRadioProps {
  /**  更新列 label 字段  */
  columnLabelField: string;
  /**  更新列 value 字段  */
  columnValueField: string;
}
