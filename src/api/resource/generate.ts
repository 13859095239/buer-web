/**
 * 模型类型 api
 *
 * @author zoulan
 * @since 2023-05-27
 */
import { http } from '../../utils/http';
/**
 * 生成id
 *
 * @param params 请求参数
 * @returns 模型类型对象
 */
export const generateId = (): Promise<string> => {
  return http.get({ url: 'resource/generate/id' });
};
