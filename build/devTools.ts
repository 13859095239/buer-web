/**
 * vue开发者调试工具，提升vue应用的开发效率和调试能力
 * 启动后自动安装到浏览器中，不需要额外再安装chrome插件
 *
 * @author zoulan
 * @since 2025-04-26
 */
import type { PluginOption } from 'vite';
import vueDevTools from 'vite-plugin-vue-devtools';

export function configDevToolsPlugin(): PluginOption {
  return vueDevTools();
}
