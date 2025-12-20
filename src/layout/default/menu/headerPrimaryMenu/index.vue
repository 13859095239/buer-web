<!--
  - 顶部水平一级菜单
  - 顶部菜单只显示一级时用到
  -
  - @author zoulan
  - @since 2023-09-05
  -->
<template>
  <HeadMenu
    v-model:value="selectedKey"
    class="flex flex-row flex-nowrap list-none space-x-4"
  >
    <MenuItem
      v-for="treeNode in tree"
      :key="treeNode.path"
      :value="treeNode.path"
      :class="{ e: treeNode.path === activeFirstMenu?.path }"
      @click="handleClick(treeNode)"
    >
      <template #icon>
        <Icon name="edit-1" />
      </template>
      {{ treeNode.name }}
    </MenuItem>
  </HeadMenu>
</template>
<script setup lang="ts">
import { HeadMenu, Icon, MenuItem } from 'tdesign-vue-next';
import { ref, unref, watch } from 'vue';

import { LAYOUT_MODE_ENUM } from '/@/constants/appConstants';
import { useRootSetting } from '/@/hooks/setting/useRootSetting';
import { activeFirstMenu, activeSecondMenu } from '/@/hooks/web/usePermission';
import { router } from '/@/router';
import { usePermissionStore } from '/@/store/modules/permission';
import type { Menu } from '/@/types/system/permission';
import { getFirstLeafNode } from '/@/utils/tree';

const { layoutMode } = useRootSetting();
const permissionStore = usePermissionStore();
const tree = permissionStore.getTree;
const selectedKey = ref<string>();
function handleClick(treeNode: Menu) {
  const { path } = getFirstLeafNode(treeNode);
  router.push(path);
}
/** 观察路由变化，展开对应菜单节点 */
watch(
  router.currentRoute,
  () => {
    switch (unref(layoutMode)) {
      // 当顶部包含菜单、侧边两列菜单时
      case LAYOUT_MODE_ENUM.HEADER_MIXED_NAV:
        selectedKey.value = activeSecondMenu?.value?.path;
        break;
      default:
        selectedKey.value = activeFirstMenu?.value?.path;
    }
  },
  { deep: true, immediate: true }
);
</script>
<style lang="less" scoped>
.t-head-menu {
  :deep(.t-head-menu__inner) {
    height: auto !important;
  }
}
</style>
