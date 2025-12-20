/**
 * Slider type
 *
 * @author zoulan
 * @since 2024-05-08
 */

/**
 * 标签格式自定义 Function
 * @param value 当前选择的值
 * @returns 后缀
 */
export type TipFormatterFunction = (value?: number) => string;

/**
 * Slider 参数
 */
export interface BasicSliderRangeProps {
  /** 最小值 */
  min?: number;
  /** 最大值	 */
  max?: number;
  /**   步长	 */
  step?: number;
  /**  值为 true 时，Slider 为垂直方向 */
  vertical?: boolean;

  /** 标签格式自定义 */
  tipFormatter?: string | TipFormatterFunction | null;

  /** selectedValue改变事件 */
  onSelectedChange?: (selectItem) => void;

  /** 注册事件 */
  onRegister?: (radioMethods: SliderRangeMethods) => void;
}

/**
 * Slider 对外方法
 */
export interface SliderRangeMethods {}
export interface SliderRangeEmit {
  (e: 'update:methods', radioMethods: Required<SliderRangeMethods>): void;
}
