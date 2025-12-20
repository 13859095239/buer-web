import type {
  InputNumberProps,
  InputProps,
  PrimaryTableCellParams,
  TableEditableCellConfig,
  TableEditableCellRules
} from 'tdesign-vue-next';
import { Input, InputNumber } from 'tdesign-vue-next';
import type { Ref } from 'vue';
import { computed } from 'vue';

import type { BasicRadioProps } from '/@/components/Radio';
import { BasicRadio } from '/@/components/Radio';

import { EDITED_FIELD_SUFFIX, NEW_ROW_COLUMN_NANME_FLAG } from '../enums';
import type { TableMethods } from '../types';

/**
 * 生成编辑列的基本cell
 * 主要目的是显示编辑状态
 * @param cell table cell传进来的数据
 * @param formatMap 键值map,根据map数据转换
 * @returns h
 */
export function useEditClass(cell: PrimaryTableCellParams<Recordable>) {
  const cellClass = computed(() => {
    // 列key
    const colKey = cell.col.colKey!;
    // 行对象
    const rowRecord = cell.row;
    return {
      'edited-column': rowRecord[colKey + EDITED_FIELD_SUFFIX],
      'new-row-column': rowRecord[NEW_ROW_COLUMN_NANME_FLAG]
    };
  });
  return { cellClass };
}

/**
 * 生成编辑列的基本cell
 * 主要目的是显示编辑状态
 * @param cell table cell传进来的数据
 * @param formatMap 键值map,根据map数据转换
 * @returns h
 */
export function useEditorCell(cell: PrimaryTableCellParams<Recordable>, cellType?: 'tag') {
  // 列key
  const colKey = cell.col.colKey!;
  // 行对象
  const rowRecord = cell.row;
  // 列值
  const cellValue = rowRecord[colKey];
  const { cellClass } = useEditClass(cell);
  return <div class={cellClass.value}>{cellValue}</div>;
}

/** inputEditor组件参数 */
export interface InputEditorProps {
  /** Input组件参数,默认{clearable: true, autofocus: true} */
  props?: InputProps;
  /** 验证规则参数,可以参考官网form组件的rules */
  rules?: TableEditableCellRules<any>;
}

/**
 * Input单元格编辑组件
 * 文本输入框
 *
 * @param methods tableMethods表格方法对象
 * @param inputEditorProps inputEditor组件参数
 */
export function useInputEditor(
  methods: Ref<TableMethods>,
  inputEditorProps?: InputEditorProps
): TableEditableCellConfig<any> {
  return {
    component: Input,
    // 传入组件的参数
    props: {
      clearable: true,
      autofocus: true,
      ...inputEditorProps?.props
    },
    // 是否显示编辑图标
    showEditIcon: false,
    // 触发校验时机
    validateTrigger: 'change',
    // 退出编辑事件
    abortEditOnEvent: ['onBlur', 'onEnter'],
    // 退出编辑触发
    onEdited: (context) => {
      methods.value.updateCellData(context);
    },
    rules: inputEditorProps?.rules
  };
}

/** InputNumberEditor组件参数 */
export interface InputNumberEditorProps {
  /** InputNumber组件参数,默认{autofocus: true} */
  props?: InputNumberProps;
  /** 验证规则参数,可以参考官网form组件的rules */
  rules?: TableEditableCellRules<any>;
}

/**
 * InputNumber单元格编辑组件
 * 数字输入框
 *
 * @param methods tableMethods表格方法对象
 * @param inputEditorProps inputEditor组件参数
 */
export function useInputNumberEditor(
  methods: Ref<TableMethods>,
  inputEditorProps?: InputNumberEditorProps
): TableEditableCellConfig<any> {
  return {
    component: InputNumber,
    props: {
      ...inputEditorProps?.props
    },
    showEditIcon: false,
    validateTrigger: 'change',
    abortEditOnEvent: ['onBlur', 'onEnter'],
    onEdited: (context) => {
      methods.value.updateCellData(context);
    },
    rules: inputEditorProps?.rules
  };
}

/** radioEditor组件参数 */
export interface RadioEditorProps {
  /** BasicRadio组件参数 */
  props?: BasicRadioProps;
  /** 验证规则参数,可以参考官网form组件的rules */
  rules?: TableEditableCellRules<any>;
}

/**
 * radio单元格编辑组件
 *
 * @param methods tableMethods表格方法对象
 * @param radioEditorProps radioEditor组件参数
 */
export function useRadioEditor(
  methods: Ref<TableMethods>,
  radioEditorProps?: RadioEditorProps
): TableEditableCellConfig<any> {
  return {
    component: BasicRadio,
    props: radioEditorProps?.props,
    showEditIcon: false,
    validateTrigger: 'change',
    abortEditOnEvent: ['onChange'],
    onEdited: (context) => {
      methods.value.updateCellData(context);
    },
    rules: radioEditorProps?.rules
  };
}
