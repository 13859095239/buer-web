<!--
  - Tabs 容器
  - 顶部有标题、操作按钮,主内容为tabs
  -  
  -
  - @author zoulan
  - @since 2024-06-05
  -->
<template>
  <div class="w-full">
    <div class="flex">
      <!-- 顶部->左边标题栏 -->
      <div class="grow-0 self-center font-size-16px">
        <ContainerTitle
          v-bind="{
            title,
            subTitles,
            titleIcon
          }"
        />
      </div>
      <!-- 顶部->右侧操作栏 -->
      <ContainerAction
        class="grow"
        v-bind="{
          gobalActions,
          actions
        }"
      />
    </div>
    <div class="flex justify-center p-20px">
      <!-- 主内容 Tabs -->
      <Tabs
        v-model:value="model"
        class="w-full"
        v-bind="{ placement }"
      >
        <TabPanel
          v-for="option in filteredOptions"
          :key="option.value"
          :value="option.value"
          :label="option.label"
        >
          <div class="p-20px">
            <slot :name="option.value"></slot>
          </div>
        </TabPanel>
      </Tabs>
    </div>
  </div>
</template>
<script setup lang="ts">
import { defaultsDeep } from 'lodash-es';
import { TabPanel, Tabs } from 'tdesign-vue-next';
import { computed } from 'vue';

import { ContainerAction, ContainerTitle } from '/@/components/Container/components';

import type { TabContainerEmit, TabContainerMethods, TabContainerProps } from './types';

const props = defineProps<TabContainerProps>();
const emit = defineEmits<TabContainerEmit>();

const { title, subTitles, titleIcon, options, placement, gobalActions } = props;

/** 过滤后的选项 */
const filteredOptions = computed(() => options.filter((option) => option.show !== false));

/** 组件方法 */
const methods: Partial<TabContainerMethods> = {};
function getMethods(): TabContainerMethods {
  return methods as Required<TabContainerMethods>;
}
emit('update:methods', getMethods());

/** 选中的页签值 */
const model = defineModel<string>();

props.onRegister?.(getMethods());

const actions = computed(() => {
  const option = options.find((option) => option.value === model.value);
  return option?.actions;
});

defaultsDeep(methods, {});
</script>
