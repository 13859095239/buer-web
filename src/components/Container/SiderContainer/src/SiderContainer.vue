<!--
  - Sider 容器
  - 放在layout main中的组件
  -
  - @author zoulan
  - @since 2025-07-07
  -->
<template>
  <div class="relative w-full of-hidden p-10px">
    <div
      class="relative w-full flex flex-row of-hidden overflow-hidden rd-[var(--td-radius-medium)] bg-[var(--td-bg-color-container)]"
    >
      <!-- 左边侧边栏 -->
      <template v-if="props.siderDirection === 'left'">
        <div
          class="of-hidden p-20px"
          :style="{ width: `${props.siderWidth}px` }"
        >
          <!-- 左侧容器插槽 -->
          <slot name="sider"></slot>
        </div>
        <div
          class="flex-1 of-hidden"
          style="border-left: 1px solid var(--td-border-level-1-color)"
        >
          <!-- 默认主容器插槽 -->
          <slot></slot>
        </div>
      </template>
      <!-- 右边侧边栏 -->
      <template v-if="props.siderDirection === 'right'">
        <div
          class="flex-1 of-hidden"
          style="border-right: 1px solid var(--td-border-level-1-color)"
        >
          <!-- 默认主容器插槽 -->
          <slot></slot>
        </div>
        <div
          class="of-hidden p-20px"
          :style="{ width: `${props.siderWidth}px` }"
        >
          <!-- 右侧容器插槽 -->
          <slot name="sider"></slot>
        </div>
      </template>
    </div>
  </div>
</template>
<script setup lang="ts">
interface Props {
  /** 侧边栏宽度 */
  siderWidth?: number;
  /**
   * 侧边栏方向
   * left 左侧
   * right 右侧
   */
  siderDirection?: 'left' | 'right';
}
const props = withDefaults(defineProps<Props>(), {
  siderWidth: 230,
  siderDirection: 'left'
});
</script>
