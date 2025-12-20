export interface BasicRadioProps {
  /** 获取数据API */
  getApi?: (...arg: any) => Promise<any>;

  /** 本地数据，设置后getApi失效 */
  options?: Recordable[];

  /** 模式 */
  mode?: 'multiple' | 'tags' | 'SECRET_COMBOBOX_MODE_DO_NOT_USE';

  /** label字段 */
  labelField?: string;

  /** value字段 */
  valueField?: string;

  /** 输入提示 */
  placeholder?: string;

  /** 是否自动执行 */
  immediate?: boolean;

  /** selectedValue改变事件 */
  onSelectedChange?: (selectItem) => void;

  /** 注册事件 */
  onRegister?: (radioMethods: RadioMethods) => void;
}
export interface RadioMethods {
  /**  获取选中项 */
  getSelected: () => Recordable | undefined;
  /**  获取选中项的值 */
  getSelectedValue: () => string | undefined;
  /** 设置选中项 */
  setSelected: (SelectedKey: string) => void;
  /** 清空选中项 */
  clearSelected: () => void;
}
export interface RadioEmit {
  (e: 'update:methods', radioMethods: Required<RadioMethods>): void;
}
