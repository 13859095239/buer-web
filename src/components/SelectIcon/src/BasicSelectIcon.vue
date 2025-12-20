<!--
  - 选择图标 组件
  - 图标较多,采用虚拟滚动条提高性能
  -
  - @author zoulan
  - @since 2025-08-06
  -->
<template>
  <Select
    v-model="model"
    v-model:popupVisible="popupVisible"
    :disabled="!props.editable"
    :placeholder="props?.placeholder"
    :style="{ width: '400px' }"
    :popupProps="{
      overlayInnerStyle: { width: '400px', height: '300px' },
      overlayInnerClassName: 'icon-select-popup'
    }"
    :scroll="{ type: 'virtual' }"
  >
    <Option
      v-for="(rowOption, index) in rowOptions"
      :key="index"
      :value="index"
      @click="onRowClick(rowOption)"
    >
      <!-- grid布局 固定单元格 -->
      <div class="grid grid-cols-12 justify-center gap--2 p2">
        <!-- 用flex固定每个单元格大小使其居中 -->
        <div
          v-for="(option, rowIndex) in rowOption"
          :key="rowIndex"
          class="flex flex-col cursor-pointer items-center p-1 hover:rd-[var(--td-radius-default)] hover:bg-[var(--td-brand-color-1)]"
          @click.stop="onIconClick(option.stem)"
        >
          <Icon
            :name="option.stem"
            style="color: var(--td-text-color-secondary)"
            class="size-20px"
          />
        </div>
      </div>
    </Option>
    <template #valueDisplay
      ><Icon
        :name="model"
        class="size-20px pr-8px"
      />{{ model }}</template
    >
  </Select>
</template>
<script setup lang="ts">
import { chunk, defaultsDeep } from 'lodash-es';
import { manifest } from 'tdesign-icons-vue-next';
import { Icon, Option, Select } from 'tdesign-vue-next';
import { computed, ref } from 'vue';

const props = withDefaults(defineProps<BasicSelectIconProps>(), {});
const emit = defineEmits<SelectIconEmit>();
import type { BasicSelectIconProps, SelectIconEmit, SelectIconMethods } from './types';

/** 组件方法 */
const methods: Partial<SelectIconMethods> = {};
function getMethods(): SelectIconMethods {
  return methods as Required<SelectIconMethods>;
}
emit('update:methods', getMethods());
props.onRegister?.(getMethods());
const model = defineModel<string>();
// 控制下拉显示/隐藏
const popupVisible = ref(false);
// 获取全部图标的列表,将图标分成,12个图标/行
const rowOptions = computed(() => chunk(manifest, 12));
function onRowClick(row) {
  // 点击一整行的第一个图标作为值
  model.value = row[0].stem;
  return false;
}
function onIconClick(name: string) {
  model.value = name;
  popupVisible.value = false;
}
defaultsDeep(methods, {});
</script>
<style lang="less" scoped>
// 弹出层默认在body内,不在子容器内,因此要用要用:global,仍然保持scoped
:global(.icon-select-popup) {
  .t-select__list {
    .t-select-option {
      span {
        @apply w-full!;
      }
    }
  }
}
// TODO: 不知道为什么必须在外围再写一个global,否则hover会有样式污染及不生效的问题
:global(.icon-select-popup .t-select-option:hover) {
  background-color: transparent !important;
}
</style>
