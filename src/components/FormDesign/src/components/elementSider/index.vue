<template>
  <BasicScrollbar
    class="w-250px flex flex-none"
    style="height: calc(100%)"
  >
    <div class="flex">
      <Collapse
        v-model:value="activeKey"
        class="w-full"
      >
        <CollapsePanel
          v-for="elementGroup in elementGroupData"
          :key="elementGroup.label"
          :header="elementGroup.label"
        >
          <VueDraggable
            v-model="list1"
            :animation="150"
            ghostClass="ghost"
            :group="{ name: 'people', pull: 'clone', put: false }"
            :clone="clone"
            :sort="false"
            class="flex flex-row flex-wrap gap-10px"
          >
            <div
              v-for="element in elementGroup.elements"
              :key="element.code"
              class="h-50px w-100px cursor-move rounded bg-gray-500/5 p-3"
            >
              {{ element.label }}
            </div>
          </VueDraggable>
        </CollapsePanel>
      </Collapse>
    </div>
  </BasicScrollbar>
</template>
<script setup lang="ts">
import { Collapse } from 'tdesign-vue-next';
import { ref } from 'vue';
import { VueDraggable } from 'vue-draggable-plus';

import { BasicScrollbar } from '/@/components/Scrollbar';

import { elementGroupData } from '../../data/elementGroupData';

const CollapsePanel = Collapse.Panel;
const activeKey = ref(['1']);

const list1 = ref(
  elementGroupData
    .map((item) => item.elements)
    .flat()
    .map((item) => ({
      code: item.code,
      label: item.label
    }))
);

function clone(element: Record<'code' | 'label', string>) {
  return {
    code: `${element.code}-clone-${element.code}`,
    label: `${element.label}-clone-${element.label}`
  };
}
</script>
