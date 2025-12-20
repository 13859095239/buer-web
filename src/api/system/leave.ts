/**
 * 请假流程 api
 *
 * @author zoulan
 * @since 2024-06-03
 */
import { http } from '../../utils/http';

/**
 * 通过id查询请假流程
 *
 * @param id id
 * @returns  leaveVO
 */
export const getLeaveById = (id: string) => {
  return http.get({ url: `system/leave/${id}` });
};

/**
 * 通过流程实例id查询请假流程
 *
 * @param procInstId 流程实例id
 * @returns  leaveVO
 */
export const getLeaveByProcInstId = (procInstId: string) => {
  return http.get({ url: `system/leave/procInstId/${procInstId}` });
};

/**
 * 分页查询请假流程
 *
 * @param params 请求参数
 * @returns  leave分页
 */
export const pageLeave = (params: Recordable) => {
  return http.get<any>({ url: 'system/leave/page', params });
};

/**
 * 新增请假流程
 *
 * @param id id
 * @returns 是否成功
 */
export const addLeave = (data: Recordable) => {
  return http.post({ url: 'system/leave', data });
};

/**
 * 通过id修改请假流程
 *
 * @param data 请求参数
 * @returns 是否成功
 */
export const updateLeaveById = (data: Recordable) => {
  return http.put({
    url: 'system/leave',
    data
  });
};

/**
 * 通过id删除请假流程
 *
 * @param id id
 * @returns 是否成功
 */
export const removeLeaveByIds = (ids: string[]): Promise<boolean> => {
  return http.delete({ url: 'system/leave', data: ids });
};

/**
 * 完成流程任务
 *
 * @param data data
 * @returns 是否成功
 */
export const completeTask = (data: Recordable) => {
  return http.post({ url: 'system/leave/completeTask', data });
};
