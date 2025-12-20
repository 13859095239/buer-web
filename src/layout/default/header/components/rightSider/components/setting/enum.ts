/** 修改配置事件枚举 */
export enum HandlerEnum {
  /** 改变路由汉堡包显示/隐藏 */
  CHANGE_SHOW_BREADCRUMB,
  /** 改变路由汉堡包图标显示/隐藏 */
  CHANGE_SHOW_BREADCRUMB_ICON,
  /** 改变显示路由页签显示/隐藏 */
  CHANGE_SHOW_MULTI_TABS,
  /** 改变菜单宽度 */
  CHANGE_MENU_WIDTH,
  /** 改变手风琴展开模式 */
  CHANGE_MENU_ACCORDION,
  /** 改变菜单展开/收缩 */
  CHANGE_MENU_COLLAPSED,
  /** 改变侧边栏显示/隐藏 */
  CHANGE_SIDER_COLLAPSED,
  /** 改变主题 */
  CHANGE_THEME_MODE,
  /** 改变主题色 */
  CHANGE_COLOR_MODE,
  /** 改变布局 */
  CHANGE_LAYOUT_MODE,
  /** 改变侧边栏主题 */
  CHANGE_SIDER_THEME,
  /** 改变圆角 */
  CHANGE_ROUNDED,
  /** 改变水印显示/隐藏 */
  CHANGE_SHOW_WATERMARK,
  /** 改变开启页面切换动画模式 */
  CHANGE_OPEN_TRANSITION_ANIMATION,
  /** 改变页面切换动画模式 */
  CHANGE_TRANSITION_ANIMATION_MODE,
  /** 改变开启页面切换进度条 */
  CHANGE_OPEN_TRANSITION_PROGRESS,
  /** 改变开启页面切换Loading */
  CHANGE_OPEN_TRANSITION_LOADING
}
