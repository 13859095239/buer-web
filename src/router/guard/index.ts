/**
 * 路由守卫入口
 *
 * @author zoulan
 * @since 2023-05-22
 */
import type { Router } from 'vue-router';

import { createPermissionGuard } from './permissionGuard';
import { createProgressGuard } from './progressGuard';

export function setupRouterGuard(router: Router) {
  createPermissionGuard(router);
  createProgressGuard(router);
}
