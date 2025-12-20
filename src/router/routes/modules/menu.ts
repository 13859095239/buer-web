/**
 * 从后端获取系统路由
 *
 * @author zoulan
 * @since 2023-05-22
 */
import type { RouteRecordRaw } from 'vue-router';

import { getRouters } from '/@/hooks/web/usePermission';

const routes: Array<RouteRecordRaw> = getRouters();
export default routes;
