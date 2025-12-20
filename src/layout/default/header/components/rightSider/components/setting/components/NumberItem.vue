<!--
  - 通用数值设置
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
      <InputNumber
        v-model:value="value"
        v-bind="{ min, max, step }"
      />
    </Col>
  </Row>
</template>
<script setup lang="ts">
import { Col, InputNumber, Row } from 'tdesign-vue-next';
import type { PropType } from 'vue';
import { watch } from 'vue';

import type { HandlerEnum } from '../enum';
import { useHandler } from '../handler';

const props = defineProps({
  title: String,
  min: Number,
  max: Number,
  step: Number,
  event: {
    type: Number as PropType<HandlerEnum>
  }
});
const [value, handler] = useHandler(props.event as HandlerEnum);

watch(value, (newValue) => {
  handler(newValue);
});
</script>
