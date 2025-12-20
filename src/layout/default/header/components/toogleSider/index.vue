<!--
  - 收缩菜单按钮
  -
  - @author zoulan
  - @since 2023-09-05
  -->
<template>
  <Button
    variant="text"
    class="mx-5px flex items-center rd-[var(--td-radius-medium)] border-none px-none leading-46px bg-none !size-32px"
    @click="toogleSider()"
  >
    <div
      v-if="siderCollapsed"
      class="i-tdesign:view-list"
    />
    <div
      v-else
      class="i-tdesign:view-list"
    />
  </Button>
</template>
<script setup lang="ts">
import { Button } from 'tdesign-vue-next';

import { useSiderSetting } from '/@/hooks/setting/useSiderSetting';

const { siderCollapsed, toogleSider } = useSiderSetting();
</script>
<style scoped>
.icon {
  font-size: 16px;
  vertical-align: 10px;
  margin: 0px 12px 0px 12px;
}
</style>
