export interface BasicCheckboxGroupProps {
  /**  获取数据API */
  getApi?: (...arg: any) => Promise<any>;
  /** 选择模式 */
  mode?: 'multiple' | 'tags' | 'SECRET_COMBOBOX_MODE_DO_NOT_USE';
  /**  label 字段 */
  labelField?: string;
  /**  value字段 */
  valueField?: string;
  // 是否自动执行
  immediate?: boolean;
  /**  输入提示 */
  placeholder?: string;
  /**  注册事件 */
  onRegister?: (checkboxMethods: CheckboxGroupMethods) => void;
  /** selectedValue改变事件 */
  onSelectedChange?: (selectItem: Recordable | Recordable[] | undefined) => void;
}
export interface CheckboxGroupMethods {
  /**  获取选中项，多选 */
  getSelectedList: () => Recordable[];
  /** 获取选中项值,多个以逗号隔开 */
  getSelectedValue: () => string | undefined;
  /** 获取选择项label,多个以逗号隔开 */
  getSelectedLable: () => string | undefined;
  /** 设置选中项,多个以逗号隔开 */
  setSelected: (selectedKey: string) => void;
  /** 清空选中项 */
  clearSelected: () => void;
  /** 刷新数据 */
  reload: (params?: Recordable) => Promise<void>;
}
export interface CheckboxEmit {
  (e: 'update:methods', selectMethods: Required<CheckboxGroupMethods>): void;
}
