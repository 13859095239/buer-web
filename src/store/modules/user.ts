/**
 * 用户store
 *
 * @author zoulan
 * @since 2023-05-22
 */
import { defineStore } from 'pinia';

import { loginOut, oauthPasswordLogin } from '/@/api/auth/login';
import { getMyUserInfo } from '/@/api/system/user';
import { PAGE_URL_ENUM } from '/@/constants/appConstants';
import { MENU_TYPE_ENUM } from '/@/constants/systemConstants';
import { goDefaultRouter, resetRouter } from '/@/hooks/web/usePermission';
import { clearRouter, router } from '/@/router';
import type { LoginDTO } from '/@/types/auth/login';
import type { Menu } from '/@/types/system/permission';
import { getUserInfo, setAuthCache } from '/@/utils/auth';

import { usePermissionStore } from './permission';

interface UserState {
  // 用户id
  id: string | null;
  // token
  token: string | null;
  // 姓名
  name: string | null;
  // 登录名
  userName: string | null;
  // 租户id
  tenantId: string | null;
  // 角色列表
  roleList: string[];
  // 刷新token的凭证
  refreshToken: string | null;
}
export const useUserStore = defineStore('user', {
  state: (): UserState => ({
    id: null,
    token: null,
    userName: null,
    name: null,
    tenantId: null,
    roleList: [],
    refreshToken: null
  }),
  getters: {
    // 获取用户id
    getId(): string {
      return this.id || getUserInfo('USER_ID');
    },
    // 获取用户token
    getToken(): string {
      return this.token || getUserInfo('TOKEN');
    },
    // 获取姓名
    getName(): string {
      return this.name || getUserInfo('USER_NAME');
    },
    // 获取登录名
    getUserName(): string {
      return this.userName || getUserInfo('USER_USERNAME');
    },
    // 获取租户
    getTenantId(): string {
      return getUserInfo('USER_TENANT_ID');
    }
  },
  actions: {
    // 设置id
    setId(value: string | null) {
      this.id = value;
      setAuthCache('USER_ID', value);
    },
    // 设置姓名
    setName(value: string | null) {
      this.name = value;
      setAuthCache('USER_NAME', value);
    },
    // 设置用户名
    setUserName(value: string | null) {
      this.userName = value;
      setAuthCache('USER_USERNAME', value);
    },
    // 设置租户
    setTenantId(value: string | null) {
      this.tenantId = value;
      setAuthCache('USER_TENANT_ID', value);
    },
    // 设置用户token
    setToken(value: string | null) {
      this.token = value;
      setAuthCache('TOKEN', value);
    },
    /**
     * 登录
     *
     * @param loginDTO 登录参数
     */
    async login(loginDTO: LoginDTO) {
      // 登录验证
      const userInfo = await oauthPasswordLogin(loginDTO);
      this.setToken(userInfo.access_token);
      // 获取当前登录用户信息
      const userInfoModel = await getMyUserInfo();
      const user = userInfoModel.user;
      this.setName(user.name);
      this.setUserName(user.username);
      const menus = userInfoModel.menus.filter((menu) =>
        [MENU_TYPE_ENUM.MENU, MENU_TYPE_ENUM.PATH].includes(menu.menuType as MENU_TYPE_ENUM)
      ) as unknown as Menu[];
      const permissions = userInfoModel.menus
        .filter((menu) => menu.menuType === MENU_TYPE_ENUM.PERMISSION)
        .map((p) => p.permission);
      const permissionStore = usePermissionStore();
      permissionStore.setMenus(menus);
      permissionStore.setPermissions(permissions);
      resetRouter();
      goDefaultRouter();
    },
    // 注销
    async logout() {
      if (this.getToken) {
        try {
          await loginOut();
        } catch {
          console.log('注销Token失败');
        }
      }
      this.setId(null);
      this.setName(null);
      this.setUserName(null);
      this.setTenantId(null);
      this.setToken(null);
      usePermissionStore().clear();
      clearRouter();
      router.push(PAGE_URL_ENUM.BASE_LOGIN);
    }
  }
});
