/**
 * app store
 *
 * @author zoulan
 * @since 2023-05-22
 */
import { defineStore } from 'pinia';
import { Color } from 'tvision-color';

import { useRootSetting } from '/@/hooks/setting/useRootSetting';
import { PROJECT_SETTING as gobalProjectSetting } from '/@/settings/projectSetting';
import { generateColorMap, insertThemeStylesheet } from '/@/utils/color';

import type { TColorSeries } from '../../settings/colorSetting';
import type { ProjectSetting } from '../../types/app/config';

interface AppState {
  projectSetting: ProjectSetting;
  colorSeries: TColorSeries;
  contentHeight: number;
}
export const useAppStore = defineStore('app', {
  state: (): AppState => ({
    /** 项目默认设置 */
    projectSetting: gobalProjectSetting,
    /** 主题色缓存库 */
    colorSeries: {} as TColorSeries,
    contentHeight: 0
  }),
  getters: {
    // 获取项目设置
    getProjectSetting(): ProjectSetting {
      return this.projectSetting as ProjectSetting;
    }
  },
  actions: {
    // 主题色调改变
    changeTheme(color) {
      this.setProjectSetting({ colorMode: color });
      const { theme } = useRootSetting();
      const mode = theme.value;
      // 以主题色加显示模式作为键
      const colorKey = `${color}[${mode}]`;
      let colorMap = this.colorSeries[colorKey];
      // 如果不存在色阶，就需要计算
      if (colorMap === undefined) {
        const [{ colors: newPalette, primary: brandColorIndex }] = Color.getColorGradations({
          colors: [color],
          step: 10,
          remainInput: false // 是否保留输入 不保留会矫正不合适的主题色
        });
        colorMap = generateColorMap(color, newPalette, mode, brandColorIndex);
        this.colorSeries[colorKey] = colorMap;
      }
      // TODO 需要解决不停切换时有反复插入 style 的问题
      insertThemeStylesheet(color, colorMap, mode);
      document.documentElement.setAttribute('theme-color', color);
    },
    // 按需配置
    setProjectSetting(value: ProjectSetting) {
      this.$patch({
        projectSetting: value
      });
      // createLocalStorage().set(PROJECT_SETTING_KEY, this.projectSetting);
    },
    // 恢复默认配置,配置从默认配置中还原
    resetSetting() {
      this.$patch({
        projectSetting: gobalProjectSetting
      });
    },
    setContentHeight(windowHeight: number) {
      let headerHeight = 0;
      const layoutHeader = document.getElementById('layoutHeader');
      if (layoutHeader) {
        headerHeight = layoutHeader.offsetHeight;
      }
      this.contentHeight = windowHeight - headerHeight;
    }
  },
  persist: {
    // 持久化存储
    pick: ['projectSetting', 'colorSeries']
  }
});
