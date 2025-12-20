/**
 * 项目设置
 *
 * @author zoulan
 * @since 2023-05-21
 */
import { LAYOUT_MODE_ENUM, THEME_ENUM, TRANSITION_ANIMATION_MODE_ENUM } from '/@/constants/appConstants';
import type { ProjectSetting } from '/@/types/app/config';
/** token header */
export const HEADER_AUTHORIZATION_KEY = 'BuerAuthorization';

/** 密码验证,长度 8-20 位,必须包含大小写字母、数字、符号 */
export const PASSWORD_STRONG_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9\s]).{8,20}$/;
/** 密码验证失败提示 */
export const PASSWORD_ERROR_MESSAGE = '密码需为8-20位,并包含大小写字母、数字和符号';

export const APP_SIDE_BAR_WIDTH = 300;
export const FORM_SETTING = { labelWidth: 200 };
export const PROJECT_SETTING: ProjectSetting = {
  /** 主题 */
  theme: THEME_ENUM.LIGHT,
  themeMode: THEME_ENUM.LIGHT,
  layoutMode: LAYOUT_MODE_ENUM.SIDEBAR_NAV,
  colorMode: '#006be6',
  showLogo: true,
  rounded: 'defaultRounded',
  showWatermark: false,
  openTransitionAnimation: true,
  transitionAnimationMode: TRANSITION_ANIMATION_MODE_ENUM.FADE_SLIDE,
  openTransitionProgress: true,
  openTransitionLoading: true,
  headerSetting: {
    showMultiTabs: true,
    showBreadCrumbIcon: true,
    showBreadCrumb: true,
    headerPrimaryHeight: 50,
    multiTabsHeight: 39
  },
  siderSetting: {
    siderTheme: THEME_ENUM.LIGHT,
    siderMenuWidth: 210,
    siderMenuCollapsedWidth: 60,
    siderPrimaryMenuWidth: 80,
    menuAccordion: true,
    menuCollapsed: false,
    siderCollapsed: false
  }
};

type BuiltinThemeType =
  | 'custom'
  | 'deep-blue'
  | 'deep-green'
  | 'default'
  | 'gray'
  | 'green'
  | 'neutral'
  | 'orange'
  | 'pink'
  | 'red'
  | 'rose'
  | 'sky-blue'
  | 'slate'
  | 'stone'
  | 'violet'
  | 'yellow'
  | 'zinc'
  | (Record<never, never> & string);

/** 主题色类型 */
export interface ColorMode {
  name: string;
  color: string;
  darkPrimaryColor?: string;
  primaryColor?: string;
  type: BuiltinThemeType;
}
/** 主题色 */
export const COLOR_MODE_LIST: ColorMode[] = [
  {
    name: '默认',
    color: '#006be6',
    type: 'default'
  },
  { name: '紫罗兰', color: '#7166f0', type: 'violet' },
  {
    name: '樱花粉',
    color: '#e84a6c',
    type: 'pink'
  },
  {
    name: '柠檬黄',
    color: '#efbd48',
    type: 'yellow'
  },
  {
    name: '天蓝色',
    color: '#4e69fd',
    type: 'sky-blue'
  },
  {
    name: '浅绿色',
    color: '#0bd092',
    type: 'green'
  },
  {
    name: '锌色灰',
    color: '#3f3f46',
    darkPrimaryColor: 'hsl(0 0% 98%)',
    primaryColor: 'hsl(240 5.9% 10%)',
    type: 'zinc'
  },

  {
    name: '深绿色',
    color: '#0d9496',
    type: 'deep-green'
  },

  {
    name: '天蓝色',
    color: '#0960be',
    type: 'deep-blue'
  },
  { name: '橙黄色', color: '#c1420b', type: 'orange' },
  {
    name: '玫瑰红',
    color: '#bb1b1b',
    type: 'rose'
  },

  {
    name: '中性色',
    color: '#404040',
    darkPrimaryColor: 'hsl(0 0% 98%)',
    primaryColor: 'hsl(240 5.9% 10%)',
    type: 'neutral'
  },
  {
    name: '石板灰',
    color: '#344256',
    darkPrimaryColor: 'hsl(0 0% 98%)',
    primaryColor: 'hsl(240 5.9% 10%)',
    type: 'slate'
  },
  {
    name: '中灰色',
    color: '#384252',
    darkPrimaryColor: 'hsl(0 0% 98%)',
    primaryColor: 'hsl(240 5.9% 10%)',
    type: 'gray'
  },
  {
    name: '自定义',
    color: '',
    type: 'custom'
  }
];
/** 布局模式 */
export const LAYOUT_MODE_LIST = [
  { name: '垂直', value: 'sidebarNav', tip: '侧边垂直菜单模式' },
  { name: '双列菜单', value: 'sidebarMixedNav', tip: '垂直双列菜单模式' },
  { name: '水平', value: 'headerNav', tip: '水平菜单模式，菜单全部显示在顶部' },
  { name: '侧边导航', value: 'headerSidebarNav', tip: '顶部通栏，侧边导航模式' },
  { name: '混合垂直', value: 'mixedNav', tip: '垂直水平菜单共存' },
  { name: '混合双列', value: 'headerMixedNav', tip: '双列、水平菜单共存模式' }
  // todo:后续看看是否需要补充该模式
  // { name: '内容全屏', value: 'fullContent', tip: '不显示任何菜单，只显示内容主体' }
];

/** 圆角 */
export const ROUNDED_LIST = [
  { name: '直角', value: 'noneRounded' },
  { name: '小直角', value: 'smallRounded' },
  { name: '默认', value: 'defaultRounded' },
  { name: '大直角', value: 'LargeRounded' },
  { name: '超大', value: 'extraLargeRounded' }
];
