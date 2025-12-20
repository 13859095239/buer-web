/**
 * 按需自动导入vue组件
 * 内置很多UI组件库的解析器，如AntDesignVue、ElementPlus、NaiveUI等
 *
 * @author zoulan
 * @since 2023-05-27
 */
import { TDesignResolver } from 'unplugin-vue-components/resolvers';
import Components from 'unplugin-vue-components/vite';
import type { Plugin } from 'vite';

export function configUnpluginVueComponentsPlugin(): Plugin | Plugin[] {
  return Components({
    // 允许子目录作为组件的命名空间前缀
    directoryAsNamespace: true,
    // 自定义组件的解析器
    resolvers: [TDesignResolver({ library: 'vue-next' })],
    exclude: [/node_modules\/tdesign-icons-vue-next/]
  });
}
