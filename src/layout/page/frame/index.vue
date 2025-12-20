<!--
  - 外嵌页面组件
  - 用于显示外部URL内容
  -
  - @author zoulan
  - @since 2023-05-22
  -->
<template>
  <div
    class="frame-container"
    :style="getWrapStyle"
  >
    <Loading
      :loading="loading"
      :style="getWrapStyle"
    >
      <iframe
        ref="frameRef"
        :src="actualFrameUrl"
        frameborder="0"
        scrolling="auto"
        @load="hideLoading"
      ></iframe>
    </Loading>
  </div>
</template>
<script lang="ts" setup>
import { Loading } from 'tdesign-vue-next';
import type { CSSProperties } from 'vue';
import { computed, onUnmounted, ref, toRefs, unref } from 'vue';
import { useRoute } from 'vue-router';

interface Props {
  frameUrl?: string;
}
const props = defineProps<Props>();
const { frameUrl } = toRefs(props);
const route = useRoute();
const loading = ref(true);
const heightRef = ref(window.innerHeight);
const frameRef = ref<HTMLIFrameElement>();

// 获取实际的frameUrl，优先使用props，其次使用路由meta
const actualFrameUrl = computed(() => {
  return frameUrl?.value || (route.meta?.frameUrl as string) || '';
});

const getWrapStyle = computed((): CSSProperties => {
  return {
    height: `${unref(heightRef)}px`
  };
});

function hideLoading() {
  loading.value = false;
}

// 监听窗口大小变化
function handleResize() {
  heightRef.value = window.innerHeight;
}

// 组件挂载时添加监听器
window.addEventListener('resize', handleResize);

// 组件卸载时移除监听器
onUnmounted(() => {
  window.removeEventListener('resize', handleResize);
});
</script>
<style lang="less" scoped>
.frame-container {
  width: 100%;
  height: 100%;
  position: relative;

  .t-loading {
    position: relative;
    height: 100%;
  }

  iframe {
    width: 100%;
    height: 100%;
    border: 0;
    box-sizing: border-box;
    background-color: #fff;
  }
}
</style>
