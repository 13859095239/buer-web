<template>
  <BasicScrollbar
    class="flex grow"
    style="height: 500px"
  >
    <VueDraggable
      v-model="model.formDesignSchemas"
      :animation="150"
      group="people"
      ghostClass="ghost"
      class="h-full min-h-500px flex flex-row flex-wrap content-start rounded bg-gray-500/5"
    >
      <div
        v-for="schema in model.formDesignSchemas"
        :key="schema.label"
        class="h-50px flex basis-1/3 cursor-move self-start rounded bg-gray-500/5 p-3"
      >
        {{ schema.label }}
      </div>
    </VueDraggable>
  </BasicScrollbar>
</template>
<script setup lang="ts">
import { BasicScrollbar } from '/@/components/Scrollbar';

import type { FormDesignConfig } from '../../types';

const model = defineModel<FormDesignConfig>({ required: true });
</script>
