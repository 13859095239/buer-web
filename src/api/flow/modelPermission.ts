/**
 * 模型权限 api
 *
 * @author zoulan
 * @since 2024-05-13
 */
import { http } from '../../utils/http';

/**
 * 通过id查询流程变量
 *
 * @param id id
 * @returns 模型类型对象
 */
export const getModelPermissionById = (id: string): Promise<Recordable> => {
  return http.get({ url: `flow/model-permission/${id}` });
};

/**
 * 分页查询流程变量
 *
 * @param params 请求参数
 * @returns  流程变量分页对象
 */
export const pageModelPermission = (params: Recordable) => {
  return http.get<any>({ url: 'flow/model-permission/page', params });
};

/**
 * 新增流程变量
 *
 * @param data 请求参数
 * @returns 是否成功
 */
export const saveModelPermission = (data: Recordable): Promise<boolean> => {
  return http.post({ url: 'flow/model-permission', data });
};

/**
 * 通过id修改流程变量
 *
 * @param data 请求参数
 * @returns 是否成功
 */
export const updatePermissionById = (data: Recordable): Promise<boolean> => {
  return http.put({ url: 'flow/model-permission', data });
};

/**
 * 通过id删除流程变量
 *
 * @param id id
 * @returns 是否成功
 */
export const removeModelPermissionByIds = (ids: string[]): Promise<boolean> => {
  return http.delete({ url: 'flow/model-permission', data: ids });
};
