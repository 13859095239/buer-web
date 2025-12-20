/**
 * 系统配置 api
 *
 * @author zoulan
 * @since 2023-07-29
 */
import { http } from '../../utils/http';

/**
 * 通过id查询配置
 *
 * @param id id
 * @returns  ModelVO
 */
export const getConfigById = (id: string) => {
  return http.get({ url: `system/config/${id}` });
};

/**
 * 分页查询配置
 *
 * @param params 请求参数
 * @returns 系统配置分页对象
 */
export const pageConfig = (params: Recordable) => {
  return http.get<any>({ url: 'system/config/page', params });
};

/**
 * 新增配置
 *
 * @param id id
 * @returns  是否成功
 */
export const saveConfig = (data: Recordable) => {
  return http.post({ url: 'system/config', data });
};

/**
 * 通过id修改配置
 *
 * @param data 请求参数
 * @returns 是否成功
 */
export const updateConfigById = (data: Recordable) => {
  return http.put({ url: 'system/config', data });
};

/**
 * 通过id删除配置
 *
 * @param id id
 * @returns 是否成功
 */
export const removeConfigByIds = (ids: string[]): Promise<boolean> => {
  return http.delete({ url: 'system/config', data: ids });
};

/**
 * 刷新参数缓存
 *
 */
export const refreshCache = (): Promise<boolean> => {
  return http.delete({ url: 'system/config/refreshCache' });
};
