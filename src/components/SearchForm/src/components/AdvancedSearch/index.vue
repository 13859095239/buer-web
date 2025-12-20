<!--
  - 高级查询 组件
  -
  - @author zoulan
  - @since 2024-08-18
  -->
<template>
  <div class="flex !leading-46px">
    <div class="grow">
      <Tabs
        v-if="searchFormProps.tabs"
        v-model:value="model[searchFormProps.tabField as string]"
        @change="search"
      >
        <TabPanel
          v-for="item in searchFormProps.tabs"
          :key="item.key"
          class="hidden"
        >
          <template #tab>
            <span>{{ item.name }}</span>
            <span
              v-if="item.number"
              class="ml-5px"
              :class="[colorMap.get(item.numberColor || 'info')]"
              >{{ `(${item.name})` }}</span
            >
          </template>
        </TabPanel>
      </Tabs>
    </div>
    <div
      :span="8"
      class="w-300px flex-none text-right"
    >
      <InputSearch
        v-model:value="model[searchFormProps.inputSearchField as string]"
        :placeholder="`请输入${searchFormProps.inputSearchPlaceholder || ''}查询`"
        class="mb-2px !w-200px !align-middle"
        @search="search"
      />
      <Button
        class="mr-2"
        @click="toggle = !toggle"
        >高级搜索</Button
      >
    </div>
  </div>
  <SearchForm
    v-if="toggle"
    v-model="model"
    v-bind="{ searchFormProps, methods }"
  >
    <Col
      :span="24"
      class="text-center"
    >
      <Button
        class="!ml-15px"
        @click="search"
        >查询</Button
      >
      <Button
        class="!ml-15px"
        @click="search"
        >重置</Button
      >
      <Button
        class="!ml-15px"
        @click="toggle = false"
        >取消</Button
      >
    </Col>
  </SearchForm>
</template>
<script setup lang="ts">
import { Button, Col, Input, TabPanel, Tabs } from 'tdesign-vue-next';
import { ref, toRefs } from 'vue';

import type { BasicSearchFormProps, NumberColorType, SearchFormMethods } from '../../types';
import SearchForm from '../DefaultSearch/index.vue';

const props = defineProps<Props>();
const { Search: InputSearch } = Input;
const colorMap = new Map<NumberColorType, string>([
  ['info', 'text-gray-800'],
  ['warning', 'text-yellow-800'],
  ['danger', 'text-red-800']
]);
interface Props {
  searchFormProps: BasicSearchFormProps;
  methods: SearchFormMethods;
}
const { searchFormProps, methods } = toRefs(props);
/** form表单的model */
const model = defineModel<Recordable>({
  required: false,
  default: {}
});
const toggle = ref(false);
if (searchFormProps.value.tabs) {
  // 默认选中第一个tab
  model[searchFormProps.value.tabField as string] = searchFormProps.value.tabs?.[0].key;
}
function search() {
  methods.value.search();
}
</script>
