/**
 * vite.config.ts 文件中构建选项
 *
 * @author zoulan
 * @since 2023-05-27
 */
import type { BuildOptions } from 'vite';

export function createViteBuild(): BuildOptions {
  return {
    // Vite构建项目压缩格式，esbuild是vite内置的压缩工具
    minify: 'esbuild',
    // 设置最终构建的浏览器兼容目标
    target: 'es2015',
    // 指定输出路径
    outDir: 'dist',
    /**
     * 配置项用于设置触发警告的chunk大小限制‌(Kb)。
     * 当构建过程中生成的chunk大小超过这个限制时，vite会发出警告
     */
    chunkSizeWarningLimit: 2000
  };
}
