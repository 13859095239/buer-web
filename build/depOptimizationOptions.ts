/**
 * vite.config.ts 文件中的 optimizeDeps 配置
 * 依赖优化器，该优化器仅在开发环境中使用
 *
 * @author zoulan
 * @since 2023-05-27
 */
import type { DepOptimizationOptions } from 'vite';

export function CreateViteDepOptimizationOptions(): DepOptimizationOptions {
  return {
    // 默认情况下，不在 node_modules 中的，链接的包不会被预构建。使用此选项可强制预构建链接的包
    include: ['@iconify/iconify', 'moment/dist/locale/zh-cn', 'moment/dist/locale/eu'],
    // 在预构建中强制排除的依赖项
    exclude: [
      'vue-demi',
      'consolidate',
      // 排除 import { toggleTheme } from "@zougt/vite-plugin-theme-preprocessor/dist/browser-utils"; 在vite的缓存依赖
      '@zougt/vite-plugin-theme-preprocessor/dist/browser-utils'
    ]
  };
}
