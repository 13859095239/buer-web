<!--
  - segmented 容器
  -
  - @author zoulan
  - @since 2024-05-12
  -->
<template>
  <div>
    <div class="flex">
      <!-- 左边标题栏 -->
      <div class="grow self-center font-size-16px">
        <ContainerTitle
          v-bind="{
            title,
            titleIcon,
            subTitles
          }"
        />
      </div>
      <!-- 中间选项栏 -->
      <div class="grow-0">
        <RadioGroup
          v-model="model"
          variant="primary-filled"
          @change="onChange"
        >
          <RadioButton
            v-for="(option, index) in options"
            :key="index"
            :value="option.value"
          >
            {{ option.label }}
          </RadioButton>
        </RadioGroup>
      </div>
      <!-- 右侧操作栏 -->
      <ContainerAction
        class="grow"
        v-bind="{
          gobalActions,
          actions
        }"
      />
    </div>
    <div class="flex justify-center p-20px">
      <!-- 遍历选项，每项一个插槽 -->
      <template v-for="option in options">
        <slot
          v-if="model === option.value"
          :name="option.value"
        ></slot>
      </template>
    </div>
  </div>
</template>
<script setup lang="ts">
import { defaultsDeep } from 'lodash-es';
import { RadioButton, RadioGroup } from 'tdesign-vue-next';
import { computed } from 'vue';

import { ContainerAction, ContainerTitle } from '/@/components/Container/components';

import type { SegmentedContainerEmit, SegmentedContainerMethods, SegmentedContainerProps } from './types';

const props = defineProps<SegmentedContainerProps>();
const emit = defineEmits<SegmentedContainerEmit>();
const { title, titleIcon, subTitles, options, onChange, gobalActions } = props;
/** 组件方法 */
const methods: Partial<SegmentedContainerMethods> = {};
function getMethods(): SegmentedContainerMethods {
  return methods as Required<SegmentedContainerMethods>;
}
emit('update:methods', getMethods());
props.onRegister?.(getMethods());

/** 选中的页签值 */
const model = defineModel<string>();

const actions = computed(() => {
  const option = options.find((option) => option.value === model.value);
  return option?.actions;
});

defaultsDeep(methods, {});
</script>
