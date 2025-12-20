<!--
  - 用户列表页
  -
  - @author zoulan
  - @since 2023-07-12
  -->
<template>
  <div class="w-full">
    <!-- 组件正常状态下的Input -->
    <TagInput
      v-model="tagModel"
      @click="showModal"
      @remove="handleRemove"
    />
    <!-- 弹出组件,选人 -->
    <SelectModal
      ref="selectModalRef"
      class="w-full"
      @saved="saved"
    />
  </div>
</template>
<script setup lang="ts">
import { watchOnce } from '@vueuse/core';
import type { TagInputRemoveContext } from 'tdesign-vue-next';
import { TagInput } from 'tdesign-vue-next';
import { ref } from 'vue';

import { listUser } from '/@/api/system/user';

import SelectModal from './components/SelectModal.vue';

const selectModalRef = ref<InstanceType<typeof SelectModal> | null>();
/** 选中的值,多个以逗号隔开 */
const model = defineModel<string>();
/** 选中数据列表 model */
const dataModel = defineModel<Recordable[]>('data', { default: [] });
/** tag绑定列表 model */
const tagModel = ref<string[]>([]);
/** 弹出选择 */
function showModal() {
  selectModalRef.value!.showModal(model.value);
}
/** 保存选择 */
function saved(records: Recordable[]) {
  setModelByUsers(records);
}
/** 移除单个标签时触发 */
function handleRemove(context: TagInputRemoveContext) {
  dataModel.value?.splice(context.index, 1);
  setModelByUsers(dataModel.value);
}
function setModelByUsers(records: Recordable[]) {
  dataModel.value = records;
  const nicknames = dataModel.value.map((item) => item.nickname);
  tagModel.value = nicknames;
  model.value = dataModel.value.map((item) => item.id).join(',');
}
// 是否初始化过
let isInited: boolean = false;
// 第一次初始化数据,当页面第一次传进id时会请求后端拿到用户列表
async function initData() {
  if (isInited) {
    return;
  }
  const records = await listUser({ ids: model.value });
  setModelByUsers(records);
  isInited = true;
}
watchOnce(model, () => {
  initData();
});
</script>
