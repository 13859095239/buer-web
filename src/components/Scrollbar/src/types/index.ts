export interface BasicScrollbarProps {
  // 是否X轴滚动
  scrollX?: boolean;
  // 是否Y轴滚动
  scrollY?: boolean;
  // 是否返回顶部按钮
  backTop?: boolean;
  backTopVisibleHeight?: number;
  position?: 'flex' | 'absolute';
  // 最大高度
  maxHeight?: number;
  // 高度
  height?: number;
  // 内间距
  padding?: boolean | string;
  // 是否透明
  transparent?: boolean;
  // 是否圆角
  borderRadius?: boolean | string;
}
