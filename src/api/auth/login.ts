/**
 * 登录 api
 *
 * @author zoulan
 * @since 2023-06-10
 */
import type { LoginDTO } from '/@/types/auth/login';
import type { OAuth2TokenVO } from '/@/types/system/user';

import { http } from '../../utils/http';
/**
 * 普通登录
 *
 * @param loginDTO LoginDTO
 */
export const login = (loginDTO: LoginDTO) => {
  return http.post({ url: '/auth/login', data: loginDTO });
};

/**
 * oauth 密码模式登录
 */
export const oauthPasswordLogin = (loginDTO: LoginDTO): Promise<OAuth2TokenVO> => {
  const { username, password, captchaId, captchaValue } = loginDTO;
  return http.post<OAuth2TokenVO>({
    url: '/auth/oauth2/token',
    params: {
      grant_type: 'password',
      client_id: 'web',
      client_secret: 'app',
      username,
      password,
      captchaId,
      captchaValue
    }
  });
};

/**
 * 注销当前登录用户
 */
export const loginOut = () => {
  return http.delete({
    url: '/auth/login/logout'
  });
};
