/**
 * 流程变量 api
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
export const getModelVariableById = (id: string): Promise<Recordable> => {
  return http.get({ url: `flow/model-variable/${id}` });
};

/**
 * 分页查询流程变量
 *
 * @param params 请求参数
 * @returns  流程变量分页对象
 */
export const pageModelVariable = (params: Recordable) => {
  return http.get<any>({ url: 'flow/model-variable/page', params });
};

/**
 * 新增流程变量
 *
 * @param data 请求参数
 * @returns 是否成功
 */
export const saveModelVariable = (data: Recordable): Promise<boolean> => {
  return http.post({ url: 'flow/model-variable', data });
};

/**
 * 通过id修改流程变量
 *
 * @param data 请求参数
 * @returns 是否成功
 */
export const updateVariableById = (data: Recordable): Promise<boolean> => {
  return http.put({ url: 'flow/model-variable', data });
};

/**
 * 通过id删除流程变量
 *
 * @param id id
 * @returns 是否成功
 */
export const removeModelVariableByIds = (ids: string[]): Promise<boolean> => {
  return http.delete({ url: 'flow/model-variable', data: ids });
};
