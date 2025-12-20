import type { SelectProps, TdSelectProps } from 'tdesign-vue-next';

/** 注册函数类型 */
export type RegisterFn = (props: BasicSelectProps) => SelectMethods;

/** 数据源类型 */
export type DataSource = 'api' | 'local';

/** 搜索类型 */
export type SearchType = 'filter' | 'search';

/** API 函数类型 */
export type ApiFunction = (...args: any[]) => Promise<Recordable[]>;

/** 选择器属性接口 */
export interface BasicSelectProps {
  /** 定义 value/label/disabled/children 在 data 数据中对应的字段别名 */
  keys?: TdSelectProps['keys'];

  /** 是否允许编辑 */
  editable?: boolean;

  /** 是否多选 */
  multiple?: boolean;

  /** 是否启用拖拽排序（仅多选时有效） */
  drag?: boolean;

  /** 获取数据 API 函数 */
  getApi?: ApiFunction;

  /** 本地数据，设置后 getApi 失效 */
  options?: Recordable[];

  /** 查询类型：filter-已有数据筛选，search-异步读取 */
  searchType?: SearchType;

  /** 搜索方法（异步读取时使用） */
  searchMethon?: SelectProps['onSearch'];

  /** 过滤方法（本地筛选时使用） */
  filterMethon?: SelectProps['filter'];

  /** 是否立即加载数据 */
  immediate?: boolean;

  /** 输入提示文本 */
  placeholder?: string;

  /** 注册方法回调 */
  onRegister?: (selectMethods: SelectMethods) => void;

  /** 选中值改变事件 */
  onSelectedChange?: (selectItem: Recordable | Recordable[] | undefined) => void;
}
/** 选择器方法接口 */
export interface SelectMethods {
  /**
   * 获取选择项（单选）
   * @returns 选中的单个选项对象
   */
  getSelected: () => Recordable | undefined;

  /**
   * 获取选择项列表（多选）
   * @returns 选中的选项对象数组
   */
  getSelectedList: () => Recordable[];

  /**
   * 获取选择值
   * @returns 选择值，多选时以逗号分隔
   */
  getSelectedValue: () => string | undefined;

  /**
   * 设置选中项
   * @param selectedKey 选中项的 key，多选时可用逗号分隔或数组
   */
  setSelected: (selectedKey?: string | string[]) => void;

  /** 清空所有选中项 */
  clearSelected: () => void;

  /**
   * 刷新数据
   * @param params 请求参数
   * @returns Promise<void>
   */
  reload: (params?: Recordable) => Promise<void>;
}

/** 选择器事件接口 */
export interface SelectEmit {
  /** 更新方法事件 */
  (e: 'update:methods', selectMethods: Required<SelectMethods>): void;
}

/** 标签项接口 */
export interface TagItem {
  /** 标签值 */
  value: string;
  /** 标签文本 */
  label: string;
}
