/**
 * template 工具类
 *
 * @author zoulan
 * @since 2024-06-15
 */
import { toValue } from 'vue';
/**
 * 等待传入的templateRef参数加载完成，然后返回该参数。
 * @param templateRef 要等待加载的参数。
 * @returns 一个 Promise 对象，该对象解析为传入的 `templateRef` 参数。
 */
export function waitObject<T>(templateRef: T): Promise<T> {
  return new Promise((resolve) => {
    const checkInsertRefLoaded = setInterval(() => {
      if (toValue(templateRef)) {
        clearInterval(checkInsertRefLoaded);
        resolve(templateRef);
      }
    }, 100);
  });
}
