<!--
  - 框架内容页，路由
  -
  - @author zoulan
  - @since 2023-09-05
  -->
<template>
  <RouterView
    v-slot="{ Component, route }"
    class="relative w-full"
  >
    <!-- 页签切换动画效果 -->
    <transition
      :name="transitionAnimationMode"
      appear
      mode="out-in"
      :class="{ 'transition-none': !openTransitionAnimation }"
    >
      <keep-alive :include="getCaches">
        <component
          :is="Component"
          :key="route.fullPath"
        />
      </keep-alive>
    </transition>
  </RouterView>
</template>
<script setup lang="ts">
import { computed } from 'vue';
import { RouterView } from 'vue-router';

import { useRootSetting } from '/@/hooks/setting/useRootSetting';
import { useMultipleTabStore } from '/@/store/modules/multipleTab';

const tabStore = useMultipleTabStore();
const { transitionAnimationMode, openTransitionAnimation } = useRootSetting();
const getCaches = computed((): string[] => {
  const names = tabStore.getTabs.map((p) => p.name as string);
  return names;
});
</script>
