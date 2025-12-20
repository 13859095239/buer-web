/**
 * 为打包后的文件提供传统浏览器兼容性支持,确保项目能够在不支持最新JavaScript特性的浏览器中正常运行
 * 必须安装 Terser，因为 plugin-legacy 使用 Terser 进行缩小
 *
 * @author zoulan
 * @since 2023-05-27
 */
import legacy from '@vitejs/plugin-legacy';
import type { Plugin } from 'vite';

export function configLegacyPlugin(): Plugin[] {
  return legacy();
}
