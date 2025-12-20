/**
 * Switch type
 *
 * @author zoulan
 * @since 2024-05-08
 */

import type { TdSwitchProps } from 'tdesign-vue-next';

/**
 * Switch 参数
 */
export interface BasicSwitchProps {
  /** 尺寸 */
  size?: 'small' | 'medium' | 'large';

  /**  用于自定义开关的值，[打开时的值，关闭时的值]。默认为 [true, false] */
  customValue: TdSwitchProps['customValue'];

  /**
   * 显示模式
   * icon-open 开关图标
   * yes-no  是否
   * open-close 开关
   */
  contentType?: 'icon-open' | 'yes-no' | 'open-close';

  /** selectedValue改变事件 */
  onSelectedChange?: (selectItem) => void;

  /** 注册事件 */
  onRegister?: (radioMethods: SwitchMethods) => void;
}

/**
 * Switch 对外方法
 */
export interface SwitchMethods {}
export interface SwitchEmit {
  (e: 'update:methods', radioMethods: Required<SwitchMethods>): void;
}
