/**
 * 生成验证码 api
 *
 * @author zoulan
 * @since 2024-09-11
 */
import { http } from '../../utils/http';
/**
 * 生成验证码
 *
 * @param params 请求参数
 * @returns 模型类型对象
 */
export const createCaptcha = (): Promise<Recordable> => {
  return http.post({ url: 'resource/captcha' });
};
