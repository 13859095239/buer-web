/**
 * 表格基础类型定义
 *
 * @author zoulan
 * @since 2023-08-15
 */
import type { CheckboxProps, PrimaryTableCol, PrimaryTableOnEditedContext, TdButtonProps } from 'tdesign-vue-next';
import type { UnwrapNestedRefs } from 'vue';

import type { BasicSearchFormProps, SearchFormMethods } from '/@/components/SearchForm';
import type { BasicLoadingProps } from '/@/hooks/web/useLoading';
import type { DictItemVO } from '/@/types/system/dictItem';
import type { FormatType } from '/@/utils/format';

import type { ActionIconEnum } from '../enums';
import type { ColumnEditor, EditorData } from './editor';

export type RegisterFn = (props: BasicTableProps) => TableMethods;

/** table props */
export interface BasicTableProps {
  /** 行的key */
  rowKey?: string;

  /**  table 方法 */
  methods?: TableMethods;

  /**  标题 */
  title?: string;

  /**  获取数据API */
  getApi?: (...arg: any) => Promise<any>;

  /** 分页 */
  pagination?: 'default' | 'simple' | false;

  /** 是否执行 */
  immediate?: boolean;

  /** 当数据刷新时,自动加载中 */
  autoLoading?: boolean;

  /** 行选择类型 */
  rowSelectionType?: RowSelectionType;

  /**  */
  rowSelectionCheckboxProps?: (record: Recordable) => Partial<Omit<CheckboxProps, 'checked' | 'defaultChecked'>>;

  /** 列 */
  columns?: BasicColumnType[];

  /** 工具栏 */
  toolbar?: BasicToolbar[];

  /** 工具栏 */
  siderToolbar?: BasicToolbar[];

  /** form查询条件 */
  searchFormProps?: SearchFormProps;

  /** form查询是否在toolbar容器中 */
  searchFormLayout?: 'basic' | 'inToolbar';

  /** 表格类型 */
  tableType?: 'basic' | 'tree' | 'treeEdit';

  /**  高度 */
  height?: number;

  /**  是否编辑模式 */
  editor?: boolean;

  /** 表格拖拽排序配置 */
  tableDrag?: TableDrag;

  /**  注册事件 */
  onRegister?: (tableMethods: TableMethods) => void;

  /**  数据改变事件 */
  onDataChange?: (data: Recordable[]) => void;
}
export type ColumnTagColorFn = LiteralUnion<'error' | 'default' | 'success' | 'processing' | 'warning' | 'red'>;

/**
 * 行选择类型
 * single  单选
 * multiple 多选
 * false 无行选择
 */
export type RowSelectionType = 'single' | 'multiple' | false;
/**
 * 列
 */
export interface BasicColumnType extends PrimaryTableCol<any> {
  /** 列类型 */
  columType?: 'basic' | 'dictTag' | 'tag';
  /** 格式转换 */
  format?: FormatType;
  /** 格式转换，键值  */
  formatMap?: UnwrapNestedRefs<Map<any, any>>;
  /** 字典key */
  dictKey?: string;
  /** 字典map */
  dictMap?: UnwrapNestedRefs<Map<string, DictItemVO>>;
  tagColor?: (value: any, row: Recordable) => ColumnTagColorFn;
  /** 列操作 */
  editor?: ColumnEditor;
}

/**
 * 列操作对象
 */
export interface ColumnAction {
  onClick?: (Recordable, number) => void;
  label?: string;
  theme?: 'default' | 'primary' | 'danger' | 'warning' | 'success';
  icon?: ActionIconEnum;
  popConfirm?: string;
  tooltip?: string;
  show?: boolean;
}

/**
 * 工具栏项
 */
export interface ToolbarMenuItem {
  name: string;
  onClick: Fn;
}

/**
 * 工具栏
 */
export interface BasicToolbar {
  /** 工具栏按钮名称 */
  name: string;
  /** 工具栏按钮是否级联选中，没有选择行时显示禁用状态 */
  isRelationSelected?: boolean;
  /** 工具栏按钮图标 */
  icon?: ActionIconEnum;
  /** 工具栏按钮皮肤 */
  theme?: TdButtonProps['theme'];
  /** 工具栏按钮点击事件 */
  onClick: (params: { selectedRowKey: string; selectedRowKeys: string[]; selectedRows: Recordable[] }) => void;
  /** 工具栏下拉项，不为空的时，提供下拉按钮 */
  menuItems?: ToolbarMenuItem[];
}

