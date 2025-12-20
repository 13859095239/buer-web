/**
 * cascader type
 *
 * @author zoulan
 * @since 2024-05-31
 */

import type { TdCascaderProps } from 'tdesign-vue-next';

/**
 * Cascader 参数
 */
export interface BasicCascaderProps {
  /** 定义value/label/disabled/children在data数据中对应的字段别名 */
  keys: TdCascaderProps['keys'];
  /** 显示搜索框 */
  showSearch?: boolean;

  /** 显示清除按钮 */
  allowClear?: boolean;

  /** 输入提示 */
  placeholder?: string;

  /** 是否自动执行 */
  immediate?: boolean;

  /** 是否多选 */
  multiple?: boolean;

  /**  获取数据API */
  getApi?: (...arg: any) => Promise<any>;

  /** Cascader label列配置 */
  labelField?: string;

  /** Cascader value列配置 */
  valueField?: string;

  /** Cascader children列配置 */
  childrenField?: string;

  /** selectedValue改变事件 */
  onSelectedChange?: (selectItem) => void;

  /** 注册事件 */
  onRegister?: (radioMethods: CascaderMethods) => void;
}

/** Cascader 对外方法 */
export interface CascaderMethods {
  /**
   * 获取选择项，单选
   * @returns 选择项
   */
  getSelected: () => Recordable;

  /**
   * 获取选择项，多选
   * @returns 选择项列表
   */
  getSelectedList: () => Recordable[];

  /**
   * 获取选择值
   * @returns 选择值，多个以逗号隔开
   */
  getSelectedValue: () => string | undefined;

  /** 设置选中项,多个以逗号隔开 */
  setSelected: (selectedKey: string) => void;

  /** 清空选中项 */
  clearSelected: () => void;

  /**
   * 刷新数据
   * @param 回发参数
   */
  reload: (params?: Recordable) => Promise<void>;
}
export interface CascaderEmit {
  (e: 'update:methods', radioMethods: Required<CascaderMethods>): void;
}
