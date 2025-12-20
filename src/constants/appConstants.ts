/**
 * 应用程序 枚举
 *
 * @author zoulan
 * @since 2025-09-23
 */

/** 系统主题枚举 */
export enum THEME_ENUM {
  DARK = 'dark',
  LIGHT = 'light'
}

/** 布局模式枚举 */
export enum LAYOUT_MODE_ENUM {
  /** 垂直 */
  SIDEBAR_NAV = 'sidebarNav',
  /** 双列菜单 */
  SIDEBAR_MIXED_NAV = 'sidebarMixedNav',
  /** 水平 */
  HEADER_NAV = 'headerNav',
  /** 侧边导航 */
  HEADER_Sidebar_NAV = 'headerSidebarNav',
  /** 混合双列 */
  HEADER_MIXED_NAV = 'headerMixedNav',
  /** 混合垂直 */
  MIXED_NAV = 'mixedNav',
  /** 内容全屏 */
  FULL_CONTENT = 'fullContent'
}

/**
 * 页面切换动画
 */
export enum TRANSITION_ANIMATION_MODE_ENUM {
  FADE = 'fade',
  FADE_DOWN = 'fade-down',
  FADE_SLIDE = 'fade-slide',
  FADE_UP = 'fade-up'
}

/**
 * 特殊页面地址枚举
 */
export enum PAGE_URL_ENUM {
  // basic login path
  ROOT_PAGE = '/',
  BASE_LOGIN = '/login',
  // basic home path
  BASE_HOME = '/dashboard',
  // error page path
  ERROR_PAGE = '/exception',
  // error log page path
  ERROR_LOG_PAGE = '/error-log/list'
}

/**
 * 空间尺寸枚举
 */
export enum COMPONENT_SIZE_ENUM {
  DEFAULT = 'default',
  SMALL = 'small',
  LARGE = 'large'
}

/**
 * 组件主题枚举
 */
export enum COMPONENT_THEME_ENUM {
  DEFAULT = 'default',
  PRIMARY = 'primary',
  WARNING = 'warning',
  DANGER = 'danger',
  SUCCESS = 'success'
}

/** 组件主题列表 */
export const COMPONENT_THEME_LIST: StaticOption[] = [
  {
    id: COMPONENT_THEME_ENUM.DEFAULT,
    name: '是',
    theme: COMPONENT_THEME_ENUM.DEFAULT
  },
  {
    id: COMPONENT_THEME_ENUM.PRIMARY,
    name: '否',
    theme: COMPONENT_THEME_ENUM.PRIMARY
  },
  {
    id: COMPONENT_THEME_ENUM.SUCCESS,
    name: '否',
    theme: COMPONENT_THEME_ENUM.SUCCESS
  },
  {
    id: COMPONENT_THEME_ENUM.WARNING,
    name: '否',
    theme: COMPONENT_THEME_ENUM.WARNING
  },
  {
    id: COMPONENT_THEME_ENUM.DANGER,
    name: '否',
    theme: COMPONENT_THEME_ENUM.DANGER
  }
];
