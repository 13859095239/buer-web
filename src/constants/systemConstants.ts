/**
 * 系统静态数据
 *
 * @author zoulan
 * @since 2025-09-23
 */

import { COMPONENT_THEME_ENUM } from './appConstants';

/** 通用状态枚举 */
export enum STATUS_ENUM {
  /** 启用 */
  ENABLE = '0',
  /** 停用 */
  DISABLE = '1'
}

/** 锁定状态枚举 */
export enum LOCK_FLAG_ENUM {
  /** 启用 */
  ENABLE = '0',
  /** 停用 */
  DISABLE = '1'
}

/** 锁定状态列表 */
export const LOCK_FLAG_LIST: StaticOption[] = [
  {
    id: LOCK_FLAG_ENUM.ENABLE,
    name: '启用',
    theme: COMPONENT_THEME_ENUM.PRIMARY
  },
  {
    id: LOCK_FLAG_ENUM.DISABLE,
    name: '停用',
    theme: COMPONENT_THEME_ENUM.DANGER
  }
];

/** 是否枚举 */
export enum IS_ENUM {
  /** 是 */
  TRUE = '1',
  /** 否 */
  FALSE = '0'
}

/** 是否列表 */
export const IS_LIST: StaticOption[] = [
  {
    id: IS_ENUM.TRUE,
    name: '是',
    theme: COMPONENT_THEME_ENUM.PRIMARY
  },
  {
    id: IS_ENUM.FALSE,
    name: '否',
    theme: COMPONENT_THEME_ENUM.DANGER
  }
];

/** 菜单类型枚举 */
export enum MENU_TYPE_ENUM {
  /** 目录 */
  PATH = '0',
  /** 菜单 */
  MENU = '1',
  /** 权限 */
  PERMISSION = '2'
}

/** 菜单类型列表 */
export const MENU_TYPE_LIST: StaticOption[] = [
  {
    id: MENU_TYPE_ENUM.PATH,
    name: '目录',
    theme: COMPONENT_THEME_ENUM.PRIMARY
  },
  {
    id: MENU_TYPE_ENUM.MENU,
    name: '菜单',
    theme: COMPONENT_THEME_ENUM.WARNING
  },
  {
    id: MENU_TYPE_ENUM.PERMISSION,
    name: '权限',
    theme: COMPONENT_THEME_ENUM.DEFAULT
  }
];

/** 性别枚举 */
export enum GENDER_ENUM {
  /** 男 */
  MAN = '0',
  /** 女 */
  WOMAN = '1'
}

/** 性别列表 */
export const GENDER_LIST: StaticOption[] = [
  {
    id: GENDER_ENUM.MAN,
    name: '男',
    theme: COMPONENT_THEME_ENUM.PRIMARY
  },
  {
    id: GENDER_ENUM.WOMAN,
    name: '女',
    theme: COMPONENT_THEME_ENUM.DANGER
  }
];
