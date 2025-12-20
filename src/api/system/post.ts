/**
 * 岗位 api
 *
 * @author zoulan
 * @since 2023-07-29
 */
import type { EditorData } from '/@/components/Table/src/types/editor';

import { http } from '../../utils/http';

/**
 * 通过id查询岗位
 *
 * @param id id
 * @returns  ModelVO
 */
export const getPostById = (id: string) => {
  return http.get({ url: `system/post/${id}` });
};

/**
 * 列表查询岗位
 *
 * @param params 请求参数
 * @returns  ModelVO
 */
export const listPost = (params: Recordable) => {
  return http.get<any>({ url: 'system/post/list', params });
};

/**
 * 分页查询岗位
 *
 * @param params 请求参数
 * @returns  ModelVO
 */
export const pagePost = (params: Recordable) => {
  return http.get<any>({ url: 'system/post/page', params });
};

/**
 * 新增岗位
 *
 * @param id id
 * @returns  ModelVO
 */
export const savePost = (data: Recordable) => {
  return http.post({ url: 'system/post', data });
};

/**
 * 通过id修改岗位
 *
 * @param data 请求参数
 * @returns 是否成功
 */
export const updatePostById = (data: Recordable) => {
  return http.put({ url: 'system/post', data });
};

/**
 * 通过表格修改岗位
 *
 * @param data 请求参数
 * @returns 是否成功
 */
export const updatePostByTableEditor = (data: EditorData) => {
  return http.put({ url: 'system/post/table-editor', data });
};

/**
 * 通过id删除岗位
 *
 * @param id id
 * @returns 是否成功
 */
export const removePostByIds = (ids: string[]): Promise<boolean> => {
  return http.delete({ url: 'system/post', data: ids });
};
