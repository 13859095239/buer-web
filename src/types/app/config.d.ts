/**
 * 配置对象定义
 *
 * @author zoulan
 * @since 2023-05-22
 */
import type { LAYOUT_MODE_ENUM, THEME_ENUM, TRANSITION_ANIMATION_MODE_ENUM } from '/@/constants/appConstants';

declare interface ProjectSetting {
  /** 当前主题 */
  theme?: THEME_ENUM;
  /** 主题模式 */
  themeMode?: 'auto' | 'dark' | 'light';
  /** 主题色 */
  colorMode?: string;
  /** 布局模式 */
  layoutMode?: LAYOUT_MODE_ENUM;
  /** 圆角 */
  rounded?: 'noneRounded' | 'smallRounded' | 'defaultRounded' | 'LargeRounded' | 'extraLargeRounded';
  /** 是否显示水印 */
  showWatermark?: boolean;
  /** 是否开启页面切换动画 */
  openTransitionAnimation?: boolean;
  /** 页面切换动画模式 */
  transitionAnimationMode?: TRANSITION_ANIMATION_MODE_ENUM;
  /** 是否开启页面切换进度条 */
  openTransitionProgress?: boolean;
  /** 是否开启页面切换Loading */
  openTransitionLoading?: boolean;
  /** 顶部设置 */
  headerSetting?: HeaderSetting;
  /** 是否显示logo */
  showLogo?: boolean;
  /** 侧边栏设置 */
  siderSetting?: SiderSetting;
  /** 是否内容全屏 */
  contentFullscreen?: boolean;
}
export interface SiderSetting {
  /** 侧边栏主题色 */
  siderTheme?: THEME_ENUM;
  /** 侧边菜单宽度 */
  siderMenuWidth?: number;
  /** 侧边菜单收缩后宽度 */
  siderMenuCollapsedWidth?: number;
  /** 侧边主菜单宽度，用于侧边出现2列的情况 */
  siderPrimaryMenuWidth?: number;
  /** 是否开启菜单手风琴 */
  menuAccordion?: boolean;
  /** 展开/收缩侧边菜单 */
  menuCollapsed?: boolean;
  /** 展开/收缩侧边栏 */
  siderCollapsed?: boolean;
}
export interface HeaderSetting {
  /** 显示/隐藏路由页签 */
  showMultiTabs?: true;
  /** 显示/隐藏路由汉堡包 */
  showBreadCrumb?: boolean;
  /** 显示/隐藏路由汉堡包图标 */
  showBreadCrumbIcon?: boolean;
  /** 顶部主栏高度 */
  headerPrimaryHeight?: number;
  /** 顶部路由页签高度 */
  multiTabsHeight?: number;
  /** 展开/收缩顶部栏 */
  headerCollapsed?: boolean;
}
