<!--
  - 顶部路由页签
  -
  - @author zoulan
  - @since 2023-09-05
  -->
<template>
  <div class="app-multiple-tabs">
    <Tabs
      v-model:value="activeKey"
      class="w-full"
      type="editable-card"
      theme="card"
      :tabBarGutter="3"
      :hideAdd="true"
      @change="handleChange"
      @remove="removeTab"
    >
      <TabPanel
        v-for="(item, index) in getTabsState"
        :key="index"
        :value="item.fullPath"
        :label="item.name?.toString()"
        :removable="true"
      >
      </TabPanel>
      <template #action>
        <TabRedo />
        <DropdownContent
          isExtra
          :tabItem="$route"
        />
        <FoldButton />
      </template>
    </Tabs>
  </div>
</template>
<script setup lang="ts">
import { TabPanel, Tabs } from 'tdesign-vue-next';
import { computed, ref } from 'vue';

import { useHeaderSetting } from '/@/hooks/setting/useHeaderSetting';
import { router } from '/@/router';
import { useMultipleTabStore } from '/@/store/modules/multipleTab';

import DropdownContent from './components/DropdownContent.vue';
import FoldButton from './components/FoldButton.vue';
import TabRedo from './components/TabRedo.vue';
import { useTabsDrag } from './hooks/useTabSortable';
import { useWatch } from './hooks/useWatch';

const { multiTabsHeight } = useHeaderSetting();
const tabStore = useMultipleTabStore();
const activeKey = ref('');
const { push } = router;
useTabsDrag([]);
useWatch(activeKey);
const getTabsState = computed(() => {
  return tabStore.getTabs.filter((item) => !item.meta?.hideTab);
});
/** 删除页签 */
const removeTab = ({ value: val }) => {
  tabStore.closeTab(val);
};
/** 页签切换 */
const handleChange = (targetKey: string) => {
  push({ path: targetKey });
};
const multiTabsHeightComputed = computed(() => {
  return `${multiTabsHeight.value}px`;
});
</script>
<!-- eslint-disable vue-scoped-css/enforce-style-type -->
<style lang="less">
// 用这个方法就可以将高度值写进less参数中
@multiple-tabs-height: v-bind(multiTabsHeightComputed);
@import './style/index.less';
</style>
