<!--
  - 混合垂直入口页
  - 垂直水平菜单共存
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
      :breadcrumb="false"
      :multiTabs="false"
      :primaryMenu="true"
      :toogleSider="false"
      :stretch="true"
      class="z-10"
    />
    <!-- 顶栏 固定高度 -->
    <HeaderFlexFix
      :headerPrimary="true"
      :multiTabs="false"
    />
    <!-- 主框架 -->
    <Layout class="of-hidden">
      <!-- 主框架->侧边栏 -->
      <Sider :logo="false" />
      <!-- 主框架->侧边栏 宽度固定 -->
      <SiderFlexFix />
      <!-- 主框架->二级框架 -->
      <Layout class="z-9 of-hidden">
        <!-- 主框架->二级框架->顶部路由页签 -->
        <MultiTabs
          v-if="showMultiTabs"
          :style="getMultiTabsFlexFixStyle"
        />
        <!-- 主框架->二级框架->顶部路由页签 固定高度 -->
        <HeaderFlexFix
          :headerPrimary="false"
          :multiTabs="true"
        />
        <!-- 主框架->二级框架->内容页 -->
        <AContent class="of-hidden">
          <Content />
        </AContent>
      </Layout>
    </Layout>
  </Layout>
</template>
<script setup lang="ts">
import { Content as AContent, Layout } from 'tdesign-vue-next';

import { useHeaderSetting } from '/@/hooks/setting/useHeaderSetting';

import Content from '../content/index.vue';
import HeaderFlexFix from '../flexFix/HeaderFlexFix.vue';
import SiderFlexFix from '../flexFix/SiderFlexFix.vue';
import Header from '../header/index.vue';
import MultiTabs from '../multiTabs/index.vue';
import Sider from '../sider/index.vue';

const { showMultiTabs, getMultiTabsFlexFixStyle } = useHeaderSetting();
</script>
