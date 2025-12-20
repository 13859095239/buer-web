<!--
  - 侧边菜单
  -
  - @author zoulan
  - @since 2023-09-05
  -->
<template>
  <Aside
    v-model:collapsed="menuCollapsed"
    class="h-full border-r-1px border-r-solid !fixed"
    :style="{ width: `${siderWidth}px` }"
    style="border-color: var(--td-component-border)"
  >
    <AppHeaderLogo v-if="props.logo" />
    <AppMenu :tree="tree" />
  </Aside>
</template>
<script setup lang="ts">
import { Aside } from 'tdesign-vue-next';
import { ref } from 'vue';

import { AppHeaderLogo } from '/@/components/Application/index';
import { useSiderSetting } from '/@/hooks/setting/useSiderSetting';
import { usePermissionStore } from '/@/store/modules/permission';

import AppMenu from '../menu/headerSiderMenu/index.vue';

interface Props {
  /** 是否显示logo */
  logo: boolean;
}
const props = withDefaults(defineProps<Props>(), {});
const { siderWidth, menuCollapsed } = useSiderSetting();
const tree = ref(usePermissionStore().getTree);
</script>
