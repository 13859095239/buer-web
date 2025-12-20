/**
 * 文件 api
 *
 * @author zoulan
 * @since 2023-07-29
 */
import { http } from '../../utils/http';

/**
 * 通过id查询文件
 *
 * @param id id
 * @returns  Oss
 */
export const getOssById = (id: string) => {
  return http.get({ url: `resource/oss/${id}` });
};

/**
 * 分页查询文件
 *
 * @param params 请求参数
 * @returns  Oss分页
 */
export const pageOss = (params: Recordable) => {
  return http.get<any>({ url: 'resource/oss/page', params });
};

/**
 * 列表查询文件
 *
 * @param params 请求参数
 * @returns
 */
export const listOss = (params: Recordable) => {
  return http.get<Recordable[]>({ url: 'resource/oss/list', params });
};

/**
 * 新增文件
 *
 * @param id id
 * @returns 是否成功
 */
export const addOss = (data: Recordable) => {
  return http.post({ url: 'resource/oss', data });
};

/**
 * 通过id修改文件
 *
 * @param data 请求参数
 * @returns 是否成功
 */
export const updateOssById = (data: Recordable) => {
  return http.put({ url: 'resource/oss', data });
};

/**
 * 通过id删除文件
 *
 * @param id id
 * @returns 是否成功
 */
export const removeOssByIds = (id: string): Promise<boolean> => {
  return http.delete({ url: `resource/oss/${id}` });
};
