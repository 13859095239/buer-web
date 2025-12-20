<!--
  - 树 查询组件
  -
  - @author zoulan
  - @since 2023-07-29
  -->
<template>
  <div class="!leading-50pxpl-10px flex flex-row pr-10px !h-50px">
    <div class="flex-none !w-60px">
      <span class="text-xs font-bold">全部{{ searchForm.name }}</span>
    </div>
    <div class="flex-grow">
      <InputSearch
        v-model:value="searchValue"
        class="!align-middle"
      />
    </div>
  </div>
</template>
<script setup lang="ts">
import { Input } from 'tdesign-vue-next';
import { ref, toRefs, watch } from 'vue';

import type { SearchForm, TreeMethods } from '../../types';

const props = withDefaults(defineProps<Props>(), {});
const { Search: InputSearch } = Input;
const searchValue = ref('');
interface Props {
  searchForm: SearchForm;
  methods: TreeMethods;
}
const { searchForm, methods } = toRefs(props);

watch(searchValue, (value) => {
  methods.value.search?.(value);
});
</script>
