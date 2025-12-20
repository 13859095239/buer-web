<!--
  - 垂直布局入口页
  - 侧边垂直菜单模式
  -
  - @author zoulan
  - @since 2023-09-05
  -->
<template>
  <Layout class="full">
    <!-- 侧边栏 -->
    <SiderLayout :logo="true" />
    <!-- 侧边栏 宽度固定 -->
    <SiderFlexFix />
    <!-- 主框架 -->
    <Layout class="z-9 of-hidden">
      <!-- 主框架->顶部栏 -->
      <Header
        :logo="false"
        :menu="false"
        :primaryMenu="false"
        :breadcrumb="showBreadCrumb"
        :multiTabs="showMultiTabs"
        :toogleSider="true"
        :stretch="false"
      />
      <!-- 主框架>顶部栏 高度固定 -->
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
import { Layout } from 'tdesign-vue-next';

import { useHeaderSetting } from '/@/hooks/setting/useHeaderSetting';

import Content from '../content/index.vue';
import HeaderFlexFix from '../flexFix/HeaderFlexFix.vue';
import SiderFlexFix from '../flexFix/SiderFlexFix.vue';
import Header from '../header/index.vue';
import SiderLayout from '../sider/index.vue';

const { showBreadCrumb, showMultiTabs, headerCollapsed } = useHeaderSetting();
</script>
