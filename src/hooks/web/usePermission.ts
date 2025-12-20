import { isArray } from 'lodash-es';
import { computed } from 'vue';
import type { RouteRecordRaw } from 'vue-router';

import { MENU_TYPE_ENUM } from '/@/constants/systemConstants';
import { router } from '/@/router';
import { LAYOUT } from '/@/router/constant';
import { usePermissionStore } from '/@/store/modules/permission';
import type { Menu } from '/@/types/system/permission';
import { errorMessage } from '/@/utils/prompt';
import { findNode, forEach, getFirstLeafNode, listToTree } from '/@/utils/tree';
/** 判断是否有权限 */
export function hasPermission(value: string | string[]): boolean {
  const permissions: string[] = usePermissionStore().getPermissions;
  if (!isArray(value)) {
    return permissions.includes(value);
  } else {
    for (const s of value) {
      if (!permissions.includes(s)) return false;
    }
    return true;
  }
}
/** 获取菜单 */
export function getRouters(): Array<RouteRecordRaw> {
  const modules = import.meta.glob('../../views/**/**.vue');
  const routes: Array<RouteRecordRaw> = new Array<RouteRecordRaw>();
  // 在pinia没有安装完成前,只能手动读取缓存菜单
  const permissionCache = localStorage.getItem('permission');
  // 如果菜单在缓存中不存在，直接返回空路由
  if (!permissionCache) {
    return routes;
  }
  const permissionObject = JSON.parse(permissionCache!);
  const menus: Menu[] = (permissionObject.menus as Menu[]) || [];
  const tree = listToTree(menus);
  forEach(tree, (node) => {
    if (!node.path) {
      return;
    }
    if (node.menuType === MENU_TYPE_ENUM.PATH) {
      // 目录
      const leafNode = getFirstLeafNode(node);
      routes.push({
        name: `layout-${node.name}`,
        redirect: leafNode.path,
        path: node.path,
        component: LAYOUT,
        children: [],
        meta: {
          icon: node.icon
        }
      });
    } else {
      // 菜单
      // 是否是外链
      const frameFlag = node.frameFlag === '1' && node.frameUrl;
      // 构建基础路由结构
      const route: RouteRecordRaw = {
        name: `layout-${node.name}`,
        path: node.path,
        meta: {
          fixed: true,
          ...(frameFlag && {
            frameUrl: node.frameUrl,
            isFrame: true
          })
        },
        component: LAYOUT,
        children: [
          {
            name: node.name,
            path: '',
            component: frameFlag
              ? () => import('/@/layout/page/frame/index.vue')
              : modules[`../../views${node.path}/index.vue`],
            meta: {
              icon: node.icon,
              ...(frameFlag && {
                frameUrl: node.frameUrl,
                isFrame: true
              })
            }
          }
        ]
      };

      routes.push(route);
    }
  });
  return routes;
}
/** 刷新路由 */
export function resetRouter() {
  const raws: Array<RouteRecordRaw> = getRouters();
  raws.forEach((p) => router.addRoute(p));
}
/** 跳转至默认的路由 */
export function goDefaultRouter() {
  const routers = getRouters();
  if (routers.length > 0) {
    router.push(routers[0].path);
  } else {
    errorMessage('无权限,请联系管理员!');
  }
}
/** 获取默认的路由 */
export function getDefaultRouter(): Nullable<RouteRecordRaw> {
  const routers = getRouters();
  if (routers.length > 0) {
    return routers[0];
  } else {
    return null;
  }
}
/** 获取路由当前活动的第一个节点菜单 */
export const activeFirstMenu = computed((): Menu | undefined => {
  const tree = usePermissionStore().getTree;
  const { fullPath } = router.currentRoute.value;
  let node = findNode(tree, (p) => p.path === fullPath);
  while (node?.parent) {
    node = node.parent;
  }
  return node;
});
/** 获取路由当前活动的第二个节点菜单 */
export const activeSecondMenu = computed((): Menu | undefined => {
  const { fullPath } = router.currentRoute.value;
  let node = findNode(activeFirstMenu.value?.children, (p) => p.path === fullPath);
  while (node?.parent?.parent) {
    node = node.parent;
  }
  return node;
});
