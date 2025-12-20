/**
 * 编号规则 api
 *
 * @author zoulan
 * @since 2024-06-07
 */
import { http } from '../../utils/http';

/**
 * 通过id查询编号规则
 *
 * @param id id
 * @returns
 */
export const getCodeRuleById = (id: string) => {
  return http.get<Recordable>({ url: `system/code-rule/${id}` });
};

/**
 * 分页查询编号规则
 *
 * @param params 请求参数
 * @returns  分页
 */
export const pageCodeRule = (params: Recordable) => {
  return http.get<any>({ url: 'system/code-rule/page', params });
};

/**
 * 列表查询编号规则
 *
 * @param params 请求参数
 * @returns  编号规则列表
 */
export const listCodeRule = (params: Recordable) => {
  return http.get<any>({ url: 'system/code-rule/list', params });
};
/**
 * 新增通知公告
 *
 * @param id id
 * @returns 是否成功
 */
export const saveCodeRule = (data: Recordable) => {
  return http.post({
    url: 'system/code-rule',
    data
  });
};

/**
 * 通过id修改编号规则
 *
 * @param data 请求参数
 * @returns 是否成功
 */
export const updateCodeRuleById = (data: Recordable) => {
  return http.put({ url: 'system/code-rule', data });
};

/**
 * 通过id删除通知公告
 *
 * @param id id
 * @returns 是否成功
 */
export const removeCodeRuleByIds = (ids: string[]): Promise<boolean> => {
  return http.delete({ url: 'system/code-rule', data: ids });
};
