/**
 * 流程委托 api
 *
 * @author zoulan
 * @since 2023-06-13
 */
import { http } from '../../utils/http';
/**
 * 通过id查询流程委托
 *
 * @param id id
 * @returns 流程委托对象
 */
export const getDelegateById = (id: string): Promise<Recordable> => {
  return http.get({ url: `flow/delegate/${id}` });
};

/**
 * 分页查询流程委托
 *
 * @param params 请求参数
 * @returns  流程委托分页对象
 */
export const pageDelegate = (params: Recordable) => {
  return http.get<any>({ url: `flow/delegate/page`, params });
};

/**
 * 列表查询流程委托
 *
 * @param params 请求参数
 * @returns  流程委托列表
 */
export const listDelegate = (params: Recordable) => {
  return http.get<any>({ url: `flow/delegate/list`, params });
};

/**
 * 新增流程委托
 *
 * @param data 请求参数
 * @returns 是否成功
 */
export const saveDelegate = (data: Recordable): Promise<boolean> => {
  return http.post({ url: 'flow/delegate', data });
};

/**
 * 通过id修改流程委托
 *
 * @param data 请求参数
 * @returns 是否成功
 */
export const updateDelegate = (data: Recordable): Promise<boolean> => {
  return http.put({ url: 'flow/delegate', data });
};

/**
 * 通过id删除流程委托
 *
 * @param id id
 * @returns 是否成功
 */
export const removeDelegateByIds = (ids: string[]): Promise<boolean> => {
  return http.delete({ url: 'flow/delegate', data: ids });
};
