/**
 * 构建项目所需要的vite插件列表
 *
 * @author zoulan
 * @since 2023-05-27
 */
import unoCSS from '@unocss/vite';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import type { PluginOption } from 'vite';

import { configCompressPlugin } from './compress';
import { configDevToolsPlugin } from './devTools';
import { configHtmlPlugin } from './html';
import { configImageminPlugin } from './imagemin';
import { configInspectorPlugin } from './inspector';
import { configLegacyPlugin } from './legacy';
import { configUnpluginVueComponentsPlugin } from './vueComponents';
/**
 *
 * @param isBuild 是否是生产环境
 * @returns vite插件列表
 */
export function createVitePlugins(isBuild: boolean): (PluginOption | PluginOption[])[] {
  const vitePlugins: (PluginOption | PluginOption[])[] = [
    // 提供Vue单文件组件支持
    vue({}),
    // 提供VueJSX语法
    vueJsx(),
    configDevToolsPlugin(),
    configInspectorPlugin(),
    configUnpluginVueComponentsPlugin(),
    configHtmlPlugin(isBuild),
    // 即时按需原子化CSS引擎
    unoCSS()
  ];
  if (isBuild) {
    vitePlugins.push(configLegacyPlugin());
    vitePlugins.push(configImageminPlugin());
    vitePlugins.push(configCompressPlugin());
  }
  return vitePlugins;
}
