/**
 * 字典 api
 *
 * @author zoulan
 * @since 2023-07-08
 */
import { http } from '../../utils/http';

/**
 * 通过id查询字典
 *
 * @param id id
 * @returns  ModelVO
 */
export const getDictById = (id: string) => {
  return http.get({ url: `system/dict/${id}` });
};

/**
 * 分页查询字典
 *
 * @param params 请求参数
 * @returns  ModelVO
 */
export const pageDict = (params: Recordable) => {
  return http.get<any>({ url: 'system/dict/page', params });
};

/**
 * 新增字典
 *
 * @param data 请求参数
 
 * @returns  ModelVO
 */
export const saveDict = (data: Recordable) => {
  return http.post({ url: 'system/dict', data });
};

/**
 * 通过id修改字典
 *
 * @param data 请求参数
 * @returns 是否成功
 */
export const updateDictById = (data: Recordable) => {
  return http.put({ url: 'system/dict', data });
};

/**
 * 通过id删除字典
 *
 * @param id id
 * @returns 是否成功
 */
export const removeDictByIds = (ids: string[]) => {
  return http.delete({ url: 'system/dict', data: ids });
};

/**
 * 通过id查询字典项
 *
 * @param id id
 * @returns  ModelVO
 */
export const getDictItemById = (id: string) => {
  return http.get({ url: `system/dict/item/${id}` });
};

/**
 * 分页查询字典项
 *
 * @param params 请求参数
 * @returns  ModelVO
 */
export const pageDictItem = (params: Recordable) => {
  return http.get<any>({ url: 'system/dict/item/page', params });
};

/**
 * 列表查询字典项
 *
 * @param params 请求参数
 * @returns  ModelVO
 */
export const getDictItemListByKey = (key: string) => {
  return http.get<any>({ url: `system/dict/item/list/key/${key}` });
};

/**
 * 列表查询字典项
 *
 * @param params 请求参数
 * @returns  ModelVO
 */
export const getDictItemListByKeys = (keys: string[]) => {
  return http.post<any>({ url: `system/dict/item/list/keys`, data: keys });
};

/**
 * 新增字典项
 *
 * @param data 请求参数
 
 * @returns  ModelVO
 */
export const saveDictItem = (data: Recordable) => {
  return http.post({ url: 'system/dict/item', data });
};

/**
 * 通过id修改字典项
 *
 * @param data 请求参数
 * @returns 是否成功
 */
export const updateDictItemById = (data: Recordable) => {
  return http.put({ url: 'system/dict/item', data });
};

/**
 * 通过id删除字典项
 *
 * @param ids id列表
 * @returns 是否成功
 */
export const removeDictItemByIds = (ids: string[]) => {
  return http.delete({ url: 'system/dict/item', data: ids });
};

/**
 * 刷新字典缓存
 *
 */
export const refreshCache = (): Promise<boolean> => {
  return http.delete({ url: 'system/dict/refreshCache' });
};
