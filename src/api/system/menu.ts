/**
 * 菜单 api
 *
 * @author zoulan
 * @since 2023-06-10
 */
import { http } from '../../utils/http';

/**
 * 通过id查询菜单
 *
 * @param id id
 * @returns  ModelVO
 */
export const getMenuById = (id: string) => {
  return http.get({ url: `system/menu/${id}` });
};

/**
 * 分页查询菜单
 *
 * @param params 请求参数
 * @returns  ModelVO
 */
export const pageMenu = (params: Recordable) => {
  return http.get<any>({ url: 'system/menu/page', params });
};

/**
 * 新增菜单
 *
 * @param id id
 * @returns  ModelVO
 */
export const saveMenu = (data: Recordable) => {
  return http.post({ url: 'system/menu', data });
};

/**
 * 通过id修改菜单
 *
 * @param data 请求参数
 * @returns 是否成功
 */
export const updateMenuById = (data: Recordable) => {
  return http.put({ url: 'system/menu', data });
};

/**
 * 通过id删除菜单
 *
 * @param id id
 * @returns 是否成功
 */
export const removeMenuByIds = (ids: string[]) => {
  return http.delete({ url: 'system/menu', data: ids });
};

/**
 * 获取菜单树
 *
 * @param id id
 * @returns 是否成功
 */
export const treeMenu = (params: Recordable) => {
  return http.get<any>({ url: 'system/menu/tree', params });
};

/**
 * 更新菜单树节点排序
 *
 * @param id id
 * @returns 是否成功
 */
export const updateMenuTreeSort = (deptIds: string[]) => {
  return http.put<any>({ url: 'system/dept/updateDeptTreeSort', data: deptIds });
};
