/**
 * oauth终端 api
 *
 * @author zoulan
 * @since 2024-09-07
 */
import { http } from '../../utils/http';

/**
 * 通过id查询oauth终端
 *
 * @param id id
 * @returns
 */
export const getOauthClientById = (id: string) => {
  return http.get<Recordable>({ url: `system/oauth-client/${id}` });
};

/**
 * 分页查询oauth终端
 *
 * @param params 请求参数
 * @returns  分页
 */
export const pageOauthClient = (params: Recordable) => {
  return http.get<any>({ url: 'system/oauth-client/page', params });
};

/**
 * 列表查询oauth终端
 *
 * @param params 请求参数
 * @returns  oauth终端列表
 */
export const listOauthClient = (params: Recordable) => {
  return http.get<any>({ url: 'system/oauth-client/list', params });
};
/**
 * 新增oauth终端
 *
 * @param id id
 * @returns 是否成功
 */
export const saveOauthClient = (data: Recordable) => {
  return http.post({
    url: 'system/oauth-client',
    data
  });
};

/**
 * 通过id修改oauth终端
 *
 * @param data 请求参数
 * @returns 是否成功
 */
export const updateOauthClientById = (data: Recordable) => {
  return http.put({ url: 'system/oauth-client', data });
};

/**
 * 通过id删除oauth终端
 *
 * @param id id
 * @returns 是否成功
 */
export const removeOauthClientByIds = (ids: string[]): Promise<boolean> => {
  return http.delete({ url: 'system/oauth-client', data: ids });
};
