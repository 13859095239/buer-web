<!--
  - 开关选择器 组件
  -
  - @author zoulan
  - @since 2024-05-08
  -->
<template>
  <Aside
    v-model:value="model"
    v-bind="sliderPropsComputed"
  ></Aside>
</template>
<script setup lang="ts">
import { defaultsDeep } from 'lodash-es';
import { Aside } from 'tdesign-vue-next';

import { SILIDER_MAX, SILIDER_MIN } from '/@/settings/componentSetting';

import { useProps } from './hooks/useProps';
import type { BasicSliderProps, SliderEmit, SliderMethods } from './types';

const props = withDefaults(defineProps<BasicSliderProps>(), {
  min: SILIDER_MIN,
  max: SILIDER_MAX
});
const emit = defineEmits<SliderEmit>();
/** 组件方法 */
const methods: Partial<SliderMethods> = {};

function getMethods(): SliderMethods {
  return methods as Required<SliderMethods>;
}
emit('update:methods', getMethods());
props.onRegister?.(getMethods());
const model = defineModel<number>();
const { sliderPropsComputed } = useProps(props);
defaultsDeep(methods, {});
</script>
