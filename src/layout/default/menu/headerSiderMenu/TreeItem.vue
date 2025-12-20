<!--
  - 菜单项 递归
  -
  - @author zoulan
  - @since 2023-09-05
  -->
<template>
  <template v-for="(item, index) in props.data">
    <!-- 菜单目录 -->
    <Submenu
      v-if="item.menuType === MENU_TYPE_ENUM.PATH"
      :key="index"
      :title="item.name"
      :value="item.path"
    >
      <template #icon>
        <div :class="`i-tdesign:${item.icon}`"></div>
      </template>
      <!-- 递归当前文件 -->
      <TreeItem
        :value="item.path"
        :data="item.children"
      />
    </Submenu>
    <!-- 菜单节点 -->
    <MenuItem
      v-else
      :key="`${index}_item`"
      :value="item.path"
      @click="pushRouter(item)"
    >
      <template #icon>
        <div :class="`i-tdesign:${item.icon}`"></div>
      </template>
      {{ item.name }}
    </MenuItem>
  </template>
</template>
<script setup lang="ts">
import { MenuItem, Submenu } from 'tdesign-vue-next';
import type { PropType } from 'vue';

import { MENU_TYPE_ENUM } from '/@/constants/systemConstants';
import { router } from '/@/router';
import type { Menu as SystemMenu } from '/@/types/system/permission';

const props = defineProps({
  data: {
    type: Array as PropType<SystemMenu[]>,
    default() {
      return [];
    }
  }
});
function pushRouter(item) {
  router.push({ path: item.path });
}
</script>
