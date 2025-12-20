/**
 * <p>
 * 框架布局配置 hooks
 * </p>
 *
 * @author zoulan
 * @since 2023-06-07
 */
import { storeToRefs } from 'pinia';
import { computed, unref } from 'vue';

import { LAYOUT_MODE_ENUM, THEME_ENUM } from '/@/constants/appConstants';
import { useAppStore } from '/@/store/modules/app';

import { useSiderSetting } from './useSiderSetting';

export function useRootSetting() {
  const appStore = useAppStore();
  const stores = storeToRefs(appStore);
  const { menuCollapsed } = useSiderSetting();
  const theme = computed(() => stores.projectSetting!.value!.theme!);
  const themeMode = computed(() => stores.projectSetting!.value!.themeMode!);
  const layoutMode = computed(() => stores.projectSetting?.value?.layoutMode);
  const showLogo = computed(() => stores.projectSetting?.value?.showLogo);
  const showWatermark = computed(() => stores.projectSetting?.value?.showWatermark);
  const rounded = computed(() => stores.projectSetting?.value?.rounded);
  const openTransitionAnimation = computed(() => stores.projectSetting?.value?.openTransitionAnimation);
  const transitionAnimationMode = computed(() => stores.projectSetting?.value?.transitionAnimationMode);
  const openTransitionProgress = computed(() => stores.projectSetting?.value?.openTransitionProgress);
  const openTransitionLoading = computed(() => stores.projectSetting?.value?.openTransitionLoading);
  const contentFullscreen = computed(() => stores.projectSetting?.value?.contentFullscreen);
  const showTitle = computed(() => {
    const layoutMode = unref(useRootSetting().layoutMode);
    switch (layoutMode) {
      case LAYOUT_MODE_ENUM.HEADER_NAV:
        return !menuCollapsed.value;
    }
    return true;
  });

  /** 监听windows系统主题变化 */
  function addSystemThemeListener() {
    // 监听系统主题偏好设置变化
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', ({ matches: isDark }) => {
      // 如果偏好设置中主题模式为auto，则跟随系统更新
      if (themeMode.value === 'auto') {
        stores.projectSetting.value.theme = isDark ? THEME_ENUM.DARK : THEME_ENUM.LIGHT;
      }
    });
  }
  /** 获取当前windows系统主题 */
  function getSystemTheme() {
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  }
  /** 全屏/正常显示内容 */
  function toogleContent(show: boolean | undefined) {
    if (show !== undefined) {
      appStore.setProjectSetting({
        contentFullscreen: show
      });
    } else {
      // 未设置 show 采用 toogle
      appStore.setProjectSetting({
        contentFullscreen: !show
      });
    }
  }
  return {
    theme,
    layoutMode,
    showLogo,
    showTitle,
    showWatermark,
    rounded,
    openTransitionAnimation,
    transitionAnimationMode,
    addSystemThemeListener,
    getSystemTheme,
    openTransitionProgress,
    openTransitionLoading,
    contentFullscreen,
    toogleContent
  };
}
