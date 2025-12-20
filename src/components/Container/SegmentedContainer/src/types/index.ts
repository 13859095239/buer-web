/**
 * segmented 容器 type
 *
 * @author zoulan
 * @since 2024-05-12
 */
import type { RadioOptionObj } from 'tdesign-vue-next';

import type { Action, SubTitleTag } from '../../..';
/**
 * 选项
 */
export interface BasicSegmentedOption extends RadioOptionObj {
  actions?: Action[];
}

/**
 * SegmentedContainer 参数
 */
export interface SegmentedContainerProps {
  /** 数据化配置选项内容 */
  options: BasicSegmentedOption[];

  /** 标题 */
  title?: string;

  /** 副标题 */
  subTitles?: SubTitleTag[];

  /** 标题前面的图标 */
  titleIcon?: string;

  /** 全局按钮 */
  gobalActions?: Action[];

  /** selectedValue改变事件 */
  onChange?: (selectItem) => void;

  /** 注册事件 */
  onRegister?: (radioMethods: SegmentedContainerMethods) => void;
}

/**
 * SegmentedContainer 对外方法
 */
export interface SegmentedContainerMethods {}
export interface SegmentedContainerEmit {
  (e: 'update:methods', radioMethods: Required<SegmentedContainerMethods>): void;
}
