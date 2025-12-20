/**
 * Checkbox type
 *
 * @author zoulan
 * @since 2024-07-16
 */

/**
 * Checkbox 参数
 */
export interface BasicCheckboxProps {
  /** 是否允许半选 */
  label?: string;
  /** CheckedChange 改变事件 */
  onCheckedChange?: (checkedItem) => void;
  /** 注册事件 */
  onRegister?: (radioMethods: CheckboxMethods) => void;
}

/**
 * Checkbox 对外方法
 */
export interface CheckboxMethods {}
export interface CheckboxEmit {
  (e: 'update:methods', radioMethods: Required<CheckboxMethods>): void;
}
