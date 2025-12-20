/**
 * unocss定义类
 * 定义方式参考官方
 *
 * @author zoulan
 * @since 2025-05-22
 */
import type { AttributifyAttributes } from '@unocss/preset-attributify';
/**
 *
 * shims.d.ts文件，包括@unocss/preset-uno中的常见属性
 * 解决unocss使用windicss的attributify mode时提示属性不存在
 * 详情见https://www.unocss.cn/presets/attributify
 */
declare module '@vue/runtime-dom' {
  interface HTMLAttributes extends AttributifyAttributes {}
}
