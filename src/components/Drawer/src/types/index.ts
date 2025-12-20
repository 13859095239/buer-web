/**
 * Drawer基础类型定义
 *
 * @author zoulan
 * @since 2023-08-15
 */
import type { DrawerProps } from 'tdesign-vue-next';
import type { Ref } from 'vue';

import type { BasicLoadingProps } from '/@/hooks/web/useLoading';

export type RegisterFn = (props: undefined | BasicDrawerProps) => DrawerMethods;

export interface BasicDrawerProps extends Pick<DrawerProps, 'placement'> {
  // 标题
  title?: string;

  // 小标题
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

  // 宽度
  // 支持'small', 'medium', 'large'，'35px', '30%', '3em' 等。纵向抽屉调整的是抽屉宽度，横向抽屉调整的是抽屉高度
  size?: string;

  // 高度
  height?: number | string;

  // 是否显示全屏按钮
  canFullscreen?: boolean;

  // 是否全屏
  fullscreen?: boolean;

  // 注册事件
  onRegister?: (tableMethods: DrawerMethods) => void;

  // 保存事件
  onSaved?: () => void;

  /** 是否显示保存按钮 */
  saveButton?: boolean;

  // 关闭事件
  onClosed?: () => void;
}

export interface MiniTitle {
  name: string;
  value: string;
}
export interface DrawerMethods {
  show: () => void;
  close: () => void;
  toggleFullScreen: (value: boolean) => void;
  getMaxContentHeight: () => Ref<number>;
  getMaxHeight: () => Ref<number>;
  loading: BasicLoadingProps;
}
export interface DrawerEmit {
  (e: 'update:methods', drawerMethods: Required<DrawerMethods>): void;
}
