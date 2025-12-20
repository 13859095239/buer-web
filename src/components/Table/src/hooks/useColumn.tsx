/**
 * 表格列相关的 hooks
 * 用来生成各类型的列
 *
 * @author zoulan
 * @since 2025-07-09
 */
import { isFunction, isString } from 'lodash-es';
import type { PrimaryTableCellParams, TdTagProps } from 'tdesign-vue-next';
import { Link, Popconfirm, Tag } from 'tdesign-vue-next';
import type { Reactive } from 'vue';
import { computed, toValue } from 'vue';

import { BasicDictTag } from '/@/components/Dict';
import type { DictItemVO } from '/@/types/system/dictItem';
import type { FormatType } from '/@/utils/format';
import { format } from '/@/utils/format';
import { isBlank, isEmpty } from '/@/utils/is';
import { arrayToMap } from '/@/utils/to';

import { ActionIconEnum } from '../enums';
import type { ColumnAction } from '../types';
import { useEditClass } from './useEditorComponents';

/**
 * 生成单元格操作列
 * 如：编辑、删除、查看等
 * @param cell table cell传进来的数据
 * @param columnActions 列操作对象数组
 * @returns h
 */
export function useTableActionsColumn(cell: PrimaryTableCellParams<Recordable>, columnActions: Array<ColumnAction>) {
  /** 触发按钮点击 */
  const handleClick = (columnAction: ColumnAction) => {
    columnAction.onClick?.(toValue(cell.row), toValue(cell.rowIndex));
  };
  // 操作按钮
  const LinkItem = (props: { columnAction: ColumnAction }) => {
    const { columnAction } = props;
    return (
      <Link
        onClick={() => handleClick(columnAction)}
        theme={columnAction.theme || 'primary'}
      >
        {columnAction.icon ? <LinkIcon actionIconEnum={columnAction.icon} /> : null}
        {columnAction.label}
      </Link>
    );
  };
  // 操作按钮左侧图标
  const LinkIcon = (props: any) => {
    const { actionIconEnum } = props;
    switch (actionIconEnum) {
      case ActionIconEnum.ADD:
        return <div class="i-tdesign:add" />;
      case ActionIconEnum.EDIT:
        return <div class="i-tdesign:edit" />;
      case ActionIconEnum.VIEW:
        return <div class="i-tdesign:file" />;
      case ActionIconEnum.DELETE:
        return <div class="i-tdesign:delete" />;
      case ActionIconEnum.COPY:
        return <div class="i-tdesign:copy" />;
      case ActionIconEnum.REDO:
        return <div class="i-tdesign:rollback" />;
      case ActionIconEnum.SETTING:
        return <div class="i-tdesign:setting" />;
      default:
        return null;
    }
  };
  // 返回操作按钮列
  return columnActions
    ?.filter((columnAction) => columnAction.show !== false)
    .map((columnAction, index) => (
      <>
        {columnAction.popConfirm ? (
          <Popconfirm
            key={index}
            content={`此操作将${columnAction.popConfirm}, 是否继续?`}
            confirmBtn="确定"
            cancelBtn="取消"
            onConfirm={() => handleClick(columnAction)}
          >
            <LinkItem columnAction={columnAction} />
          </Popconfirm>
        ) : (
          <LinkItem columnAction={columnAction} />
        )}
        <span className="pr-12px"></span>
      </>
    ));
}

/**
 * 生成单元格-Tag列
 * 醒目显示
 * @param cell table cell传进来的数据
 * @param theme tag皮肤,支持自定义方法返回theme
 * @param icon 图标,false不显示,true为显示,支持自定义方法返回icon
 *
 * @returns h
 */
export function useTableTagColumn(
  cell: PrimaryTableCellParams<Recordable>,
  theme: TdTagProps['theme'] | ((cellValue: string) => TdTagProps['theme']),
  icon?: boolean | string | ((cellValue: string) => string)
) {
  // 单元格值
  const cellValue = cell.row[cell.col.colKey!];
  // 皮肤名称
  let themeName: TdTagProps['theme'] = theme as TdTagProps['theme'];
  if (isFunction(theme)) {
    themeName = theme(cellValue);
  }
  let iconClass = '';
  if (isFunction(icon)) {
    // 方法
    iconClass = icon(cellValue);
  } else if (isString(icon)) {
    // 外部提供图标类
    iconClass = icon;
  } else if (icon === true) {
    // 默认图标
    switch (themeName) {
      case 'success':
        iconClass = 'i-tdesign:check-circle-filled';
        break;
      case 'default':
        iconClass = 'i-tdesign:notification-circle-filled';
        break;
      case 'danger':
        iconClass = 'i-tdesign:close-circle-filled';
        break;
      case 'primary':
        iconClass = 'i-tdesign:lightbulb-circle-filled';
        break;
      case 'warning':
        iconClass = 'i-tdesign:error-circle-filled';
        break;
      default:
        iconClass = 'i-tdesign:notification-circle-filled';
    }
  }
  // 图标
  const IconNode = !isEmpty(iconClass) ? <div class={iconClass} /> : undefined;
  return (
    <Tag
      theme={themeName}
      icon={IconNode}
    >
      {cellValue}
    </Tag>
  );
}

