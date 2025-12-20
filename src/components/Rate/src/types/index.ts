/**
 * Rate type
 *
 * @author zoulan
 * @since 2024-05-08
 */

/**
 * Rate 参数
 */
export interface BasicRateProps {
  /** 是否允许半选 */
  allowHalf?: boolean;
  /** star 总数 */
  count?: number;
  /** 自定义每项的提示信息 */
  tooltips?: string[];
  /** selectedValue改变事件 */
  onSelectedChange?: (selectItem) => void;
  /** 注册事件 */
  onRegister?: (radioMethods: RateMethods) => void;
}

/**
 * Rate 对外方法
 */
export interface RateMethods {}
export interface RateEmit {
  (e: 'update:methods', radioMethods: Required<RateMethods>): void;
}
