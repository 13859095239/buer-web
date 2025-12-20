/**
 * 用户 api
 *
 * @author zoulan
 * @since 2023-06-10
 */
import type { UserInfoModel } from '../../types/system/user';
import { http } from '../../utils/http';

/**
 * 通过id查询用户
 *
 * @param id id
 * @returns 用户对象
 */
export const getUserById = (id: string) => {
  return http.get({ url: `system/user/${id}` });
};
/**
 * 分页查询用户
 *
 * @param params 请求参数
 * @returns
 */
export const pageUser = (params: Recordable) => {
  return http.get<any>({ url: 'system/user/page', params });
};

/**
 * 列表查询用户
 *
 * @param params 请求参数
 * @returns
 */
export const listUser = (params: Recordable) => {
  return http.get<any>({ url: 'system/user/list', params });
};
/**
 * 新增用户
 *
 * @param data 请求参数
 * @returns 是否成功
 */
export const saveUser = (data: Recordable) => {
  return http.post({ url: 'system/user', data });
};

/**
 * 通过id修改用户
 *
 * @param data 请求参数
 * @returns 是否成功
 */
export const updateUserById = (data: Recordable) => {
  return http.put({ url: 'system/user', data });
};
/** xiug */
export const updateMyUser = (data: Recordable) => {
  return http.put({ url: 'system/user/my', data });
};

/**
 * 通过id删除用户
 *
 * @param id id
 * @returns 是否成功
 */
export const removeUserByIds = (ids: string[]): Promise<boolean> => {
  return http.delete({ url: 'system/user', data: ids });
};

/**
 * 获取当前用户信息
 *
 * @returns 用户对象
 */
export const getMyUserInfo = () => {
  return http.get<UserInfoModel>({ url: 'system/user/my/userInfo' });
};

/**
 * 获取当前用户信息
 *
 * @returns 用户对象
 */
export const getMyUser = () => {
  return http.get<UserInfoModel>({ url: `system/user/my/user` });
};

/**
 * 修改当前用户信息
 *
 * @param data 请求参数
 * @returns 是否成功
 */
export const updateMyUserInfo = (data: Recordable) => {
  return http.put({ url: 'system/user/my/userInfo', data });
};

/**
 * 重置密码
 *
 * @param id id
 * @param newPassword 新密码
 * @returns 是否成功
 */
export const resetMyPassword = (oldPassword: string, newPassword: string, confirmPassword: string) => {
  return http.put({ url: 'system/user/my/resetPassword', data: { oldPassword, newPassword, confirmPassword } });
};
/**
 * 重置密码
 *
 * @param id id
 * @param newPassword 新密码
 * @returns 是否成功
 */
export const resetPassword = (id: string, newPassword: string) => {
  return http.put({ url: 'system/user/resetPassword', data: { id, newPassword } });
};

/**
 * 分页查询用户
 *
 * @param ids ids
 * @returns  ModelVO
 */
export const getUserForeignKeyList = (ids: string) => {
  return http.get<any>({
    url: 'system/user/getUserForeignKeyList',
    params: { ids }
  });
};

/**
 * 导出用户数据
 *
 * @param params 查询参数
 * @returns
 */
export const exportUser = (params: Recordable) => {
  return http.post({
    url: 'system/user/export',
    data: params,
    responseType: 'blob'
  });
};
