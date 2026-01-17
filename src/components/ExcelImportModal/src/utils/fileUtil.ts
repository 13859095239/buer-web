/**
 * 文件工具函数
 *
 * @author zoulan
 * @since 2024-01-01
 */

/**
 * 格式化文件大小
 * @param bytes 文件大小（字节）
 * @returns 格式化后的文件大小字符串
 */
export function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${Number((bytes / k ** i).toFixed(2))} ${sizes[i]}`;
}

/**
 * 生成异常文件名
 * @param originalFileName 原始文件名
 * @returns 异常文件名
 */
export function generateErrorFileName(originalFileName?: string): string {
  if (originalFileName) {
    return `异常_${originalFileName.replace(/\.(xls|xlsx)$/i, '')}.xlsx`;
  }
  return `异常文件_${new Date().toISOString().slice(0, 10).replace(/-/g, '')}.xlsx`;
}
