<!--
  - 下拉树选择 组件
  -
  - @author zoulan
  - @since 2023-08-15
  -->
<template>
  <TreeSelect
    v-model="selectedValueComputed"
    :keys="props.keys"
    :disabled="!props.editable"
    :multiple="props.multiple"
    :data="treeData"
    :loadData="getLazyData"
    :allowClear="props.allowClear"
    :showSearch="props.showSearch"
  />
</template>
<script setup lang="ts">
import { assign } from 'lodash-es';
import type { TreeOptionData } from 'tdesign-vue-next';
import { TreeSelect } from 'tdesign-vue-next';
import { ref } from 'vue';

import { KEYS_CHILDREN, KEYS_DISABLED, KEYS_LABEL, KEYS_VALUE } from '/@/settings/componentSetting';

import { useData } from './hooks/useData';
import { useSelected } from './hooks/useSelected';
import type { BasicTreeSelectProps, TreeSelectEmit, TreeSelectMethods } from './types';

const props = withDefaults(defineProps<BasicTreeSelectProps>(), {
  immediate: true,
  isLazy: true,
  allowClear: true,
  multiple: false,
  showSearch: true,
  editable: true,
  keys: () => {
    return {
      label: KEYS_LABEL,
      value: KEYS_VALUE,
      children: KEYS_CHILDREN,
      disabled: KEYS_DISABLED
    };
  }
});
const emit = defineEmits<TreeSelectEmit>();
/** 组件方法 */
const methods: Partial<TreeSelectMethods> = {};
function getMethods(): TreeSelectMethods {
  return methods as Required<TreeSelectMethods>;
}
emit('update:methods', getMethods());
props.onRegister?.(getMethods());

/** 选择的值,多个以逗号隔开 */
const model = defineModel<string>();
/** 选择的项,单选 */
const modelSelected = defineModel<Recordable>('selected');
/** 选择的label */
const modelSelectedLabel = defineModel<string>('selectedLabel');
/** 选中的项列表，多选 */
const modelSelectedList = defineModel<Recordable[]>('selectedList');

const treeData = ref<TreeOptionData[]>([]);

const { getLazyData, getData } = useData(props, treeData);
const { getSelected, setSelected, clearSelected, selectedValueComputed } = useSelected(props, treeData, {
  model,
  modelSelected,
  modelSelectedLabel,
  modelSelectedList
});

assign(methods, {
  getLazyData,
  getSelected,
  setSelected,
  clearSelected
});

props.immediate && getData?.();
</script>
