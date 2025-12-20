<!--
  - 顶层容器
  - 放在layout main中的组件
  -
  - @author zoulan
  - @since 2024-05-02
  -->
<template>
  <div class="relative w-full p-10px">
    <div class="relative w-full overflow-hidden rd-[var(--td-radius-medium)] bg-[var(--td-bg-color-container)]">
      <slot></slot>
    </div>
  </div>
</template>
<script setup lang="ts"></script>
