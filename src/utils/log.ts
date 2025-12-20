/**
 * 日志工具类
 *
 * @author zoulan
 * @since 2023-05-22
 */

/**
 * 写入警告日志
 *
 * @param message 日志内容
 */
export function warnLog(message: string) {
  console.warn(`[warn]:${message}`);
}

/**
 * 写入错误日志
 *
 * @param message 日志内容
 */
export function errorLog(message: string) {
  console.error(`[error]:${message}`);
}
