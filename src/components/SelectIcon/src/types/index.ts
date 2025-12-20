/**
 * SelectIcon type
 *
 * @author zoulan
 * @since 2025-08-06
 */

/**
 * SelectIcon 参数
 */
export interface BasicSelectIconProps {
  /** 是否允许编辑 */
  editable?: boolean;
  /** 输入提示 */
  placeholder?: string;
  /** selectedValue改变事件 */
  onSelectedChange?: (selectItem) => void;

  /** 注册事件 */
  onRegister?: (radioMethods: SelectIconMethods) => void;
}

/**
 * SelectIcon 对外方法
 */
export interface SelectIconMethods {}
export interface SelectIconEmit {
  (e: 'update:methods', radioMethods: Required<SelectIconMethods>): void;
}
