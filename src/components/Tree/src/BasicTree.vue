<!--
  - 树组件
  -
  - @author zoulan
  - @since 2023-07-29
  -->
<template>
  <Container
    ref="treeContainer"
    :height="props.height"
    :padding="false"
  >
    <template #searchForm>
      <SearchForm
        v-if="props.searchForm"
        v-bind="{ searchForm: props.searchForm, methods: getMethods() }"
      />
    </template>
    <Tree
      v-model:expanded="expandedKeys"
      v-model:actived="selectedValueComputed"
      v-model:value="checkedValueComputed"
      v-loading="loading"
      :keys="props.keys"
      :data="treeData"
      :activable="true"
      :checkable="props.checkable"
      :valueMode="props.valueMode"
      hover
      transition
      :load="methods.getLazyData"
      class="relative h-full"
    />
  </Container>
</template>
<script setup lang="ts">
import { defaultsDeep } from 'lodash-es';
import type { TreeOptionData } from 'tdesign-vue-next';
import { Tree } from 'tdesign-vue-next';
import { ref } from 'vue';

import { useLoading } from '/@/hooks/web/useLoading';
import { KEYS_CHILDREN, KEYS_DISABLED, KEYS_LABEL, KEYS_VALUE } from '/@/settings/componentSetting';

import SearchForm from './components/searchForm/index.vue';
import { useChecked } from './hooks/useChecked';
import { useData } from './hooks/useData';
import { useExpand } from './hooks/useExpand';
import { useSelected } from './hooks/useSelected';
import type { BasicTreeProps, TreeEmit, TreeMethods } from './types';

const props = withDefaults(defineProps<BasicTreeProps>(), {
  immediate: true,
  autoLoading: true,
  isLazy: true,
  valueMode: 'all',
  keys: () => {
    return {
      value: KEYS_VALUE,
      label: KEYS_LABEL,
      disabled: KEYS_DISABLED,
      children: KEYS_CHILDREN
    };
  }
});
const emit = defineEmits<TreeEmit>();
const { loading } = useLoading();
/** 选择的值,多个以逗号隔开 */
const model = defineModel<string>();
/** 选择的项,单选 */
const modelSelected = defineModel<Recordable>('selected');
/** 选择的label */
const modelSelectedLabel = defineModel<string>('selectedLabel');
/** 选中的值,多个以逗号隔开 */
const modelCheckedValue = defineModel<string>('checkedValue');
/** 选中的项列表，多选 */
const modelCheckedList = defineModel<Recordable[]>('checkedList');
/** 选中的值,多个以逗号隔开 */
const modelCheckedLabel = defineModel<string>('checkedLabel');

const methods: Partial<TreeMethods> = {};
const treeContainer = ref<HTMLElement>();
const treeData = ref<TreeOptionData[]>([]);
const expandedKeys = ref<string[]>([]);

function getMethods(): TreeMethods {
  return methods as Required<TreeMethods>;
}
emit('update:methods', getMethods());
props.onRegister?.(getMethods());
const { getLazyData, getData, search } = useData(props, treeData, expandedKeys, getMethods(), loading);
const { setChecked, getChecked, clearChecked, checkedValueComputed } = useChecked(props, treeData, {
  modelCheckedValue,
  modelCheckedList,
  modelCheckedLabel
});
const { getSelected, setSelected, clearSelected, selectedValueComputed } = useSelected(props, treeData, {
  model,
  modelSelected,
  modelSelectedLabel
});
const { setExpanded, getExpanded, clearExpanded } = useExpand(expandedKeys);

defaultsDeep(methods, {
  getLazyData,
  search,
  setChecked,
  getChecked,
  clearChecked,
  setExpanded,
  getExpanded,
  clearExpanded,
  getSelected,
  setSelected,
  clearSelected,
  loading
});
// 初始化时,自动加载数据
if (props.immediate) {
  getData?.();
}
</script>
<style lang="less" scoped>
:deep {
  .t-tree {
    // 复选框选中时背景色透明
    .t-tree__label.t-is-checked {
      background: none;
    }
  }
}
</style>
