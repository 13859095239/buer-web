/**
 * 团队 api
 *
 * @author zoulan
 * @since 2024-05-30
 */
import { http } from '../../utils/http';

/**
 * 通过id查询团队
 *
 * @param id id
 * @returns team
 */
export const getTeamById = (id: string) => {
  return http.get({ url: `system/team/${id}` });
};

/**
 * 列表查询团队
 *
 * @param params 请求参数
 * @returns  团队列表
 */
export const listTeam = (params: Recordable) => {
  return http.get<any>({ url: 'system/team/list', params });
};

/**
 * 分页查询团队
 *
 * @param params 请求参数
 * @returns team分页
 */
export const pageTeam = (params: Recordable) => {
  return http.get<any>({ url: 'system/team/page', params });
};

/**
 * 新增团队
 *
 * @param id id
 * @returns 是否成功
 */
export const addTeam = (data: Recordable) => {
  return http.post({ url: 'system/team', data });
};

/**
 * 通过id修改团队
 *
 * @param data 请求参数
 * @returns 是否成功
 */
export const updateTeamById = (data: Recordable) => {
  return http.put({ url: 'system/team', data });
};

/**
 * 通过id删除团队
 *
 * @param id id
 * @returns 是否成功
 */
export const removeTeamByIds = (ids: string[]): Promise<boolean> => {
  return http.delete({ url: 'system/team', data: ids });
};

/**
 * 更新团队用户
 *
 * @param data 请求参数
 
 * @returns  是否成功
 */
export const addTeamUser = (data: Recordable) => {
  return http.post({ url: 'system/team/user', data });
};

/**
 * 分页查询团队下的用户
 *
 * @param params 请求参数
 * @returns 用户列表
 */
export const getUserPageByTeam = (params: Recordable) => {
  return http.get<any>({ url: 'system/team/user/page', params });
};

/**
 * 删除团队下的用户
 *
 * @param params 请求参数
 * @returns 是否成功
 */
export const deleteTeamUserById = (taamId: string, userIds: string[]) => {
  const params = { taamId, userIds };
  return http.delete<any>({ url: `system/team/user`, params });
};
