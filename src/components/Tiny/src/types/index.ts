/**
 * Tiny基础类型定义
 *
 * @author zoulan
 * @since 2023-08-15
 */
export type RegisterFn = (props: BasicTinyProps) => TinyMethods;
export interface BasicTinyProps {
  // 注册事件
  onRegister?: (tinyMethods: TinyMethods) => void;
}
export interface TinyMethods {}
export interface TinyEmit {
  (e: 'update:methods', selectMethods: Required<TinyMethods>): void;
}
