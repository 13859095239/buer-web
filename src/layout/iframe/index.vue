<template>
  <div
    class="iframe-container"
    :style="getWrapStyle"
  >
    <Loading
      :loading="loading"
      size="large"
      :style="getWrapStyle"
    >
      <iframe
        ref="frameRef"
        :src="frameSrc"
        @load="hideLoading"
      ></iframe>
    </Loading>
  </div>
</template>
<script lang="ts" setup>
import { Loading } from 'tdesign-vue-next';
import type { CSSProperties } from 'vue';
import { computed, ref, toRefs, unref } from 'vue';

interface Props {
  frameSrc: string;
}
const props = defineProps<Props>();
const { frameSrc } = toRefs(props);
const loading = ref(true);
const heightRef = ref(window.innerHeight);
const frameRef = ref<HTMLFrameElement>();
const getWrapStyle = computed((): CSSProperties => {
  return {
    height: `${unref(heightRef)}px`
  };
});
function calcHeight() {}
function hideLoading() {
  loading.value = false;
  calcHeight();
}
</script>
<style lang="less" scoped>
@prefix-cls: ~'iframe-container';

.@{prefix-cls} {
  .ant-spin-nested-loading {
    position: relative;
    height: 100%;

    .ant-spin-container {
      width: 100%;
      height: 100%;
      padding: 10px;
    }
  }

  &__mask {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }

  iframe {
    width: 100%;
    height: 100%;
    overflow: hidden;
    background-color: @component-background;
    border: 0;
    box-sizing: border-box;
  }
}
</style>
