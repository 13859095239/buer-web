<!--
  - highlight.js 高亮代码 弹出层包装
  -
  - @author zoulan
  - @since 2024-05-29
  -->
<template>
  <BasicModal
    v-model:methods="modalMethods"
    v-bind="modalProps"
  >
    <BasicHighlight :value="props.value" />
  </BasicModal>
</template>
<script setup lang="ts">
import { ref, shallowRef } from 'vue';

import type { BasicModalProps, ModalMethods } from '/@/components/Modal';
import { BasicModal } from '/@/components/Modal';

import BasicHighlight from './BasicHighlight.vue';

const props = defineProps({
  title: {
    type: String,
    required: true
  },
  value: {
    type: String,
    required: true
  }
});

const modalMethods = ref<ModalMethods>({} as ModalMethods);

const modalProps = shallowRef<BasicModalProps>({
  title: props.title,
  width: 'column-3',
  height: '80%',
  footer: false
});

defineExpose({
  show: () => modalMethods.value.show()
});
</script>
