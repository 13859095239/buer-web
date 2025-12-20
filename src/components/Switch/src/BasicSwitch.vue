<!--
  - 开关选择器 组件
  -
  - @author zoulan
  - @since 2024-05-08
  -->
<template>
  <Switch
    v-model="model"
    :size
  >
  </Switch>
</template>
<script setup lang="ts">
import { defaultsDeep } from 'lodash-es';
import { Switch } from 'tdesign-vue-next';
import { toRefs } from 'vue';

import type { BasicSwitchProps, SwitchEmit, SwitchMethods } from './types';

const props = withDefaults(defineProps<BasicSwitchProps>(), {
  size: 'medium',
  customValue: () => [true, false]
});
const emit = defineEmits<SwitchEmit>();

const { size } = toRefs(props);

/** 组件方法 */
const methods: Partial<SwitchMethods> = {};
function getMethods(): SwitchMethods {
  return methods as Required<SwitchMethods>;
}
emit('update:methods', getMethods());
props.onRegister?.(getMethods());

const model = defineModel<string | number | boolean | undefined>();
defaultsDeep(methods, {});
</script>
