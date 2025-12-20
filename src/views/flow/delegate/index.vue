<!--
  - 委托管理 入口Tabs页
  -
  - @author zoulan
  - @since 2024-05-25
  -->
<template>
  <Tabs v-model:value="activeKey">
    <TabPanel
      key="tab1"
      tab="我的代理设置"
    >
      <MyDelegate />
    </TabPanel>
    <TabPanel
      key="tab2"
      tab="我代处理的订单"
    >
      <DelegateToMyTask />
    </TabPanel>
    <TabPanel
      key="tab3"
      tab="交办他人的订单"
    >
      <MyDelegateTask />
    </TabPanel>
  </Tabs>
</template>
<script lang="ts" setup>
import { TabPanel, Tabs } from 'tdesign-vue-next';
import { ref } from 'vue';

import DelegateToMyTask from './DelegateToMyTask/index.vue';
import MyDelegate from './MyDelegate/index.vue';
import MyDelegateTask from './MyDelegateTask/index.vue';

const activeKey = ref('tab1');
</script>
