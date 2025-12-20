<template>
  <Button
    variant="text"
    class="h-38px w-37px border-x rounded-none border-y-none px-6px border-[var(--td-component-border)]!"
    @click="handleRedo"
  >
    <div class="i-tdesign:refresh"></div>
  </Button>
</template>
<script setup lang="ts">
import { Button } from 'tdesign-vue-next';

import { useMultipleTabStore } from '/@/store/modules/multipleTab';

const tabStore = useMultipleTabStore();
function handleRedo() {
  tabStore.refresh();
}
</script>
