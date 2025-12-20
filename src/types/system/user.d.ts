/**
 * 用户类型
 *
 * @author zoulan
 * @since 2023-05-22
 */
import type { SysMenu } from './permission';

export interface OAuth2TokenVO {
  access_token: string;
}
/** 角色表对象 */
export interface SysRole {
  id: string;
  name: string;
}
/** 用户表对象 */
export interface SysUser {
  id: string;
  username: string;
  name: string;
  deptId: string;
  areaId: string;
}
/** 单个用户信息 */
export interface UserInfoModel {
  user: SysUser;
  permissions: string[];
  roleIds: string[];
  roles: SysRole[];
  menus: SysMenu[];
}
