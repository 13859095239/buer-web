/**
 * modal 类型定义
 *
 * @author zoulan
 * @since 2023-08-15
 */
import type { Ref, Slot } from 'vue';

import type { BasicLoadingProps } from '/@/hooks/web/useLoading';

export type RegisterFn = (props: undefined | BasicModalProps) => ModalMethods;

export interface BasicModalProps {
  /** 是否显示Header */
  header?: boolean;

  /** 靠顶位置 */
  top?: number | string;

  /** 标题 */
  title: string;

  /** 小标题 */
  miniTitles?: MiniTitle[];

  /**
   * 宽度
   * number 整数
   * string 百分比
   * small 小尺寸
   * default 中等尺寸
   * large
   */
  width?: number | 'column-1' | 'column-2' | 'column-3' | 'table-1' | 'table-2' | 'larger';

  /** 高度 */
  height?: number | string;

  /** 是否显示全屏按钮 */
  canFullscreen?: boolean;

  /** 是否全屏 */
  fullscreen?: boolean;

  /** 是否显示Footer */
  footer?: boolean | Slot;

  /** 注册事件 */
  onRegister?: (modalMethods: ModalMethods) => void;

  /** 保存事件 */
  onSaved?: () => void;

  /** 是否显示保存按钮 */
  saveButton?: boolean;
  // SavedButtonDisabled:

  /** 关闭事件 */
  onClosed?: () => void;

  /** 是否加载中 */
  loading?: boolean;
}

export interface MiniTitle {
  name: string;
  value: string;
}
export interface ModalMethods {
  /** 弹出modal */
  show: () => void;
  /** 关闭modal */
  close: () => void;
  /** 全屏 */
  toggleFullScreen: (value: boolean) => void;
  getMaxContentHeight: () => Ref<number>;
  getMaxHeight: () => Ref<number>;
  loading: BasicLoadingProps;
}

export interface ModalEmit {
  (e: 'update:methods', modalMethods: Required<ModalMethods>): void;
}
