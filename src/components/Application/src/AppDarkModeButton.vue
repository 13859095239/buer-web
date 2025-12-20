<template>
  <Tooltip
    v-if="dark"
    :title="title"
    placement="bottom"
    :mouseEnterDelay="0.5"
  >
    <Button
      shape="circle"
      variant="text"
      @click="(event) => toggleTheme(false, event)"
    >
      <template #icon>
        <div class="i-carbon-sun transform text-24px transition-800 hover:rotate-180"></div>
      </template>
    </Button>
  </Tooltip>
  <Tooltip
    v-else
    :title="title"
    placement="bottom"
    :mouseEnterDelay="0.5"
  >
    <Button
      shape="circle"
      variant="text"
      @click="(event) => toggleTheme(true, event)"
    >
      <template #icon>
        <div class="i-carbon-moon transform items-center text-24px transition-300 hover:rotate-20"></div>
      </template>
    </Button>
  </Tooltip>
</template>
<script setup lang="ts">
import { Button, Tooltip } from 'tdesign-vue-next';
import { computed, unref } from 'vue';

import { THEME_ENUM } from '/@/constants/appConstants';
import { useDark } from '/@/hooks/setting/useDark';
import { useAppStore } from '/@/store/modules/app';

const { themeChange } = useDark();
const appStore = useAppStore();
const title = computed(() => {
  return unref(dark) ? '切换浅色皮肤' : '切换深色皮肤';
});
const dark = computed(() => {
  return appStore.projectSetting?.theme === THEME_ENUM.DARK;
});
function toggleTheme(isDark: boolean, event: MouseEvent) {
  themeChange(isDark, event);
}
</script>
