<!--
  - 评分 组件
  -
  - @author zoulan
  - @since 2024-05-08
  -->
<template>
  <Rate v-model:value="model"></Rate>
</template>
<script setup lang="ts">
import { defaultsDeep } from 'lodash-es';
import { Rate } from 'tdesign-vue-next';

import { RATE_COUNT } from '/@/settings/componentSetting';

import type { BasicRateProps, RateEmit, RateMethods } from './types';

const props = withDefaults(defineProps<BasicRateProps>(), {
  allowHalf: true,
  count: RATE_COUNT
});
const emit = defineEmits<RateEmit>();
/** 组件方法 */
const methods: Partial<RateMethods> = {};
function getMethods(): RateMethods {
  return methods as Required<RateMethods>;
}
emit('update:methods', getMethods());
props.onRegister?.(getMethods());
const model = defineModel<number>();

defaultsDeep(methods, {});
</script>