/**
 * 右侧工具栏
 */
export interface BasicSiderToolbar {
  /** 工具栏按钮名称 */
  name: string;
  icon?: ActionIconEnum;
  /** 工具栏按钮皮肤 */
  theme?: TdButtonProps['theme'];
  /** 工具栏按钮点击事件 */
  onClick: (params: { selectedRowKey: string; selectedRowKeys: string[]; selectedRows: Recordable[] }) => void;
}
/**
 * 对外方法
 */
export interface TableMethods {
  dataSource: Recordable[];

  /** 刷新表格 */
  reload: (params?: Recordable) => Promise<void>;

  /** 获取行数据，通过key */
  findRowDataByKey: (key: string) => Recordable | undefined;

  /**
   * 获取行的key
   * @param record 行数据
   */
  getKeyByRow: (record) => string;

  /** 是否选中 */
  hasSelected: boolean;

  /** 设置选中行  */
  setSelectedKeys: (rowKeys: (string | number)[] | undefined) => void;

  /** 获取选中行keys，数组 */
  getSelectedKeys: () => string[];

  /** 获取选中行keys ，多个以逗号隔开 */
  getSelectedKeysForString: () => string;

  /** 获取选中行 */
  getSelectedRows: () => Recordable[];

  /** 清空选择 */
  clearSelected: () => void;

  /** 获取编辑数据，用于提交后端用 */
  getEditorData: () => EditorData;

  /** 新增新行 */
  addNewRow: (data: Recordable) => void;

  /**
   * 更新单元格数据
   *
   * @param context t-table单元格变动时传入的参数
   */
  updateCellData: (context: PrimaryTableOnEditedContext<any>) => void;

  /** 删除行 */
  deleteRowByKeys: (keys: string | string[]) => void;

  /** 清空编辑数据 */
  clearEditorData: () => void;

  /** 验证编辑，是否不存在未保存的编辑数据 */
  validateEditor: () => boolean;

  /** 清空所有数据，包含查询条件 */
  clearData: () => void;

  /** 获取查询Form的Methods方法对象 */
  getSearchFormMethods?: () => SearchFormMethods;

  /** loading插件对象 */
  loading: BasicLoadingProps;

  /**
   * 插入树表格节点
   *
   * @param key 当前锚定的行key
   * @param row 行数据
   * @param insertTreeNodeType 树表格插入节点类型
   */
  insertTreeNode: (key: string, row: Recordable, insertTreeNodeType: InsertTreeNodeType) => void;

  /**
   * 更新表格节点
   * 只更新当前行的信息，不更新层级关系
   *
   * @param row 行数据
   */
  updateTreeNode: (row: Recordable) => void;

  /**
   * 移除当前节点及其所有子节点
   *
   * @param rowKey 行id
   */
  removeTreeNode: (rowKey) => void;

  /**
   * 移动树表格节点
   *
   * @param key 新的目标父节点
   * @param row 行数据
   */
  moveTreeNode: (targetParentId: string, row: Recordable) => void;
}
/**
 * 查询参数
 */
export interface SearchFormProps extends BasicSearchFormProps {}

export interface TableEmit {
  (e: 'update:methods', tableMethods: Required<TableMethods>): void;
  (e: 'update:modelValue', value?: string | number): void;
  (e: 'update:selected', value?: Recordable): void;
  (e: 'update:selecteds', value?: Recordable): void;
  (e: 'update:label', s: string): void;
}

/**
 * 树表格插入节点类型
 * insertBefore 当前节点之后，新增兄弟节前
 * insertBefore 当前节点之后，新增兄弟节后
 * appendTo 子节点
 * noAnchor 没有锚定树节点id
 *
 */
export type InsertTreeNodeType = 'insertBefore' | 'insertAfter' | 'appendTo' | 'noAnchor';

/** 表格拖拽排序配置 */
export interface TableDrag {
  /** 是否开启拖拽排序 */
  drag: boolean;
  /**
   * 树形结构中，拖拽排序前控制
   * @param sortIds 拖拽排序的同级行keys
   */
  onDrag: (sortIds: string[]) => void;
}
