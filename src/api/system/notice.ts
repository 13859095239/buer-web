/**
 * 电子公告 api
 *
 * @author zoulan
 * @since 2023-07-29
 */
import { http } from '../../utils/http';

/**
 * 通过id查询通知公告
 *
 * @param id id
 * @returns  notice
 */
export const getNoticeById = (id: string) => {
  return http.get({ url: `system/notice/${id}` });
};

/**
 * 分页查询通知公告
 *
 * @param params 请求参数
 * @returns  notice分页
 */
export const pageNotice = (params: Recordable) => {
  return http.get<any>({ url: 'system/notice/page', params });
};

/**
 * 新增通知公告
 *
 * @param id id
 * @returns 是否成功
 */
export const addNotice = (data: Recordable) => {
  return http.post({ url: 'system/notice', data });
};

/**
 * 通过id修改通知公告
 *
 * @param data 请求参数
 * @returns 是否成功
 */
export const updateNoticeById = (data: Recordable) => {
  return http.put({ url: 'system/notice', data });
};

/**
 * 通过id删除通知公告
 *
 * @param ids id列表
 * @returns 是否成功
 */
export const removeNoticeByIds = (ids: string[]): Promise<boolean> => {
  return http.delete({ url: 'system/notice', data: ids });
};
