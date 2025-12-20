import type { TdButtonProps } from 'tdesign-vue-next';

/** 右侧操作按钮 */
export interface Action {
  /** 标题 */
  label?: string;
  /** 主题 */
  theme?: TdButtonProps['theme'];
  /** 提示信息 */
  tooltip?: string;
  /** 是否显示 */
  show?: boolean;
  /** 点击事件 */
  onClick?: Fn;
}

/** 子标题 */
export interface SubTitleTag {
  /** 标题 */
  label?: string;
  /** 主题 */
  color?: 'success' | 'error' | 'warning';
  /** 点击事件 */
  onClick?: Fn;
}
