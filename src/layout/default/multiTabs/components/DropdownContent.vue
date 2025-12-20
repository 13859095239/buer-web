<template>
  <Dropdown
    placement="bottom-left"
    :minColumnWidth="156"
  >
    <Button
      variant="text"
      class="h-38px w-37px border-r rounded-none border-y-none border-l-none px-6px border-[var(--td-component-border)]!"
      ><div class="i-tdesign:chevron-down"></div>
    </Button>
    <DropdownMenu>
      <DropdownItem @click="handleClick('reload')">
        重新加载
        <template #prefixIcon><div class="i-tdesign:refresh" /></template>
      </DropdownItem>
      <DropdownItem
        divider
        @click="handleClick('closeTab')"
      >
        关闭标签页
        <template #prefixIcon><div class="i-tdesign:close" /></template>
      </DropdownItem>
      <DropdownItem @click="handleClick('closeLeftTabs')">
        关闭左侧标签页
        <template #prefixIcon><div class="i-tdesign:arrow-left" /></template>
      </DropdownItem>
      <DropdownItem
        divider
        @click="handleClick('closeRightTabs')"
      >
        关闭右边侧标签页
        <template #prefixIcon><div class="i-tdesign:arrow-right" /></template>
      </DropdownItem>
      <DropdownItem @click="handleClick('closeOtherTabs')">
        关闭其他标签页
        <template #prefixIcon><div class="i-tdesign:order-adjustment-column" /></template>
      </DropdownItem>
      <DropdownItem @click="handleClick('closeAllTabs')">
        关闭所有标签页
        <template #prefixIcon><div class="i-tdesign:arrow-left-right-1" /></template>
      </DropdownItem>
    </DropdownMenu>
  </Dropdown>
</template>
<script setup lang="ts">
import { Button, Dropdown, DropdownItem, DropdownMenu } from 'tdesign-vue-next';
import { toRefs } from 'vue';

import { router } from '/@/router';
import { useMultipleTabStore } from '/@/store/modules/multipleTab';

interface Props {
  tabKey?: string;
}
const props = defineProps<Props>();
const { tabKey } = toRefs(props);
const tabStore = useMultipleTabStore();
function handleClick(handleType: string) {
  const { currentRoute } = router;
  const key = tabKey?.value || currentRoute.value.fullPath;
  switch (handleType) {
    case 'reload':
      tabStore.refresh();
      break;
    case 'closeTab':
      tabStore.closeTab(key);
      break;
    case 'closeLeftTabs':
      tabStore.closeLeftTabs(key);
      break;
    case 'closeRightTabs':
      tabStore.closeRightTabs(key);
      break;
    case 'closeOtherTabs':
      tabStore.closeOtherTabs(key);
      break;
    case 'closeAllTabs':
      tabStore.closeAllTabs();
      break;
  }
}
</script>
