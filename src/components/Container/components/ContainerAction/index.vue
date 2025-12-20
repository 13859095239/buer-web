<!--
  - 右侧操作栏
  -
  - @author zoulan
  - @since 2024-06-05
  -->
<template>
  <div class="flex gap-2 flex-justify-end">
    <template
      v-for="(action, index) in actionsComputed"
      :key="index"
    >
      <Button
        v-if="action.show !== false"
        :theme="action.theme || 'default'"
        @click="action.onClick"
      >
        {{ action.label }}
      </Button>
    </template>
  </div>
</template>
<script setup lang="ts">
import { Button } from 'tdesign-vue-next';
import { computed, toRefs } from 'vue';

import type { Action } from '../..';

interface Props {
  gobalActions?: Action[];
  actions?: Action[];
}
const props = defineProps<Props>();
const { gobalActions, actions } = toRefs(props);

const actionsComputed = computed(() => {
  const mergeActions: Action[] = [];
  actions.value?.forEach((action) => mergeActions.push(action));
  gobalActions.value?.forEach((action) => mergeActions.push(action));
  return mergeActions;
});
</script>
