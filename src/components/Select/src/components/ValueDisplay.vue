<!--
  - 选择器值显示组件
  - 封装与 tag 相关的逻辑和方法
  -
  - @author zoulan
  - @since 2023-08-15
  -->
<template>
  <div class="flex flex-wrap gap-1">
    <VueDraggable
      v-model="displayTags"
      :disabled="dragDisabled"
      @end="onDragEnd"
    >
      <Tag
        v-for="(item, index) in displayTags"
        :key="index"
        size="small"
        :closable="multiple"
        :class="{ draggable: multiple && drag }"
        @close="removeTag(item.value as string)"
      >
        {{ item.label }}
      </Tag>
    </VueDraggable>
  </div>
</template>
<script setup lang="ts">
import { Tag } from 'tdesign-vue-next';
import { computed } from 'vue';
import { VueDraggable } from 'vue-draggable-plus';

import type { TagItem } from '../types';

interface ValueDisplayProps {
  /** 是否多选 */
  multiple?: boolean;
  /** 是否启用拖拽 */
  drag?: boolean;
}

const props = withDefaults(defineProps<ValueDisplayProps>(), {
  multiple: false,
  drag: false
});

/** 选中的值,多个以逗号隔开 */
const modelValue = defineModel<string>();
/** 选中的标签文本,多个以逗号隔开 */
const selectedLabel = defineModel<string>('selectedLabel');
/** 显示的标签数据（基于modelValue和selectedLabel生成） */
const displayTags = computed((): TagItem[] => {
  if (!modelValue.value) return [];

  if (props.multiple) {
    // 多选：从modelValue中解析逗号分隔的值，从selectedLabel中解析对应的标签
    const values = modelValue.value.split(',').filter(Boolean);
    const labels = selectedLabel.value?.split(',').filter(Boolean) || [];

    return values.map((value, index) => ({
      value: value.trim(),
      label: labels[index]?.trim() || value.trim()
    }));
  } else {
    // 单选：直接使用modelValue和selectedLabel
    return [
      {
        value: modelValue.value,
        label: selectedLabel.value || modelValue.value
      }
    ];
  }
});

/** 是否禁用拖拽 */
const dragDisabled = computed(() => {
  return !props.multiple || !props.drag || displayTags.value.length <= 1;
});

/** 拖拽结束回调 */
function onDragEnd() {
  // 同步更新modelValue和selectedLabel
  const newValues = displayTags.value.map((tag) => tag.value);
  const newLabels = displayTags.value.map((tag) => tag.label);

  modelValue.value = newValues.join(',');
  selectedLabel.value = newLabels.join(',');
}

/** 移除标签 */
function removeTag(value: string) {
  if (props.multiple) {
    // 多选：从modelValue中移除对应的值，同时更新selectedLabel
    const currentValues = modelValue.value?.split(',').map((v) => v.trim()) || [];
    const currentLabels = selectedLabel.value?.split(',').map((l) => l.trim()) || [];

    const valueIndex = currentValues.indexOf(value);
    if (valueIndex !== -1) {
      currentValues.splice(valueIndex, 1);
      currentLabels.splice(valueIndex, 1);
    }

    modelValue.value = currentValues.length > 0 ? currentValues.join(',') : undefined;
    selectedLabel.value = currentLabels.length > 0 ? currentLabels.join(',') : undefined;
  } else {
    // 单选：清空选择
    modelValue.value = undefined;
    selectedLabel.value = undefined;
  }
}
</script>
