/**
 * 实例 api
 *
 * @author zoulan
 * @since 2023-06-18
 */
import { http } from '../../utils/http';

/**
 * 通过id查询
 *
 * @param id id* @returns  ProcinstVO
 */
export const getProcinstById = (id: string) => {
  return http.get({ url: `flow/procinst/${id}` });
};

/**
 * 通过模型key获取新建流程实例信息
 *
 * @param modelKey modelKey
 * @returns CreateProcinstInfoVO
 */
export const getCreateProcinstInfo = (modelKey: string) => {
  return http.get({ url: `flow/procinst/createProcinstInfo/${modelKey}` });
};

/**
 * 通过流程实例id获取流程信息
 *
 * @param procInstId 流程实例id
 * @returns ProcinstInfoVO
 */
export const getProcinstInfoById = (procInstId: string) => {
  return http.get({ url: `flow/procinst/viewProcinstInfo/${procInstId}` });
};

/**
 * 创建流程
 *
 * @param data 创建流程对象
 * @returns 是否成功
 */
export const createProcinst = (data: Recordable) => {
  return http.post({ url: 'flow/procinst', data });
};

/**
 * 通过id删除
 *
 * @param id id
 * @returns  是否成功
 */
export const removeProcinstByIds = (ids: string[]) => {
  return http.delete({ url: `flow/procinst`, data: ids });
};

/**
 * 分页查询实例
 *
 * @param params 请求参数
 * @returns  分页对象
 */
export const pageProcinst = (params: Recordable) => {
  return http.get({ url: 'flow/procinst/page', params });
};

/**
 * 分页查询,我的实例
 *
 * @param params 请求参数
 * @returns  分页对象
 */
export const pageMyCreatedProcinst = (params: Recordable) => {
  return http.get({ url: 'flow/procinst/my-created-procinst/page', params });
};

/**
 * 通过流程实例ID激活流程
 *
 * @param id id
 * @returns  是否成功
 */
export const activateProcinstById = (procInstId: string) => {
  return http.put({ url: `flow/procinst/activateProcinstById/${procInstId}` });
};

/**
 * 通过流程实例ID挂起流程
 *
 * @param id id
 * @returns  是否成功
 */
export const suspendProcinstById = (procInstId: string) => {
  return http.put({ url: `flow/procinst/suspendProcinstById/${procInstId}` });
};
