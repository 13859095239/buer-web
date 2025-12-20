<!--
  - 字典 tag 组件
  - 支持不同的主题,可以设置字典的type字段
  - @author zoulan
  - @since 2023-08-15
  -->
<template>
  <Tag
    v-for="(item, index) in names"
    :key="index"
    :theme="item?.type || 'default'"
  >
    {{ item?.name }}
  </Tag>
</template>
<script setup lang="ts">
import { Tag } from 'tdesign-vue-next';
import { computed, toRefs } from 'vue';

import type { DictItemVO } from '/@/types/system/dictItem';
import { isEmpty } from '/@/utils/is';

interface Props {
  /** 当前的字典值 */
  dictValue?: string;
  /** 字典key */
  dictKey: string;
  /** 字典map,包含多个key的 */
  dictMap: Map<string, DictItemVO>;
}
const props = defineProps<Props>();
const { dictValue, dictKey, dictMap } = toRefs(props);
// 支持多个字典值,逗号隔开
const names = computed(() => {
  if (isEmpty(dictValue?.value) || !dictKey.value || !dictMap.value) {
    return [];
  } else {
    return dictValue?.value!.split(',').map((item) => dictMap.value.get(`${dictKey.value}-${item}`));
  }
});
</script>
