/**
 * 用户store
 *
 * @author zoulan
 * @since 2023-05-22
 */
import { defineStore } from 'pinia';
import { toRaw } from 'vue';
import type { RouteLocationNormalized } from 'vue-router';

import { PAGE_URL_ENUM } from '/@/constants/appConstants';
import { useRedo } from '/@/hooks/web/usePage';
import { goDefaultRouter } from '/@/hooks/web/usePermission';
import { router } from '/@/router';

const { currentRoute, replace } = router;
interface MultipleTabState {
  tabs: RouteLocationNormalized[];
}
const getToTarget = (tabItem: RouteLocationNormalized) => {
  const { params, path, query } = tabItem;
  return {
    params: params || {},
    path,
    query: query || {}
  };
};
export const useMultipleTabStore = defineStore('multipleTab', {
  state: (): MultipleTabState => ({
    tabs: []
  }),
  getters: {
    // 获取当前页签列表
    getTabs(): RouteLocationNormalized[] {
      return this.tabs;
    }
  },
  actions: {
    /**
     * 新增页签
     *
     * @param route
     * @returns void
     */
    async addTab(route: RouteLocationNormalized) {
      const { name, path, fullPath, params, query, meta } = route;
      if (path === PAGE_URL_ENUM.ERROR_PAGE || path === PAGE_URL_ENUM.BASE_LOGIN || !name) {
        return;
      }
      let updateIndex = -1;
      const tabHasExits = this.tabs.some((tab, index) => {
        updateIndex = index;
        return (tab.fullPath || tab.path) === (fullPath || path);
      });
      if (tabHasExits) {
        const curTab = toRaw(this.tabs)[updateIndex];
        if (!curTab) {
          return;
        }
        curTab.params = params || curTab.params;
        curTab.query = query || curTab.query;
        curTab.fullPath = fullPath || curTab.fullPath;
        this.tabs.splice(updateIndex, 1, curTab);
      } else {
        // Add tab
        // 获取动态路由打开数，超过 0 即代表需要控制打开数
        const dynamicLevel = meta?.dynamicLevel ?? -1;
        if (dynamicLevel > 0) {
          // 如果动态路由层级大于 0 了，那么就要限制该路由的打开数限制了
          // 首先获取到真实的路由，使用配置方式减少计算开销.
          // const realName: string = path.match(/(\S*)\//)![1];
          const realPath = meta?.realPath ?? '';
          // 获取到已经打开的动态路由数, 判断是否大于某一个值
          if (this.tabs.filter((e) => e.meta?.realPath ?? realPath === '').length >= dynamicLevel) {
            // 关闭第一个
            const index = this.tabs.findIndex((item) => item.meta.realPath === realPath);
            index !== -1 && this.tabs.splice(index, 1);
          }
        }
        this.tabs.push(route);
      }
    },

    /**
     * 关闭页签
     * @param key 页签的key
     * @returns
     */
    async closeTab(key: string) {
      const index = this.tabs.findIndex((item) => (item.fullPath || item.path) === key);
      if (index === -1) {
        return;
      }
      this.tabs.splice(index, 1);
      // 检查当前路由是否存在于tabList中
      const isActivated = this.tabs.findIndex((item) => {
        return item.fullPath === currentRoute.value.fullPath;
      });
      // 如果当前路由不存在于TabList中，尝试切换到其它路由
      if (isActivated === -1) {
        let pageIndex;
        if (index > 0) {
          pageIndex = index - 1;
        } else if (index < this.tabs.length - 1) {
          pageIndex = index + 1;
        } else {
          pageIndex = -1;
        }
        if (pageIndex >= 0) {
          const page = this.tabs[index - 1];
          const toTarget = getToTarget(page);
          await replace(toTarget);
        }
      }
      this.findGoDefaultRouter();
    },
    // 关闭所有页签
    async closeAllTabs() {
      this.tabs = this.tabs.filter((item) => item?.meta?.affix ?? false);
      this.closeCurrentTabAction();
      this.findGoDefaultRouter();
    },
    // 关闭所有左侧页签
    async closeLeftTabs(key: string) {
      const index = this.tabs.findIndex((item) => item.fullPath === key);
      if (index > 0) {
        const paths = this.tabs
          .slice(0, index)
          .filter((p) => !p.meta.affix)
          .map((p) => p.fullPath);
        this.tabs = this.tabs.filter((item) => !paths.includes(item.fullPath));
      }
    },
    // 关闭所有右侧页签
    async closeRightTabs(key: string) {
      const index = this.tabs.findIndex((p) => p.fullPath === key);
      if (index >= 0 && index < this.tabs.length - 1) {
        const paths = this.tabs
          .slice(index + 1, this.tabs.length)
          .filter((p) => !p.meta.affix)
          .map((p) => p.fullPath);
        this.tabs = this.tabs.filter((p) => !paths.includes(p.fullPath));
      }
    },
    // 关闭所有其他页签
    async closeOtherTabs(key: string) {
      const closePaths = this.tabs.filter((p) => key !== p.fullPath && !p.meta.affix).map((p) => p.fullPath);
      this.tabs = this.tabs.filter((p) => !closePaths.includes(p.fullPath));
    },
    // 关闭当前活动的页签
    async closeCurrentTabAction() {
      if (this.tabs.length > 0) {
        const page = this.tabs[this.tabs.length - 1];
        const toTarget = getToTarget(page);
        await replace(toTarget);
      } else {
        this.findGoDefaultRouter();
      }
    },
    // 切换到默认路由
    async findGoDefaultRouter() {
      if (this.tabs.length === 0) {
        goDefaultRouter();
      }
    },

    // 刷新页签
    async refresh() {
      const redo = useRedo(router);
      await redo();
    },

    /**
     * 页签拖动排序
     * @param oldIndex 旧的排序
     * @param newIndex 新的排序
     */
    async sortTabs(oldIndex: number, newIndex: number) {
      const currentTab = this.tabs[oldIndex];
      this.tabs.splice(oldIndex, 1);
      this.tabs.splice(newIndex, 0, currentTab);
    }
  }
});
