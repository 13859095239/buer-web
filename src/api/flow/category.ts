/**
 * 流程类型 api
 *
 * @author zoulan
 * @since 2023-05-27
 */
import { http } from '../../utils/http';
/**
 * 通过id查询流程类型
 *
 * @param id id
 * @returns 模型类型对象
 */
export const getCategoryById = (id: string): Promise<Recordable> => {
  return http.get({ url: `flow/category/${id}` });
};

/**
 * 分页查询流程类型
 *
 * @param params 请求参数
 * @returns  模型类型分页对象
 */
export const pageCategory = (params: Recordable) => {
  return http.get<any>({ url: `flow/category/page`, params });
};

/**
 * 列表查询流程类型
 *
 * @param params 请求参数
 * @returns  模型类型列表
 */
export const listCategory = (params: Recordable) => {
  return http.get<any>({ url: `flow/category/list`, params });
};

/**
 * 新增流程类型
 *
 * @param data 请求参数
 * @returns 是否成功
 */
export const saveCategory = (data: Recordable): Promise<boolean> => {
  return http.post({ url: 'flow/category', data });
};

/**
 * 通过id修改流程类型
 *
 * @param data 请求参数
 * @returns 是否成功
 */
export const updateCategoryById = (data: Recordable): Promise<boolean> => {
  return http.put({ url: 'flow/category', data });
};

/**
 * 通过id删除流程类型
 *
 * @param id id
 * @returns 是否成功
 */
export const removeCategoryByIds = (ids: string[]): Promise<boolean> => {
  return http.delete({ url: 'flow/category', data: ids });
};
