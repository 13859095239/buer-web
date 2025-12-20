/**
 * 全局定义
 *
 * @author zoulan
 * @since 2023-05-22
 */
import type { COMPONENT_THEME_ENUM } from '/@/constants/appConstants';

declare global {
  declare interface Window {
    config: any;
  }

  interface Fn<T = any, R = T> {
    (...arg: T[]): R;
  }

  /** 允许为空类型 */
  type Nullable<T> = T | null;

  /** 对象类型 */
  type Recordable<T = any> = Record<string, T>;

  /**
   * 静态数据项类型
   * 通常用于状态等数据
   */
  interface StaticOption {
    /** id值,回发后端用 */
    id: string;
    /** 名称,显示用 */
    name: string;
    /** 枚举名称，用于有赋值需求的静态数据 */
    enum?: string;
    /**
     * 组件主题枚举
     * 当值为空,集成tag组件时,默认为default
     */
    theme?: COMPONENT_THEME_ENUM;
  }
}
