/**
 * 修改配置事件处理
 * 处理不同配置事件的逻辑
 *
 * @author zoulan
 * @since 2023-05-21
 */
import type { Ref } from 'vue';
import { ref } from 'vue';

import { useRootSetting } from '/@/hooks/setting/useRootSetting';
import { useAppStore } from '/@/store/modules/app';

import { HandlerEnum } from './enum';

const { getSystemTheme } = useRootSetting();
import { THEME_ENUM } from '/@/constants/appConstants';
/** 获取事件处理函数 */
export function useHandler(event: HandlerEnum): [Ref<any>, (val: any) => void] {
  const appStore = useAppStore();
  const value = ref(getValue(event));
  /** 配置改变触发 */
  function handler(val: any) {
    switch (event) {
      case HandlerEnum.CHANGE_SHOW_BREADCRUMB:
        appStore.setProjectSetting({ headerSetting: { showBreadCrumb: val } });
        value.value = val;
        break;
      case HandlerEnum.CHANGE_SHOW_BREADCRUMB_ICON:
        appStore.setProjectSetting({ headerSetting: { showBreadCrumbIcon: val } });
        value.value = val;
        break;
      case HandlerEnum.CHANGE_SHOW_MULTI_TABS:
        appStore.setProjectSetting({ headerSetting: { showMultiTabs: val } });
        value.value = val;
        break;
      case HandlerEnum.CHANGE_MENU_WIDTH:
        appStore.setProjectSetting({ siderSetting: { siderMenuWidth: val } });
        value.value = val;
        break;
      case HandlerEnum.CHANGE_THEME_MODE:
        // 是否深色模式
        let dark = false;
        if (val === 'auto') {
          dark = getSystemTheme();
        } else {
          dark = val === THEME_ENUM.DARK;
        }
        appStore.setProjectSetting({
          themeMode: val,
          theme: dark ? THEME_ENUM.DARK : THEME_ENUM.LIGHT
        });
        value.value = val;
        break;
      case HandlerEnum.CHANGE_COLOR_MODE:
        appStore.changeTheme(val);
        value.value = val;
        break;
      case HandlerEnum.CHANGE_MENU_ACCORDION:
        appStore.setProjectSetting({ siderSetting: { menuAccordion: val } });
        value.value = val;
        break;
      case HandlerEnum.CHANGE_MENU_COLLAPSED:
        appStore.setProjectSetting({ siderSetting: { menuCollapsed: val } });
        value.value = val;
        break;
      case HandlerEnum.CHANGE_LAYOUT_MODE:
        appStore.setProjectSetting({ layoutMode: val });
        value.value = val;
        break;
      case HandlerEnum.CHANGE_ROUNDED:
        appStore.setProjectSetting({ rounded: val });
        value.value = val;
        break;
      case HandlerEnum.CHANGE_SIDER_COLLAPSED:
        appStore.setProjectSetting({ siderSetting: { siderCollapsed: val } });
        value.value = val;
        break;
      case HandlerEnum.CHANGE_SIDER_THEME:
        appStore.setProjectSetting({ siderSetting: { siderTheme: val ? THEME_ENUM.DARK : THEME_ENUM.LIGHT } });
        value.value = val;
        break;
      case HandlerEnum.CHANGE_SHOW_WATERMARK:
        appStore.setProjectSetting({ showWatermark: val });
        value.value = val;
        break;
      case HandlerEnum.CHANGE_OPEN_TRANSITION_ANIMATION:
        appStore.setProjectSetting({ openTransitionAnimation: val });
        value.value = val;
        break;
      case HandlerEnum.CHANGE_TRANSITION_ANIMATION_MODE:
        appStore.setProjectSetting({ transitionAnimationMode: val });
        value.value = val;
        break;
      case HandlerEnum.CHANGE_OPEN_TRANSITION_PROGRESS:
        appStore.setProjectSetting({ openTransitionProgress: val });
        value.value = val;
        break;
      case HandlerEnum.CHANGE_OPEN_TRANSITION_LOADING:
        appStore.setProjectSetting({ openTransitionLoading: val });
        value.value = val;
        break;
    }
  }
  /** 获取配置当前 */
  function getValue(event: HandlerEnum) {
    switch (event) {
      case HandlerEnum.CHANGE_SHOW_BREADCRUMB:
        return appStore.projectSetting?.headerSetting?.showBreadCrumb;
      case HandlerEnum.CHANGE_SHOW_BREADCRUMB_ICON:
        return appStore.projectSetting?.headerSetting?.showBreadCrumbIcon;
      case HandlerEnum.CHANGE_SHOW_MULTI_TABS:
        return appStore.projectSetting?.headerSetting?.showMultiTabs;
      case HandlerEnum.CHANGE_THEME_MODE:
        return appStore.projectSetting?.themeMode;
      case HandlerEnum.CHANGE_COLOR_MODE:
        return appStore.projectSetting?.colorMode;
      case HandlerEnum.CHANGE_LAYOUT_MODE:
        return appStore.projectSetting?.layoutMode;
      case HandlerEnum.CHANGE_ROUNDED:
        return appStore.projectSetting?.rounded;
      case HandlerEnum.CHANGE_MENU_WIDTH:
        return appStore.projectSetting?.siderSetting?.siderMenuWidth;
      case HandlerEnum.CHANGE_MENU_ACCORDION:
        return appStore.projectSetting?.siderSetting?.menuAccordion;
      case HandlerEnum.CHANGE_MENU_COLLAPSED:
        return appStore.projectSetting?.siderSetting?.menuCollapsed;
      case HandlerEnum.CHANGE_SIDER_COLLAPSED:
        return appStore.projectSetting?.siderSetting?.siderCollapsed;
      case HandlerEnum.CHANGE_SIDER_THEME:
        return appStore.projectSetting?.siderSetting?.siderTheme === THEME_ENUM.DARK;
      case HandlerEnum.CHANGE_SHOW_WATERMARK:
        return appStore.projectSetting?.showWatermark;
      case HandlerEnum.CHANGE_OPEN_TRANSITION_ANIMATION:
        return appStore.projectSetting?.openTransitionAnimation;
      case HandlerEnum.CHANGE_TRANSITION_ANIMATION_MODE:
        return appStore.projectSetting?.transitionAnimationMode;
      case HandlerEnum.CHANGE_OPEN_TRANSITION_PROGRESS:
        return appStore.projectSetting?.openTransitionProgress;
      case HandlerEnum.CHANGE_OPEN_TRANSITION_LOADING:
        return appStore.projectSetting?.openTransitionLoading;
    }
  }
  return [value, handler];
}
