<!--
  - 输入框自动完成 组件
  -
  - @author zoulan
  - @since 2024-05-08
  -->
<template>
  <AutoComplete v-model="model"></AutoComplete>
</template>
<script setup lang="ts">
import { defaultsDeep } from 'lodash-es';
import { AutoComplete } from 'tdesign-vue-next';

import type { AutoCompleteEmit, AutoCompleteMethods, BasicAutoCompleteProps } from './types';

const props = defineProps<BasicAutoCompleteProps>();
const emit = defineEmits<AutoCompleteEmit>();
/** 组件方法 */
const methods: Partial<AutoCompleteMethods> = {};
function getMethods(): AutoCompleteMethods {
  return methods as Required<AutoCompleteMethods>;
}
emit('update:methods', getMethods());
props.onRegister?.(getMethods());
const model = defineModel<string>();

defaultsDeep(methods, {});
</script>
