<!--
  - 开关选择器 组件
  -
  - @author zoulan
  - @since 2024-05-08
  -->
<template>
  {{ min }}{{ max }}
  <Slider
    v-model:value="model"
    range
    v-bind="sliderRangePropsComputed"
  ></Slider>
</template>
<script setup lang="ts">
import { defaultsDeep } from 'lodash-es';
import { Slider } from 'tdesign-vue-next';

import { SILIDER_MAX, SILIDER_MIN } from '/@/settings/componentSetting';

import { useProps } from './hooks/useProps';
import type { BasicSliderRangeProps, SliderRangeEmit, SliderRangeMethods } from './types';

const props = withDefaults(defineProps<BasicSliderRangeProps>(), {
  min: SILIDER_MIN,
  max: SILIDER_MAX
});
const emit = defineEmits<SliderRangeEmit>();

/** 组件方法 */
const methods: Partial<SliderRangeMethods> = {};
function getMethods(): SliderRangeMethods {
  return methods as Required<SliderRangeMethods>;
}
emit('update:methods', getMethods());
props.onRegister?.(getMethods());
const model = defineModel<[number, number]>({
  set: (value) => {
    min.value = value[0];
    max.value = value[1];
    return value;
  }
});

// 最小值 model
const min = defineModel<number>('minValue', {
  set: (value) => {
    model.value[0] = value;
    return value;
  }
});
// 最大值 model
const max = defineModel<number>('maxValue', {
  set: (value) => {
    model.value[1] = value;
    return value;
  }
});
const { sliderRangePropsComputed } = useProps(props);
defaultsDeep(methods, {});
</script>
