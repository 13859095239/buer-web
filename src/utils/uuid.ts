/**
 * uuid工具类
 *
 * @author zoulan
 * @since 2023-12-10
 */
import { v4 as uuidV4 } from 'uuid';

/**
 * 获取uuid
 * @returns uuid
 */
export function buildUUID(): string {
  const num = uuidV4().replace(/-/g, '');
  return num;
}
