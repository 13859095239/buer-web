/** 登录验证DTO */
export interface LoginDTO {
  /** 用户名 */
  username: string;
  /** 密码 */
  password: string;
  /** 验证码ID */
  captchaId: string;
  /** 验证码值 */
  captchaValue: string;
}
