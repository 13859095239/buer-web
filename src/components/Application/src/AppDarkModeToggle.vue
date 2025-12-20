<!--
  - 切换皮肤Switch模式组件
  -
  - @author zoulan
  - @since 2023-09-05
  -->
<template>
  <Switch
    v-model:checked="value"
    @change="change"
  >
    <template #label="slotProps">
      <div
        v-if="slotProps.value"
        class="i-my-icons-sun"
      />
      <div
        v-else
        class="i-my-icons-moon"
      />
    </template>
  </Switch>
</template>
<script setup lang="ts">
import type { SwitchValue } from 'tdesign-vue-next';
import { Switch } from 'tdesign-vue-next';
import { ref } from 'vue';

import { THEME_ENUM } from '/@/constants/appConstants';
import { useDark } from '/@/hooks/setting/useDark';
import { useAppStore } from '/@/store/modules/app';

const { themeChange } = useDark();
const appStore = useAppStore();
const value = ref(appStore.projectSetting?.theme === THEME_ENUM.DARK);
const change = (isDark: SwitchValue, context: { e: MouseEvent }) => {
  themeChange(isDark as boolean, context.e);
};
</script>
