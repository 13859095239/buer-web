<!--
  - 查询 组件
  -
  - @author zoulan
  - @since 2024-08-18
  -->
<template>
  <div class="p-x-10px p-t-10px">
    <template v-if="type === 'advanced'">
      <!-- 高级搜索模式 -->
      <AdvancedSearch
        v-model="model"
        v-bind="{ searchFormProps: props, methods: getMethods() }"
      />
    </template>
    <template v-else-if="type === 'default'">
      <!-- 普通搜索模式 -->
      <DefaultSearch
        v-model="model"
        v-bind="{ searchFormProps: props, methods: getMethods() }"
      />
    </template>
  </div>
</template>
<script setup lang="ts">
import { assign } from 'lodash-es';
import { ref, toRefs } from 'vue';

import AdvancedSearch from './components/AdvancedSearch/index.vue';
import DefaultSearch from './components/DefaultSearch/index.vue';
import { useSearchFormMethods } from './hooks/useSearchFormMethods';
import type { BasicSearchFormProps, SearchFormEmit, SearchFormMethods } from './types';

const props = withDefaults(defineProps<BasicSearchFormProps>(), {
  type: 'default',
  layout: 'inline'
});
const emit = defineEmits<SearchFormEmit>();
const methods: Partial<SearchFormMethods> = {};
const { type } = toRefs(props);
function getMethods(): SearchFormMethods {
  return methods as Required<SearchFormMethods>;
}
emit('update:methods', getMethods());
const model = ref<Recordable>({});
const { search, getFormData, resetFields } = useSearchFormMethods(props, model);
assign(methods, { search, getFormData, resetFields });
props.onRegister?.(getMethods());
</script>
