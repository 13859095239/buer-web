<!--
  - 混合双列
  - 双列、水平菜单共存模式
  -
  - @author zoulan
  - @since 2023-09-05
  -->
<template>
  <Layout class="full">
    <!-- 侧边栏 -->
    <Aside :style="{ width: `${siderWidth}px` }">
      <div class="h-full flex flex-row">
        <div
          class="w-80px flex-none border-r-1px border-r-solid"
          style="border-color: var(--td-component-border)"
        >
          <SiderPrimaryMenu :tree="sidePrimaryTree" />
        </div>
        <div
          v-if="activeSecondMenuHasChild"
          class="flex-1 border-r-1px border-r-solid"
          style="border-color: var(--td-component-border)"
        >
          <HeaderSiderMenu :tree />
        </div>
      </div>
    </Aside>
    <!-- 主框架 -->
    <Layout class="z-19 of-hidden">
      <!-- 主框架->顶部栏 -->
      <Header
        :logo="false"
        :menu="false"
        :breadcrumb="false"
        :multiTabs="showMultiTabs"
        :primaryMenu="true"
        :toogleSider="true"
        :stretch="false"
        class="z-10"
      />
      <!-- 主框架->顶部栏 固定高度 -->
      <HeaderFlexFix
        :headerPrimary="true"
        :multiTabs="true"
      />
      <!-- 主框架->内容页 -->
      <Content />
    </Layout>
  </Layout>
</template>
<script setup lang="ts">
import { Aside, Layout } from 'tdesign-vue-next';
import { computed, ref, watch } from 'vue';

import { useHeaderSetting } from '/@/hooks/setting/useHeaderSetting';
import { useSiderSetting } from '/@/hooks/setting/useSiderSetting';
import { activeFirstMenu, activeSecondMenu } from '/@/hooks/web/usePermission';
import type { Menu } from '/@/types/system/permission';

import Content from '../content/index.vue';
import HeaderFlexFix from '../flexFix/HeaderFlexFix.vue';
import Header from '../header/index.vue';
import HeaderSiderMenu from '../menu/headerSiderMenu/index.vue';
import SiderPrimaryMenu from '../menu/siderPrimaryMenu/index.vue';

const { showMultiTabs } = useHeaderSetting();
const { siderWidth } = useSiderSetting();
const tree = ref<Menu[]>([]);
const sidePrimaryTree = ref<Menu[]>([]);
// 当前选中的侧边栏是否包含子菜单
const activeSecondMenuHasChild = computed(() => {
  return (activeSecondMenu.value?.children?.length || 0) > 0;
});
watch(
  () => activeFirstMenu,
  (val) => {
    sidePrimaryTree.value = val.value?.children || [];
  },
  { deep: true, immediate: true }
);

watch(
  () => activeSecondMenu,
  (val) => {
    tree.value = val.value?.children || [];
  },
  { deep: true, immediate: true }
);
</script>
