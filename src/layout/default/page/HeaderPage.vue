<!--
  - 水平入口页
  - 平菜单模式，菜单全部显示在顶部
  -
  - @author zoulan
  - @since 2023-09-05
  -->
<template>
  <Layout class="full">
    <!-- 顶栏 -->
    <Header
      :logo="true"
      :menu="true"
      :primaryMenu="false"
      :breadcrumb="false"
      :multiTabs="true"
      :toogleSider="false"
      :stretch="true"
    />
    <HeaderFlexFix
      :headerPrimary="true"
      :multiTabs="true"
    />
    <!-- 主框架 -->
    <Layout class="z-9 of-hidden">
      <!-- 主框架->内容 -->
      <Content />
    </Layout>
  </Layout>
</template>
<script setup lang="ts">
import { Layout } from 'tdesign-vue-next';

import { useHeaderSetting } from '/@/hooks/setting/useHeaderSetting';

import Content from '../content/index.vue';
import HeaderFlexFix from '../flexFix/HeaderFlexFix.vue';
import Header from '../header/index.vue';

const { headerHeihgt } = useHeaderSetting();
</script>
