/**
 * SelectUserModal选人组件类型定义
 *
 * @author zoulan
 * @since 2025-07-09
 */
export type RegisterFn = (props: BasicSelectUserModalProps) => SelectUserModalMethods;
export interface BasicSelectUserModalProps {
  /** 是否允许编辑 */
  editable?: boolean;

  /** 是否多选 */
  multiple?: boolean;

  /** 输入提示 */
  placeholder?: string;

  /**  注册事件 */
  onRegister?: (selectMethods: SelectUserModalMethods) => void;

  /** selectedValue改变事件 */
  onSelectedChange?: (selectItem: Recordable | Recordable[] | undefined) => void;
}
export interface SelectUserModalMethods {}
export interface SelectUserModalEmit {
  (e: 'update:methods', selectMethods: Required<SelectUserModalMethods>): void;
}
