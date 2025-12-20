<!--
  - 顶部菜单 框架页
  -
  - @author zoulan
  - @since 2023-09-05
  -->
<template>
  <Header
    id="layoutHeader"
    :style="getStyle"
    class="fixed flex flex-col !p-0"
  >
    <div
      v-show="!headerCollapsed"
      class="flex flex-row items-center border-b border-[var(--td-component-border)]"
      :style="{ height: `${headerPrimaryHeight}px`, 'line-height': `${headerPrimaryHeight}px` }"
    >
      <AppHeaderLogo v-if="props.logo" />
      <ToogleSider v-if="props.toogleSider" />
      <Breadcrumb
        v-if="props.breadcrumb && showBreadCrumb"
        class="w-400px"
      />
      <HeaderPrimaryMenu
        v-if="props.primaryMenu"
        class="flex-1"
      />
      <HeaderSiderMenu
        v-if="props.menu"
        :tree
        class="flex-1"
        mode="horizontal"
      />
      <div class="flex-1"></div>
      <RightSider class="min-w-100px" />
    </div>
    <MultiTabs v-if="props.multiTabs && showMultiTabs" />
  </Header>
</template>
<script setup lang="ts">
import { Header } from 'tdesign-vue-next';
import type { CSSProperties } from 'vue';
import { computed, unref } from 'vue';

import { AppHeaderLogo } from '/@/components/Application';
import { useHeaderSetting } from '/@/hooks/setting/useHeaderSetting';
import { useSiderSetting } from '/@/hooks/setting/useSiderSetting';
import { usePermissionStore } from '/@/store/modules/permission';

import HeaderPrimaryMenu from '../menu/headerPrimaryMenu/index.vue';
import HeaderSiderMenu from '../menu/headerSiderMenu/index.vue';
import MultiTabs from '../multiTabs/index.vue';
import Breadcrumb from './components/breadcrumb/index.vue';
import RightSider from './components/rightSider/index.vue';
import ToogleSider from './components/toogleSider/index.vue';

interface Props {
  /** 是否显示logo */
  logo: boolean;
  /** 是否显示收缩菜单按钮 */
  toogleSider: boolean;
  /** 是否显示菜单 */
  menu: boolean;
  /** 是否显示一级菜单 */
  primaryMenu: boolean;
  /** 是否显示面包屑 */
  breadcrumb: boolean;
  /** 是否显示标签栏 */
  multiTabs: boolean;
  /** 是否通铺 */
  stretch: boolean;
}
const props = withDefaults(defineProps<Props>(), {});
const { siderWidth } = useSiderSetting();
const { showBreadCrumb, showMultiTabs, headerPrimaryHeight, headerHeihgt, headerCollapsed } = useHeaderSetting();
const getStyle = computed((): CSSProperties => {
  /** 顶部菜单宽度偏差值 */
  const offsetWidth = props.stretch ? '0px' : `${unref(siderWidth)}px`;
  return {
    width: `calc(100% - ${offsetWidth})`,
    height: `${headerHeihgt.value}px`
  };
});
const tree = usePermissionStore().getTree;
</script>
