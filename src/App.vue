<!--
  - 应用程序入口承载页
  -
  - @author zoulan
  - @since 2023-08-14
  -->
<template>
  <ConfigProvider :globalConfig="globalConfig">
    <RouterView />
  </ConfigProvider>
</template>
<script lang="ts" setup>
import { useDark, watchImmediate } from '@vueuse/core';
import dayjs from 'dayjs';
import dayjsZhCN from 'dayjs/locale/zh-cn';
import { merge } from 'lodash-es';
import type { GlobalConfigProvider } from 'tdesign-vue-next';
import { ConfigProvider } from 'tdesign-vue-next';
import zhConfig from 'tdesign-vue-next/es/locale/zh_CN';
import { RouterView } from 'vue-router';

import { useAppStore } from '/@/store/modules/app';

import { THEME_ENUM } from './constants/appConstants';
import { useRootSetting } from './hooks/setting/useRootSetting';
import { PROJECT_SETTING } from './settings/projectSetting';

const appStore = useAppStore();
// 可以在此处定义更多自定义配置，具体可配置内容参看官方API文档
const customConfig: GlobalConfigProvider = {
  calendar: {},
  table: {},
  pagination: {}
};
// TDesign全局配置
const globalConfig: GlobalConfigProvider = merge({}, zhConfig, customConfig);

// 日期组件语言
dayjs.locale(dayjsZhCN);

const dark = useDark({
  selector: 'html',
  valueDark: 'dark',
  valueLight: '',
  // 利用html元素theme-mode属性切换样式
  attribute: 'theme-mode'
});

const { theme, rounded } = useRootSetting();
watchImmediate(theme, () => {
  // 设置系统默认主题色
  appStore.changeTheme(appStore.projectSetting.colorMode || PROJECT_SETTING.colorMode);
  // 设置系统主题
  dark.value = theme.value === THEME_ENUM.DARK;
});
watchImmediate(rounded, (val) => {
  // 设置系统圆角
  document.documentElement.setAttribute('rounded-mode', val!);
});
</script>
