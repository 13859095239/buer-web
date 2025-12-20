/**
 * 菜单与权限store
 *
 * @author zoulan
 * @since 2023-05-22
 */
import { defineStore } from 'pinia';

import type { Menu } from '/@/types/system/permission';
// import { createLocalStorage } from '/@/utils/cache';
// import { MENUS_KEY, PERMISSIONS_KEY } from '/@/settings/cacheSetting';
import { getNodeParents, listToTree } from '/@/utils/tree';

interface PermissionState {
  menus: Menu[];
  permissions: string[];
}
// const ls = createLocalStorage();
export const usePermissionStore = defineStore('permission', {
  state(): PermissionState {
    return {
      /**
       * 菜单列表
       */
      menus: [],
      // (ls.get(MENUS_KEY) as Menu[]) || [],
      /**
       * 权限列表
       */
      permissions: []
    };
  },
  getters: {
    /**
     * 获取菜单列表
     *
     * @returns 菜单列表
     */
    getMenus(): Menu[] {
      return this.menus;
    },
    /**
     * 获取权限列表
     *
     * @returns 权限列表
     */
    getPermissions(): string[] {
      return this.permissions;
    },
    /**
     * 获取菜单树
     *
     * @returns 树对象
     */
    getTree(): Menu[] {
      return listToTree(this.menus);
    }
  },
  actions: {
    /**
     * 设置菜单列表
     *
     * @param 菜单列表
     */
    setMenus(value: Menu[]) {
      this.$patch({
        menus: value
      });
      // this.menus = value;
      // ls.set(MENUS_KEY, value);
    },
    /**
     * 设置权限列表
     *
     * @param 权限列表
     */
    setPermissions(value: string[]) {
      this.permissions = value;
      // ls.set(PERMISSIONS_KEY, value);
    },
    /**
     * 清空菜单及权限缓存
     */
    clear() {
      this.permissions = [];
      this.menus = [];
    },
    /**
     * 获取父级菜单列表
     * @param func
     * @param include
     * @returns
     */
    getParentMenus(func: Fn<Menu, boolean>, include: boolean = false) {
      const r = getNodeParents(this.getTree, func, include);
      return r;
    }
  },
  persist: {
    // 持久化存储
    pick: ['menus', 'permissions']
  }
});
