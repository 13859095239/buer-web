/**
 * oauth令牌 api
 *
 * @author zoulan
 * @since 2024-09-08
 */
import { http } from '/@/utils/http';

/**
 * 分页查询 token 令牌
 *
 * @param params 请求参数
 * @returns  分页
 */
export const pageTokenEndpoint = (params: Recordable) => {
  return http.get<any>({ url: 'auth/token-endpoint/page', params });
};

/**
 * 通过 tokens 删除 token 令牌
 *
 * @param tokens tokens
 * @returns 是否成功
 */
export const removeTokenEndpointByTokens = (tokens: string[]): Promise<boolean> => {
  return http.delete({ url: 'auth/token-endpoint', data: tokens });
};
