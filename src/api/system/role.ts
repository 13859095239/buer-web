/**
 * 角色 api
 *
 * @author zoulan
 * @since 2023-06-10
 */
import { http } from '../../utils/http';

/**
 * 通过id查询角色
 *
 * @param id id
 * @returns  ModelVO
 */
export const getRoleById = (id: string) => {
  return http.get({ url: `system/role/${id}` });
};

/**
 * 列表查询角色
 *
 * @param params 请求参数
 * @returns  角色列表
 */
export const listRole = (params: Recordable) => {
  return http.get<any>({ url: 'system/role/list', params });
};

/**
 * 分页查询角色
 *
 * @param params 请求参数
 * @returns 角色分页对象
 */
export const pageRole = (params: Recordable) => {
  return http.get<any>({ url: 'system/role/page', params });
};

/**
 * 新增角色
 *
 * @param id id
 * @returns 是否成功
 */
export const saveRole = (data: Recordable) => {
  return http.post({ url: 'system/role', data });
};

/**
 * 通过id修改角色
 *
 * @param data 请求参数
 * @returns 是否成功
 */
export const updateRoleById = (data: Recordable) => {
  return http.put({ url: 'system/role', data });
};

/**
 * 通过id删除角色
 *
 * @param id id
 * @returns 是否成功
 */
export const removeRoleByIds = (ids: string[]): Promise<boolean> => {
  return http.delete({ url: 'system/role', data: ids });
};

/**
 * 通过roleId查询菜单列表
 *
 * @param id id
 * @returns  菜单列表
 */
export const getMenusByRoleId = (id: string, { transform }) => {
  return http.get<any>({ url: `system/role/menu/list/${id}`, transform });
};

/**
 * 更新角色菜单
 *
 * @param params 请求参数
 * @returns  是否成功
 */
export const saveMenusByRole = (params: Recordable) => {
  return http.put({
    url: 'system/role/menu',
    params
  });
};

/**
 * 更新角色用户
 *
 * @param data 请求参数
 
 * @returns  是否成功
 */
export const addRoleUser = (data: Recordable) => {
  return http.post({ url: 'system/role/user', data });
};

/**
 * 分页查询角色下的用户
 *
 * @param params 请求参数
 * @returns 用户列表
 */
export const getUserPageByRole = (params: Recordable) => {
  return http.get<any>({
    url: 'system/role/user/page',
    params
  });
};

/**
 * 删除团队下的用户
 *
 * @param params 请求参数
 * @returns 是否成功
 */
export const deleteRoleUserById = (roleId: string, userIds: string) => {
  return http.delete<any>({ url: `system/role/user`, params: { roleId, userIds } });
};
