<template>
  <div class="w-250px flex flex-none flex-col">
    <div>属性编辑</div>
    <Tabs
      v-model:value="activeKey"
      style="position: relative"
    >
      <TabPanel
        key="tab1"
        tab="基础信息"
      >
        <ElementConfig />
      </TabPanel>
      <TabPanel
        key="tab2"
        tab="全局设置"
      >
        1
      </TabPanel>
    </Tabs>
  </div>
</template>
<script setup lang="ts">
import { Tabs } from 'tdesign-vue-next';
import { ref } from 'vue';

import { FormDesignConfig } from '../../types';
import ElementConfig from './elementConfig/index.vue';

const activeKey = ref('tab1');
</script>
