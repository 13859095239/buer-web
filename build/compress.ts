/**
 * 发布包的资源文件压缩，提升web应用性能
 *
 * @author zoulan
 * @since 2023-05-27
 */
import type { Plugin } from 'vite';
import { compression } from 'vite-plugin-compression2';

export function configCompressPlugin(): Plugin {
  return compression();
}
