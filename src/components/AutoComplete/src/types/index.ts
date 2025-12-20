/**
 * AutoComplete type
 *
 * @author zoulan
 * @since 2024-05-08
 */

/**
 * AutoComplete 参数
 */
export interface BasicAutoCompleteProps {
  /** 输入提示 */
  placeholder?: string;

  /** 是否自动执行 */
  immediate?: boolean;

  /** selectedValue改变事件 */
  onSelectedChange?: (selectItem) => void;

  /** 注册事件 */
  onRegister?: (autoCompleteMethods: AutoCompleteMethods) => void;
}

/**
 * AutoComplete 对外方法
 */
export interface AutoCompleteMethods {}
export interface AutoCompleteEmit {
  (e: 'update:methods', radioMethods: Required<AutoCompleteMethods>): void;
}
