/**
 * 一个 vite 插件，提供点击浏览器元素自动跳转到本地 IDE 的功能
 * 启动后自动安装到浏览器中，不需要额外再安装chrome插件
 *
 * @author zoulan
 * @since 2025-04-26
 */
import type { PluginOption } from 'vite';
import inspector from 'vite-plugin-vue-inspector';

export function configInspectorPlugin(): PluginOption {
  return inspector({
    // vue3版本
    vue: 3
  });
}
