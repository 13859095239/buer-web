/**
 * TabContainer 容器 type
 *
 * @author zoulan
 * @since 2024-05-12
 */

import type { TabPanelProps, TabsProps } from 'tdesign-vue-next';

import type { Action, SubTitleTag } from '../../../types';

export interface TabPaneOption extends TabPanelProps {
  show?: boolean;
  actions?: Action[];
}
/**
 * TabContainer Props 参数
 */
export interface TabContainerProps {
  /** 标题 */
  title?: string;

  /** 副标题 */
  subTitles?: SubTitleTag[];

  /** 标题前面的图标 */
  titleIcon?: 'flow';

  /** 页签位置，可选值有 top right bottom left */
  placement: TabsProps['placement'];

  /** 数据化配置选项内容 */
  options: TabPaneOption[];

  /** 全局按钮,通常用于存放取消按钮 */
  gobalActions?: Action[];

  /** selectedValue改变事件 */
  onChange?: (selectItem) => void;

  /** 注册事件 */
  onRegister?: (radioMethods: TabContainerMethods) => void;
}

/**
 *  TabContainer 对外方法
 */
export interface TabContainerMethods {}
export interface TabContainerEmit {
  (e: 'update:methods', radioMethods: Required<TabContainerMethods>): void;
}
