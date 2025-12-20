/**
 * 转换 工具类
 *
 * @author zoulan
 * @since 2024-09-06
 */
/**
 * 工具函数：将数组对象转换为 Map
 * @param array 数组
 * @param keyField key列
 
 * @returns map
 */
export function arrayToMap<T, K extends keyof T>(array: T[], keyField: K): Map<T[K], T> {
  return new Map(array.map((item) => [item[keyField], item]));
}

/**
 * 将枚举转成 [{ keyField, valueField }] 数组
 * @param enumObj 枚举对象
 *
 * @returns 数组对象
 */
export function enumToList<T extends Record<string, string | number>>(
  enumObj: T,
  keyField: string = 'id',
  valueField: string = 'name'
) {
  return Object.entries(enumObj).map(([key, value]) => ({
    [keyField]: key,
    [valueField]: value
  }));
}
