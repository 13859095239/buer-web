<!--
  - 侧边垂直一级菜单
  - 顶部菜单只显示一级时用到
  -
  - @author zoulan
  - @since 2023-09-05
  -->
<template>
  <AMenu
    v-model:value="selectedKey"
    :width="siderPrimaryMenuWidth - 1"
    :theme="siderTheme"
  >
    <MenuItem
      v-for="treeNode in props.tree"
      :key="treeNode.path"
      :value="treeNode.path"
      class="flex flex-center size-64px! p-none!"
      @click="handleClick(treeNode)"
    >
      <div class="flex flex-center flex-col p-none">
        <div class="size-24px">
          <div class="i-tdesign:chart-line size-20px pb-8px pl-5px" />
        </div>
        <div class="w-50px overflow-hidden text-ellipsis text-center font-size-3 font-600">
          {{ treeNode.name }}
        </div>
      </div>
    </MenuItem>
  </AMenu>
</template>
<script setup lang="ts">
import { Menu as AMenu, MenuItem } from 'tdesign-vue-next';
import { ref, unref, watch } from 'vue';

import { LAYOUT_MODE_ENUM } from '/@/constants/appConstants';
import { useRootSetting } from '/@/hooks/setting/useRootSetting';
import { useSiderSetting } from '/@/hooks/setting/useSiderSetting';
import { activeFirstMenu, activeSecondMenu } from '/@/hooks/web/usePermission';
import { router } from '/@/router';
import type { Menu } from '/@/types/system/permission';
import { getFirstLeafNode } from '/@/utils/tree';

const props = withDefaults(defineProps<Props>(), {});
const { siderPrimaryMenuWidth, siderTheme } = useSiderSetting();
const { layoutMode } = useRootSetting();
interface Props {
  /** 菜单数据 */
  tree: Menu[];
}
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
<style lang="scss" scoped>
.t-menu {
  .t-menu__content {
    @apply flex;
  }
}
</style>
