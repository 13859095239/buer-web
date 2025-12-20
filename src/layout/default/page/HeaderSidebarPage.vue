<!--
  - 侧边导航入口页
  - 顶部通栏，侧边导航模式
  -
  - @author zoulan
  - @since 2023-09-05
  -->
<template>
  <Layout class="full of-hidden">
    <!-- 顶栏 -->
    <Header
      :logo="true"
      :menu="false"
      :primaryMenu="false"
      :breadcrumb="showBreadCrumb"
      :multiTabs="false"
      :toogleSider="true"
      :stretch="true"
      class="z-10"
    />
    <!-- 顶栏 固定高度 -->
    <HeaderFlexFix
      v-show="!headerCollapsed"
      :headerPrimary="true"
      :multiTabs="false"
    />
    <!-- 主框架 -->
    <Layout class="of-hidden">
      <!-- 主框架->侧边栏 -->
      <SiderLayout :logo="false" />
      <!-- 主框架->侧边栏 固定宽度 -->
      <SiderFlexFix />
      <!-- 主框架->二级框架  -->
      <Layout class="z-9 of-hidden">
        <!-- 主框架->二级框架 ->顶部路由页签 -->
        <MutiTabs
          v-if="showMultiTabs"
          class="fixed flex"
          :style="getStyle"
        />
        <!-- 主框架->二级框架 固定高度  -->
        <HeaderFlexFix
          :headerPrimary="false"
          :multiTabs="true"
        />
        <!-- 主框架->二级框架->内容页  -->
        <Content />
      </Layout>
    </Layout>
  </Layout>
</template>
<script setup lang="ts">
import { Layout } from 'tdesign-vue-next';
import type { CSSProperties } from 'vue';
import { computed, unref } from 'vue';

import { useHeaderSetting } from '/@/hooks/setting/useHeaderSetting';
import { useSiderSetting } from '/@/hooks/setting/useSiderSetting';

import Content from '../content/index.vue';
import HeaderFlexFix from '../flexFix/HeaderFlexFix.vue';
import SiderFlexFix from '../flexFix/SiderFlexFix.vue';
import Header from '../header/index.vue';
import MutiTabs from '../multiTabs/index.vue';
import SiderLayout from '../sider/index.vue';

const { showBreadCrumb, showMultiTabs, multiTabsHeight, headerCollapsed } = useHeaderSetting();
const { siderWidth } = useSiderSetting();
const getStyle = computed((): CSSProperties => {
  /** 顶部菜单宽度偏差值 */
  return {
    width: `calc(100% - ${unref(siderWidth)}px)`,
    height: `${multiTabsHeight.value}px`
  };
});
</script>
