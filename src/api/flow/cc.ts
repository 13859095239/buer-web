/**
 * 流程抄送 api
 *
 * @author zoulan
 * @since 2023-06-13
 */
import { http } from '../../utils/http';
/**
 * 通过id查询流程抄送
 *
 * @param id id
 * @returns 流程抄送对象
 */
export const getCcById = (id: string): Promise<Recordable> => {
  return http.get({ url: `flow/cc/${id}` });
};

/**
 * 分页查询流程抄送
 *
 * @param params 请求参数
 * @returns  流程抄送分页对象
 */
export const getDoCcPage = (params: Recordable) => {
  return http.get<any>({ url: `flow/cc/do/page`, params });
};
/**
 * 分页查询流程抄送
 *
 * @param params 请求参数
 * @returns  流程抄送分页对象
 */
export const pageDoneCc = (params: Recordable) => {
  return http.get<any>({ url: `flow/cc/done/page`, params });
};
/**
 * 列表查询流程抄送
 *
 * @param params 请求参数
 * @returns  流程抄送列表
 */
export const listCc = (params: Recordable) => {
  return http.get<any>({ url: `flow/cc/list`, params });
};

/**
 * 新增流程抄送
 *
 * @param data 请求参数
 * @returns 是否成功
 */
export const saveCc = (data: Recordable): Promise<boolean> => {
  return http.post({ url: 'flow/cc', data });
};

/**
 * 通过id修改流程抄送
 *
 * @param data 请求参数
 * @returns 是否成功
 */
export const updateCc = (data: Recordable): Promise<boolean> => {
  return http.put({ url: 'flow/cc', data });
};

/**
 * 通过id删除流程抄送
 *
 * @param id id
 * @returns 是否成功
 */
export const removeCcByIds = (ids: string[]): Promise<boolean> => {
  return http.delete({ url: 'flow/cc', data: ids });
};
