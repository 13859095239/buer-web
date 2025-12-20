/**
 * <p>
 * 顶部布局配置 hooks
 * </p>
 *
 * @author zoulan
 * @since 2023-06-07
 */
import type { CSSProperties } from 'vue';
import { computed, unref } from 'vue';

import { LAYOUT_MODE_ENUM } from '/@/constants/appConstants';
import { useRootSetting } from '/@/hooks/setting/useRootSetting';
import { useSiderSetting } from '/@/hooks/setting/useSiderSetting';
import { useAppStore } from '/@/store/modules/app';
import type { HeaderSetting } from '/@/types/app/config';

export function useHeaderSetting() {
  const appStore = useAppStore();
  const { siderWidth } = useSiderSetting();
  const showBreadCrumb = computed(() => appStore.projectSetting!.headerSetting!.showBreadCrumb!);
  const showBreadCrumbIcon = computed(() => appStore.projectSetting!.headerSetting!.showBreadCrumbIcon!);
  const showMultiTabs = computed(() => appStore.projectSetting!.headerSetting!.showMultiTabs!);
  const headerCollapsed = computed(() =>
    useRootSetting().contentFullscreen.value === true ? true : appStore.projectSetting!.headerSetting?.headerCollapsed
  );

  /**
   * 顶部主栏高度，只包含局部header高度
   * 包含顶部菜单，不包含multiTabsHeight
   */
  const headerPrimaryHeight = computed(() => appStore.projectSetting!.headerSetting!.headerPrimaryHeight!);

  const multiTabsHeight = computed(() => appStore.projectSetting!.headerSetting!.multiTabsHeight!);

  /** 设置 headerSetting */
  function setHeaderSetting(headerSetting: Partial<HeaderSetting>): void {
    appStore.setProjectSetting({ headerSetting });
  }

  /**
   * 顶栏总体header高度
   * 如果顶栏包含multiTab,那么包含multiTabsHeight
   */
  const headerHeihgt = computed((): number => {
    const layoutMode = unref(useRootSetting().layoutMode);
    let tabsHeight = 0;
    switch (layoutMode) {
      case LAYOUT_MODE_ENUM.SIDEBAR_NAV:
      case LAYOUT_MODE_ENUM.SIDEBAR_MIXED_NAV:
      case LAYOUT_MODE_ENUM.HEADER_NAV:
      case LAYOUT_MODE_ENUM.HEADER_MIXED_NAV:
        tabsHeight = unref(showMultiTabs) ? unref(multiTabsHeight) : 0;
    }
    // 扣除边框-3
    // 当内容全屏时,不显示header,只显示multiTabsHeight
    return (headerCollapsed.value ? 0 : headerPrimaryHeight.value) + tabsHeight;
  });

  /** 显示/隐藏顶部栏 */
  function toogleHeader(show: boolean | undefined) {
    if (show !== undefined) {
      appStore.setProjectSetting({
        headerSetting: {
          headerCollapsed: !show
        }
      });
    } else {
      // 未设置 show 采用 toogle
      appStore.setProjectSetting({
        headerSetting: {
          headerCollapsed: !headerCollapsed.value
        }
      });
    }
  }

  /** MultiTabs FlexFix 模式下的样式 */
  const getMultiTabsFlexFixStyle = computed((): CSSProperties => {
    /** 顶部菜单宽度偏差值 */
    return {
      width: `calc(100% - ${unref(siderWidth)}px)`,
      height: `${multiTabsHeight.value}px`,
      /** 固定容器样式 */
      position: 'fixed',
      display: 'flex'
    };
  });

  return {
    headerHeihgt,
    headerPrimaryHeight,
    headerCollapsed,
    setHeaderSetting,
    showBreadCrumb,
    showBreadCrumbIcon,
    showMultiTabs,
    multiTabsHeight,
    toogleHeader,
    getMultiTabsFlexFixStyle
  };
}
