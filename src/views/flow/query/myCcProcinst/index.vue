<!--
  - 委托管理 入口Tabs页
  -
  - @author zoulan
  - @since 2024-05-25
  -->
<template>
  <BasicContainer>
    <Tabs v-model:value="activeKey">
      <TabPanel
        label="未阅办"
        value="tab1"
      >
        <DoCc />
      </TabPanel>
      <TabPanel
        label="已阅办"
        value="tab2"
      >
        <DoneCc />
      </TabPanel> </Tabs
  ></BasicContainer>
</template>
<script lang="ts" setup>
import { TabPanel, Tabs } from 'tdesign-vue-next';
import { ref } from 'vue';

import { BasicContainer } from '/@/components/Container';

import DoCc from './DoCc.vue';
import DoneCc from './DoneCc.vue';

const activeKey = ref('tab1');
</script>
