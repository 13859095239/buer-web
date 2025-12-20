<!--
  - 标准菜单
  - 适用于顶部、侧边栏的标准菜单,包含全部菜单项
  -
  - @author zoulan
  - @since 2023-09-05
  -->
<template>
  <!-- 垂直模式菜单 -->
  <TMenu
    v-if="mode === 'vertical'"
    v-model:expanded="openKeysComputed"
    v-model:value="selectedKey"
    :theme="siderTheme"
    class="pr-1px !b-none"
    :collapsed="menuCollapsed"
    :width="menuWidth"
    :expandMutex="menuAccordion"
    @open-change="onOpenChange"
  >
    <TreeItem :data="tree" />
    <template #operations>
      <ToogleMenu />
    </template>
  </TMenu>
  <!-- 水平模式菜单 -->
  <THeadMenu
    v-else
    v-model:expanded="openKeysComputed"
    v-model:value="selectedKey"
    class="!border-none"
    :width="500"
    expandType="popup"
    @open-change="onOpenChange"
  >
    <TreeItem :data="tree" />
  </THeadMenu>
</template>
<script setup lang="ts">
import { HeadMenu as THeadMenu, Menu as TMenu } from 'tdesign-vue-next';
import { computed, ref, toRefs, unref, watch } from 'vue';

import { useSiderSetting } from '/@/hooks/setting/useSiderSetting';
import { router } from '/@/router';
import { usePermissionStore } from '/@/store/modules/permission';
import type { Menu } from '/@/types/system/permission';

import ToogleMenu from './toogleMenu/index.vue';
import TreeItem from './TreeItem.vue';

const props = withDefaults(defineProps<Props>(), {
  mode: 'vertical'
});
const { siderMenuWidth, siderMenuCollapsedWidth, siderTheme, menuCollapsed, menuAccordion } = useSiderSetting();
interface Props {
  /** 菜单数据 */
  tree: Menu[];
  /**
   * horizontal 水平模式
   * vertical 垂直模式
   */
  mode?: 'horizontal' | 'vertical';
}
const { tree, mode } = toRefs(props);
const permissionStore = usePermissionStore();
const selectedKey = ref<string>();
const openKeys = ref<string[]>([]) || undefined;
/** 展开的节点 */
const openKeysComputed = computed({
  get() {
    return mode.value !== 'horizontal' && !menuCollapsed.value ? openKeys.value : [];
  },
  set(value: string[]) {
    openKeys.value = value!;
  }
});
const onOpenChange = (keys: string[]) => {
  if (keys.length === 0) {
    if (menuCollapsed.value && selectedKey.value) {
      openSelectedMenu();
    }
  } else if (menuAccordion.value) {
    const lastKey = keys[keys.length - 1];
    const parents: Menu[] = permissionStore.getParentMenus((p) => p.path === lastKey, true);
    const paths = parents.map((p) => p.path);
    openKeysComputed.value = paths;
  }
};
/** 菜单宽度配置[展开模式,收缩模式] */
const menuWidth = computed(() => {
  // 扣除右侧边框宽度
  const width = [unref(siderMenuWidth) - 1, unref(siderMenuCollapsedWidth) - 1];
  return width;
});
/** 观察路由变化，展开对应菜单节点 */
watch(
  router.currentRoute,
  (route) => {
    const { fullPath } = route;
    selectedKey.value = fullPath;
    const parents: Menu[] = permissionStore.getParentMenus((p) => p.path === fullPath);
    const paths = parents.map((p) => p.path);
    openKeysComputed.value = paths;
  },
  { deep: true, immediate: true }
);

watch(menuAccordion, () => {
  openSelectedMenu();
});

function openSelectedMenu() {
  const parents: Menu[] = permissionStore.getParentMenus((p) => p.path === selectedKey.value);
  const paths = parents.map((p) => p.path);
  openKeysComputed.value = paths;
}
</script>
<style lang="less" scoped>
.t-head-menu {
  :deep(.t-head-menu__inner) {
    height: auto !important;
  }
}
</style>
