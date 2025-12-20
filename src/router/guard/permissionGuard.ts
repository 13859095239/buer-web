/**
 * 权限路由守卫
 *
 * @author zoulan
 * @since 2023-05-22
 */
import type { Router, RouteRecordRaw } from 'vue-router';

import { PAGE_URL_ENUM } from '/@/constants/appConstants';
import { getDefaultRouter } from '/@/hooks/web/usePermission';
import { useUserStore } from '/@/store/modules/user';

const LOGIN_PATH = PAGE_URL_ENUM.BASE_LOGIN;
const whitePathList: PAGE_URL_ENUM[] = [LOGIN_PATH];
export function createPermissionGuard(router: Router) {
  const userStore = useUserStore();
  router.beforeEach(async (to, from, next) => {
    const { path } = to;
    const token = userStore.getToken;
    // 登录了,默认跳转第一个菜单
    if (token && PAGE_URL_ENUM.ROOT_PAGE === (path as PAGE_URL_ENUM)) {
      const defaultRouter = getDefaultRouter() as RouteRecordRaw;
      next({ path: defaultRouter.path, replace: true });
    }
    // 登录了，访问登录页，跳转第一个菜单
    // else if (token && LOGIN_PATH === to.path as PageEnum) {
    //     const defaultRouter = getDefaultRouter() as RouteRecordRaw;
    //     next({ path: defaultRouter.path, replace: true });
    //     return
    // }
    // 没有登录，且访问不是白名单
    else if (!token && !whitePathList.includes(to.path as PAGE_URL_ENUM)) {
      next({ path: LOGIN_PATH, replace: true });
    }
    // 正常放行
    else {
      next();
    }
  });
}
