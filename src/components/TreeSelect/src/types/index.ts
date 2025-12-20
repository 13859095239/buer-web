import type { TdTreeSelectProps } from 'tdesign-vue-next';

export type RegisterFn = (props: BasicTreeSelectProps) => TreeSelectMethods;
export interface TreeSelectEmit {
  (e: 'update:methods', tableMethods: Required<TreeSelectMethods>): void;
}

/**
 * BasicTreeSelect 参数
 */
export interface BasicTreeSelectProps {
  /** 定义value/label/disabled/children在data数据中对应的字段别名 */
  keys?: TdTreeSelectProps['keys'];
  /** 是否允许编辑 */
  editable?: boolean;
  /** 是否复选 */
  multiple?: boolean;
  /** 显示清除按钮 */
  allowClear?: boolean;
  /** 显示搜索框 */
  showSearch?: boolean;
  /** 回发后端参数 */
  keyParms?: Recordable;
  /**  获取数据API */
  getApi?: (...arg: any) => Promise<any>;
  /** 是否自动执行 */
  immediate?: boolean;
  /** 是否延迟加载 */
  isLazy?: boolean;
  /** TreeSelect label列配置 */
  labelField?: string;
  /** TreeSelect value列配置 */
  valueField?: string;
  /** TreeSelect children列配置 */
  childrenField?: string;
  /** 注册事件 */
  onRegister?: (treeSelectMethods: TreeSelectMethods) => void;
  /** selectedValue改变事件 */
  onSelectedChange?: (selectItem) => void;
  /** checkedValue改变事件 */
  onCheckedChange?: (selectItem) => void;
}

/**
 * BasicTreeSelect 对外方法
 */
export interface TreeSelectMethods {
  reload: () => Promise<void>;
  getLazyData: (treeNode: LegacyDataNode) => Promise<void>;
  getData: () => Promise<void>;
  getCheckeds: () => string[];
  setCheckeds: (checkedKeys: string[]) => void;
  clearChecked: () => void;
  getExpandeds: () => string[];
  setExpandeds: (expandedKeys: string[]) => void;
  clearExpanded: () => void;
  getSelected: () => string;
  setSelected: (SelectedKey: string) => void;
  clearSelected: () => void;
}
