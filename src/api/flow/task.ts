/**
 * 待办任务 api
 *
 * @author zoulan
 * @since 2023-05-27
 */
import { http } from '../../utils/http';

/**
 * 通过任务id获取我的待办任务信息
 *
 * @param id id
 * @returns 待办任务信息
 */
export const getMyTaskInfo = (id) => {
  return http.get<any>({ url: `flow/task/myTodoTask/${id}` });
};

/**
 * 分页查询，我的待办信息
 *
 * @returns  分页对象
 */
export const pageMyTask = (params: Recordable) => {
  return http.get<any>({ url: 'flow/task/myTodoTask/page', params });
};

/**
 * 用户认领任务
 * 从候选池到待办
 *
 * @param taskId 待办任务id
 * @return 是否成功
 */
export const claimTask = (taskId) => {
  return http.post<any>({ url: `flow/task/claimTask/${taskId}` });
};

/**
 * 用户撤销认领任务
 * 退回到候选池
 *
 * @param taskId 待办任务id
 * @return 是否成功
 */
export const unclaimTask = (taskId) => {
  return http.post<any>({ url: `flow/task/unclaimTask/${taskId}` });
};
