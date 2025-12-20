/**
 * vite.config.ts 文件中的 css 配置
 *
 * @author zoulan
 * @since 2023-05-27
 */
import { resolve } from 'node:path';

import type { CSSOptions } from 'vite';

export function createViteCSSOptions(): CSSOptions {
  return {
    /* 指定传递给CSS预处理器的选项
     * 文件扩展名用作选项的键
     * 每个预处理器支持的选项可以在它们各自的文档中找到
     */
    preprocessorOptions: {
      less: {
        javascriptEnabled: true,
        modifyVars: {
          hack: `true;@import (reference) "${resolve('src/design/variables.less')}";`
        }
      }
    }
  };
}
