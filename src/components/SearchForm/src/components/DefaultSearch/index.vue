<!--
  - 查询 组件
  -
  - @author zoulan
  - @since 2024-08-18
  -->
<template>
  <Form
    v-bind="{ model, wrapperCol, labelCol, layout }"
    class="relative"
  >
    <div class="grid grid-cols-1 w-full lg:grid-cols-3 md:grid-cols-2">
      <template
        v-for="formSchema in searchFormProps.formSchemas"
        :key="formSchema.field"
      >
        <div
          v-if="formSchema.show !== false"
          class="relative flex flex-shrink-0 flex-row items-center pb-2"
        >
          <FormItem
            v-model:formModel="model"
            class="m-none m-b-18px m-r-12px"
            :formSchema="formSchema"
            :formProps="props"
          >
            <slot :name="formSchema.field"></slot>
          </FormItem>
        </div>
      </template>
      <div
        class="col-span-full w-full text-right"
        style="grid-column: -2 / -1; margin-left: auto"
      >
        <Button @click="search">查询</Button>
        <Button
          theme="default"
          class="m-l-10px"
          @click="resetFields"
          >重置</Button
        >
      </div>
    </div>
  </Form>
</template>
<script setup lang="ts">
import { Button, Form } from 'tdesign-vue-next';
import { toRefs, unref } from 'vue';

import type { BasicSearchFormProps, SearchFormMethods } from '../../types';
import FormItem from './FormItem.vue';
import { useItemLabelWidth } from './hooks/useLabelWidth';

interface Props {
  searchFormProps: BasicSearchFormProps;
  methods: SearchFormMethods;
}
const props = defineProps<Props>();
/** form表单的model */
const model = defineModel<Recordable>({
  required: false,
  default: {}
});
const { searchFormProps, methods } = toRefs(props);
const { layout } = toRefs(searchFormProps.value);
const { labelCol, wrapperCol } = unref(useItemLabelWidth(searchFormProps.value));
function search() {
  methods.value.search();
}
function resetFields() {
  methods.value.resetFields();
}
</script>
