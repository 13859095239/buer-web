/**
 * 历史任务 api
 *
 * @author zoulan
 * @since 2023-05-27
 */
import { http } from '../../utils/http';

/**
 * 通过任务id获取我的已办任务信息
 *
 * @param taskId 任务id
 * @returns 已办任务信息
 */
export const getMyDoneTaskInfo = (taskId) => {
  return http.get<any>({ url: `flow/taskinst/myDoneTaskinst/${taskId}` });
};
/**
 * 分页查询，我的历史任务
 *
 * @param params 请求参数
 * @returns  分页对象
 */
export const pageMyDoneTaskinst = (params: Recordable) => {
  return http.get<any>({ url: 'flow/taskinst/myDoneTaskinst/page', params });
};

/**
 * 分页查询，历史任务
 *
 * @param params 请求参数
 * @returns  分页对象
 */
export const pageTaskinst = (params: Recordable) => {
  return http.get<any>({ url: 'flow/taskinst/page', params });
};

/**
 * 列表查询，历史任务
 *
 * @param params 请求参数
 * @returns  分页对象
 */
export const listTaskinst = (params: Recordable) => {
  return http.get<any>({ url: 'flow/taskinst/list', params });
};