/**
 * 生成单元格-字典列
 * 根据字典值,自动转换成字典名称
 * @param cell table cell传进来的数据
 * @param dictKey 字典key
 * @param dictMap 多个字典集的map
 *
 * @returns h
 */
export function useTableDictColumn(
  cell: PrimaryTableCellParams<Recordable>,
  dictKey: string,
  dictMap: Reactive<Map<string, DictItemVO>>
) {
  // 单元格值
  const cellValue = cell.row[cell.col.colKey!];
  return (
    <BasicDictTag
      dictValue={cellValue}
      dictKey={dictKey}
      dictMap={dictMap}
    />
  );
}

/**
 * 生成单元格-静态数据列
 * 将表格内容的id转名称
 * 如：状态等
 * @param cell table cell传进来的数据
 * @param staticOptionList 静态数据列表
 * @returns h
 */
export function useTableStaticOptionColumn(
  cell: PrimaryTableCellParams<Recordable>,
  staticOptionList: StaticOption[],
  cellType?: 'tag'
) {
  // 列值
  const colValue = cell.row[cell.col.colKey!];
  // 按 id 转 Map
  const staticDataMap = arrayToMap(staticOptionList, 'id');
  const staticData = staticDataMap?.get(colValue);
  if (isBlank(staticData)) {
    return <div></div>;
  }
  switch (cellType) {
    case 'tag':
      return <Tag theme={staticData?.theme || 'default'}>{staticData?.name}</Tag>;
    default:
      return <div>{staticData?.name}</div>;
  }
}

/**
 * 生成单元格-formatMap格式列
 * 将表格内容的id转名称
 * 如：用户名称、部门等,
 * @param cell table cell传进来的数据
 * @param formatMap 键值map,根据map数据转换
 * @returns h
 */
export function useTableFormatMapColumn(
  cell: PrimaryTableCellParams<Recordable>,
  formatMap: Reactive<Map<string, string>>,
  cellType?: 'tag'
) {
  // 列值
  const cellValue = cell.row[cell.col.colKey!];
  const cellFormatedValue = computed(() => {
    return formatMap?.get(cellValue);
  });
  switch (cellType) {
    case 'tag':
      return <Tag>{cellFormatedValue.value}</Tag>;
    default:
      return <div>{cellFormatedValue.value}</div>;
  }
}

/**
 * 生成表格组件的自带的FormatType格式转换列
 * 如：是否、状态、时间转换等系统常用的可以封装在这里
 * @param cell table cell传进来的数据
 * @param formatType 格式转换类型
 * @param cellType 列展示类型
 *
 * @returns h
 */
export function useTableFormatColumn(
  cell: PrimaryTableCellParams<Recordable>,
  formatType: FormatType,
  cellType?: 'tag'
) {
  // 列值
  const cellValue = cell.row[cell.col.colKey!];
  // 列值转换
  const cellFormatedValue = computed(() => {
    return format(cellValue, formatType);
  });
  const { cellClass } = useEditClass(cell);
  switch (cellType) {
    case 'tag':
      return <Tag class={cellClass.value}>{cellFormatedValue.value}</Tag>;
    default:
      return <div class={cellClass.value}>{cellFormatedValue.value}</div>;
  }
}

/**
 * 生成表格组件带icon列
 * 如：是否、状态、时间转换
 * @param cell table cell传进来的数据
 * @param iconClass 格式转换类型
 * @param content 内容,underfind 时读取colKey列的值
 * @returns h
 */
export function useTableIconColumn(cell: PrimaryTableCellParams<Recordable>, iconClass: string, content?: string) {
  // 列值
  const cellValue = cell.row[cell.col.colKey!];
  const { cellClass } = useEditClass(cell);
  return (
    <span class={cellClass.value}>
      {iconClass && <span class={['mr-1', iconClass]}></span>}
      <span> {content !== undefined ? content : cellValue}</span>
    </span>
  );
}
