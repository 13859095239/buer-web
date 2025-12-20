/**
 * 系统自带的路由
 *
 * @author zoulan
 * @since 2023-05-22
 */
import { EXCEPTION_COMPONENT, LAYOUT, PAGE_NOT_FOUND_NAME, PAGE_REDIRECT_TO_NAME } from '/@/router/constant';
import type { AppRouteRecordRaw } from '/@/router/types';
/** 404路由 */
export const PAGE_NOT_FOUND_ROUTE: AppRouteRecordRaw = {
  path: '/:path(.*)*',
  name: PAGE_NOT_FOUND_NAME,
  component: LAYOUT,
  meta: {
    title: 'ErrorPage',
    hideBreadcrumb: true,
    hideMenu: true,
    basic: true
  },
  children: [
    {
      path: '/:path(.*)*',
      name: `${PAGE_NOT_FOUND_NAME}-CHILDREN`,
      component: EXCEPTION_COMPONENT,
      meta: {
        title: 'ErrorPage',
        hideBreadcrumb: true,
        hideMenu: true,
        basic: true
      }
    }
  ]
};
/** 首页框架路由 */
export const RootRoute: AppRouteRecordRaw = {
  path: '/layout',
  name: 'layout',
  component: () => import('/@/layout/default/index.vue'),
  meta: {
    title: 'layout',
    basic: true
  }
};
/** 登录路由 */
export const LoginRoute: AppRouteRecordRaw = {
  path: '/login',
  name: 'Login',
  component: () => import('/@/layout/login/index.vue'),
  meta: {
    title: '登录',
    basic: true
  }
};
export const AuthRoute: AppRouteRecordRaw = {
  path: '/',
  name: '/',
  component: () => import('/@/layout/login/index.vue'),
  meta: {
    title: '身份验证',
    basic: true
  }
};
export const REDIRECT_ROUTE: AppRouteRecordRaw = {
  path: '/redirect',
  component: LAYOUT,
  name: 'RedirectTo',
  meta: {
    title: PAGE_REDIRECT_TO_NAME,
    hideBreadcrumb: true,
    hideMenu: true,
    basic: true
  },
  children: [
    {
      path: '/redirect/:path(.*)',
      name: PAGE_REDIRECT_TO_NAME,
      component: () => import('/@/layout/page/redirect/index.vue'),
      meta: {
        title: PAGE_REDIRECT_TO_NAME,
        hideBreadcrumb: true,
        basic: true
      }
    }
  ]
};
export default [PAGE_NOT_FOUND_ROUTE, LoginRoute, RootRoute, REDIRECT_ROUTE];
