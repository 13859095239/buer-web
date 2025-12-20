/**
 * 侧边栏布局配置 hooks
 *
 * @author zoulan
 * @since 2023-06-07
 */
import { storeToRefs } from 'pinia';
import { computed, unref } from 'vue';

import { LAYOUT_MODE_ENUM } from '/@/constants/appConstants';
import { useAppStore } from '/@/store/modules/app';
import type { SiderSetting } from '/@/types/app/config';

import { activeFirstMenu, activeSecondMenu } from '../web/usePermission';
import { useRootSetting } from './useRootSetting';

export function useSiderSetting() {
  const appStore = useAppStore();
  const stores = storeToRefs(appStore);
  const siderMenuWidth = computed(() => stores.projectSetting!.value!.siderSetting!.siderMenuWidth!);
  const siderPrimaryMenuWidth = computed(() => stores.projectSetting!.value!.siderSetting!.siderPrimaryMenuWidth!);
  const siderMenuCollapsedWidth = computed(() => stores.projectSetting!.value!.siderSetting!.siderMenuCollapsedWidth!);
  const siderTheme = computed(() => stores.projectSetting?.value?.siderSetting?.siderTheme);
  const menuAccordion = computed(() => stores.projectSetting?.value?.siderSetting?.menuAccordion);
  const menuCollapsed = computed(() => stores.projectSetting?.value?.siderSetting?.menuCollapsed);
  const siderCollapsed = computed(() => {
    return useRootSetting().contentFullscreen.value === true
      ? true
      : stores.projectSetting?.value?.siderSetting?.siderCollapsed;
  });

  /** 侧边栏宽度 */
  const siderWidth = computed(() => {
    const layoutMode = unref(useRootSetting().layoutMode);
    let width = 0;
    if (siderCollapsed.value) {
      // 侧边栏隐藏
      return 0;
    }
    switch (layoutMode) {
      case LAYOUT_MODE_ENUM.SIDEBAR_MIXED_NAV:
        // 双列情况要考虑侧边栏一级菜单无子节点时隐藏
        // 当前选中的侧边栏是否包含子菜单
        const activeFirstMenuHasChild = (activeFirstMenu.value?.children?.length || 0) > 0;
        width = !activeFirstMenuHasChild
          ? unref(siderPrimaryMenuWidth)
          : (unref(menuCollapsed) ? unref(siderMenuCollapsedWidth) : unref(siderMenuWidth)) +
            unref(siderPrimaryMenuWidth);
        break;
      case LAYOUT_MODE_ENUM.SIDEBAR_NAV:
      case LAYOUT_MODE_ENUM.HEADER_Sidebar_NAV:
      case LAYOUT_MODE_ENUM.MIXED_NAV:
        width = unref(menuCollapsed) ? unref(siderMenuCollapsedWidth) : unref(siderMenuWidth);
        break;
      case LAYOUT_MODE_ENUM.HEADER_MIXED_NAV:
        // 双列情况要考虑侧边栏一级菜单无子节点时隐藏
        // 当前选中的侧边栏是否包含子菜单
        const activeSecondMenuHasChild = (activeSecondMenu.value?.children?.length || 0) > 0;
        width = !activeSecondMenuHasChild
          ? siderPrimaryMenuWidth.value
          : (unref(menuCollapsed) ? unref(siderMenuCollapsedWidth) : unref(siderMenuWidth)) +
            unref(siderPrimaryMenuWidth);
        break;
    }
    return width;
  });

  /** 展开/收缩侧边菜单 */
  function toogleMenu() {
    appStore.setProjectSetting({
      siderSetting: {
        menuCollapsed: !menuCollapsed.value
      }
    });
  }

  /** 显示/隐藏侧边栏 */
  function toogleSider(show?: boolean) {
    if (show !== undefined) {
      appStore.setProjectSetting({
        siderSetting: {
          siderCollapsed: !show
        }
      });
    } else {
      // 未设置 show 采用 toogle
      appStore.setProjectSetting({
        siderSetting: {
          siderCollapsed: !siderCollapsed.value
        }
      });
    }
  }

  /** 设置 siderSetting */
  function setSiderSetting(siderSetting: Partial<SiderSetting>): void {
    appStore.setProjectSetting({ siderSetting });
  }

  return {
    siderWidth,
    siderMenuWidth,
    siderMenuCollapsedWidth,
    siderPrimaryMenuWidth,
    menuAccordion,
    siderTheme,
    menuCollapsed,
    siderCollapsed,
    toogleMenu,
    toogleSider,
    setSiderSetting
  };
}
