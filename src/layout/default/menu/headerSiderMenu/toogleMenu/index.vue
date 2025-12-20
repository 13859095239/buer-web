<!--
  - 收缩菜单按钮
  -
  - @author zoulan
  - @since 2023-09-05
  -->
<template>
  <Button
    variant="text"
    class="flex items-center rounded-none border-none px-1 bg-none"
    @click="toogleMenu"
  >
    <div
      v-if="menuCollapsed"
      class="i-tdesign:chevron-right"
    />
    <div
      v-else
      class="i-tdesign:chevron-left"
    />
  </Button>
</template>
<script setup lang="ts">
import { Button } from 'tdesign-vue-next';

import { useSiderSetting } from '/@/hooks/setting/useSiderSetting';

const { menuCollapsed, toogleMenu } = useSiderSetting();
</script>
<style scoped>
.icon {
  font-size: 16px;
  vertical-align: 10px;
  margin: 0px 12px 0px 12px;
}
</style>
