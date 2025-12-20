<!--
  - 弹出快捷键说明
  -
  - @author zoulan
  - @since 2023-07-12
  -->
<template>
  <BasicDrawer
    v-model:methods="drawerMethods"
    v-bind="drawerProps"
  >
    <div class="shortcut-keys-model">
      <p>Undo</p>
      <p>Ctrl + Z</p>
      <p>Redo</p>
      <p>Ctrl + Shift + Z / ctrl + Y</p>
      <p>Select All</p>
      <p>Ctrl + A</p>
      <p>Zoom</p>
      <p>Ctrl + Mouse Wheel</p>
      <p>Scrolling (Vertical)</p>
      <p>Mouse Wheel</p>
      <p>Scrolling (Horizontal)</p>
      <p>Shift + Mouse Wheel</p>
      <p>Direct Editing</p>
      <p>E</p>
      <p>Hand Tool</p>
      <p>H</p>
      <p>Lasso Tool</p>
      <p>L</p>
      <p>Space Tool</p>
      <p>S</p>
    </div>
  </BasicDrawer>
</template>
<script setup lang="ts">
import { shallowRef } from 'vue';

import type { BasicDrawerProps, DrawerMethods } from '/@/components/Drawer';
import { BasicDrawer } from '/@/components/Drawer';

let drawerMethods: DrawerMethods;
/**
 * 初始化Drawer
 */
const drawerProps = shallowRef<BasicDrawerProps>({
  title: `快捷键查看`
});

defineExpose({
  show: () => drawerMethods!.show()
});
</script>
