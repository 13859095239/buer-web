<!--
  - 解决顶栏header在flex布局下,高度填充,固定滚动条
  -
  - @author zoulan
  - @since 2023-09-05
  -->
<template>
  <div :style="getStyle"></div>
</template>
<script setup lang="ts">
import type { CSSProperties } from 'vue';
import { computed, toRefs, unref } from 'vue';

import { useHeaderSetting } from '/@/hooks/setting/useHeaderSetting';
import { useSiderSetting } from '/@/hooks/setting/useSiderSetting';

interface Props {
  /** 是否包含顶部主栏高度 */
  headerPrimary: boolean;
  /** 是否包含顶部路由页签高度 */
  multiTabs: boolean;
}
const props = defineProps<Props>();
const { headerPrimary, multiTabs } = toRefs(props);
const { headerPrimaryHeight, multiTabsHeight, headerCollapsed } = useHeaderSetting();
const { siderWidth } = useSiderSetting();
// 组件高度
const flexFixHeight = computed(() => {
  // headerCollapsed 当内容全屏时候高度为0,只留下multiTabsHeight
  return (
    (headerPrimary.value && !headerCollapsed.value ? headerPrimaryHeight.value : 0) +
    (multiTabs.value ? multiTabsHeight.value : 0)
  );
});
const getStyle = computed((): CSSProperties => {
  const width = `${unref(siderWidth)}px`;
  return {
    width,
    maxWidth: width,
    minWidth: width,
    height: `${flexFixHeight.value}px`,
    minHeight: `${flexFixHeight.value}px`
  };
});
</script>
