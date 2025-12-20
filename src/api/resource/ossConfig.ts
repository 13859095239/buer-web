/**
 * oss配置 API
 *
 * @author zoulan
 * @since 2023-12-03
 */
import { http } from '../../utils/http';

/**
 * 通过id查询
 *
 * @param id id
 * @returns  CategoryVO
 */
export const getOssConfigById = (id: string) => {
  return http.get({ url: `system/oss-config/${id}` });
};

/**
 * 分页查询流程类型
 *
 * @param params 请求参数
 * @returns  分页对象
 */
export const pageOssConfig = (params: Recordable) => {
  return http.get<any>({ url: 'system/oss-config/page', params });
};

/**
 * 新增流程类型
 *
 * @param data 请求参数
 * @returns 是否成功
 */
export const saveOssConfig = (data: Recordable) => {
  return http.post({ url: 'system/oss-config', data });
};

/**
 * 通过id修改流程类型
 *
 * @param data 请求参数
 * @returns 是否成功
 */
export const updateOssConfigById = (data: Recordable) => {
  return http.put({ url: 'system/oss-config', data });
};

/**
 * 通过id删除流程类型
 *
 * @param id id
 * @returns 是否成功
 */
export const removeOssConfigByIds = (ids: string[]): Promise<boolean> => {
  return http.delete({ url: 'system/oss-config', data: ids });
};
