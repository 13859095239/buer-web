/**
 * index.html 模板插件
 * 支持HTML压缩、EJS模版、多页应用、自定义entry、自定义template
 *
 * @author zoulan
 * @since 2023-05-27
 */
import type { PluginOption } from 'vite';
import { createHtmlPlugin } from 'vite-plugin-html';

export function configHtmlPlugin(isBuild: boolean) {
  const htmlPlugin: PluginOption[] = createHtmlPlugin({
    // 是否压缩 html
    minify: isBuild,
    // 模板的相对路径
    template: 'index.html',
    // 注入 HTML 的数据
    inject: {
      data: {}
    }
  });
  return htmlPlugin;
}
