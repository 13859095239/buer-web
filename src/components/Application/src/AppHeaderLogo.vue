<template>
  <div
    class="flex items-center !h-50px"
    :style="{ minWidth: `${siderWidth}px` }"
  >
    <img
      v-if="showLogo"
      :src="imgUrl"
      class="ml-10px size-8"
    />
    <span
      v-if="showTitle"
      class="app-logo-title overflow-ellipsis overflow-hidden whitespace-nowrap pl-7px text-16px font-700"
      >{{ miniTitle }}
    </span>
  </div>
</template>
<script setup lang="ts">
import imgUrl from '/@/assets/images/logo.png';
import { useRootSetting } from '/@/hooks/setting/useRootSetting';
import { useSiderSetting } from '/@/hooks/setting/useSiderSetting';

const { showLogo, showTitle } = useRootSetting();
const miniTitle = window.config.miniTitle;
const { siderWidth } = useSiderSetting();
</script>
