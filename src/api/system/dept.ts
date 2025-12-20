/**
 * 部门 api
 *
 * @author zoulan
 * @since 2023-06-10
 */
import { http } from '../../utils/http';

/**
 * 通过id查询部门
 *
 * @param id id
 * @returns  ModelVO
 */
export const getDeptById = (id: string) => {
  return http.get({ url: `system/dept/${id}` });
};

/**
 * 分页查询部门
 *
 * @param params 请求参数
 * @returns  ModelVO
 */
export const pageDept = (params: Recordable) => {
  return http.get<any>({ url: 'system/dept/page', params });
};

/**
 * 新增部门
 *
 * @param id id
 * @returns 是否成功
 */
export const saveDept = (data: Recordable) => {
  return http.post({
    url: 'system/dept',
    data
  });
};

/**
 * 通过id修改部门
 *
 * @param data 请求参数
 * @returns 是否成功
 */
export const updateDeptById = (data: Recordable) => {
  return http.put({ url: 'system/dept', data });
};

/**
 * 通过id删除部门
 *
 * @param id id
 * @returns 是否成功
 */
export const removeDeptByIds = (deptIds: string[]): Promise<boolean> => {
  return http.delete({ url: 'system/dept', data: deptIds });
};

/**
 * 获取部门树
 *
 * @param id id
 * @returns 是否成功
 */
export const treeDept = (params: Recordable) => {
  return http.get<any>({ url: 'system/dept/tree', params });
};

/**
 * 更新部门树节点排序
 *
 * @param id id
 * @returns 是否成功
 */
export const updateDeptTreeSort = (deptIds: string[]) => {
  return http.put<any>({ url: 'system/dept/updateDeptTreeSort', data: deptIds });
};
