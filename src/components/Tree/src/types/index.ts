/**
 * Tree基础类型定义
 *
 * @author zoulan
 * @since 2023-07-29
 */
import type { TdTreeProps, TreeProps } from 'tdesign-vue-next';

import type { BasicLoadingProps } from '/@/hooks/web/useLoading';

export type RegisterFn = (props: BasicTreeProps) => TreeMethods;

export interface TreeEmit {
  (e: 'update:methods', tableMethods: Required<TreeMethods>): void;
  (e: 'update:selectedValue', value?: string | number): void;
  (e: 'update:selected', value?: Recordable): void;
  (e: 'update:checkedValue', value?: string | number): void;
  (e: 'update:checked', value?: Recordable): void;
}

export interface BasicTreeProps extends Pick<TreeProps, 'checkable'> {
  /** 定义value/label/disabled/children在data数据中对应的字段别名 */
  keys?: TdTreeProps['keys'];

  /** 查询参数 */
  keyParms?: Recordable;

  /**  获取数据API */
  getApi?: (...arg: any) => Promise<any>;

  /** 是否复选 */
  checkable?: boolean;

  /** 是否自动执行 */
  immediate?: boolean;

  /** 当数据刷新时,自动加载中 */
  autoLoading?: boolean;

  /** 是否延迟加载 */
  isLazy?: boolean;

  /**
   * 选中值模式
   * all 表示父节点和子节点全部会出现在选中值里面
   * parentFirst 表示当子节点全部选中时，仅父节点在选中值里面
   * onlyLeaf 表示无论什么情况，选中值仅呈现叶子节点
   */
  valueMode?: TreeProps['valueMode'];

  /**  查询form */
  searchForm?: SearchForm;

  /**  高度 */
  height?: number;

  /**  注册事件 */
  onRegister?: (treeMethods: TreeMethods) => void;

  /**  selectedValue改变事件 */
  onSelectedChange?: (selectItem: string) => void;

  /** checkedValue改变事件 */
  onCheckedChange?: (selectItem) => void;
}

export interface TreeMethods {
  reload: () => Promise<void>;
  /** 加载子数据的方法，在展开节点时调用（仅当节点 children 为 true 时生效） */
  getLazyData: TdTreeProps['load'];
  getData: () => Promise<void>;
  search: (searchValue: string) => void;
  getCheckeds: () => string[];
  setCheckeds: (checkedKeys: string[]) => void;
  clearChecked: () => void;
  getExpandeds: () => string[];
  setExpandeds: (expandedKeys: string[]) => void;
  clearExpanded: () => void;
  getSelected: () => string;
  setSelected: (SelectedKey: string) => void;
  clearSelected: () => void;
  getProps: BasicTreeProps;
  setProps: (props: Partial<BasicTreeProps>) => void;
  loading: BasicLoadingProps;
}

export interface SearchForm {
  name: string;
}
