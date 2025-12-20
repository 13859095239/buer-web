<!--
  - 通用开关设置
  -
  - @author zoulan
  - @since 2023-06-29
  -->
<template>
  <Row class="py-10px">
    <Col
      :span="6"
      class="text-left"
      >{{ title }}</Col
    >
    <Col
      :span="6"
      class="text-right"
    >
      <Switch v-model:value="value" />
    </Col>
  </Row>
</template>
<script setup lang="ts">
import { Col, Row, Switch } from 'tdesign-vue-next';
import type { PropType } from 'vue';
import { watch } from 'vue';

import type { HandlerEnum } from '../enum';
import { useHandler } from '../handler';

const props = defineProps({
  title: String,
  event: {
    type: Number as PropType<HandlerEnum>
  }
});
const [value, handler] = useHandler(props.event as HandlerEnum);

watch(value, (newValue) => {
  handler(newValue);
});
</script>
