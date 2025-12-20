<!--
  - 圆角设置
  -
  - @author zoulan
  - @since 2025-06-29
  -->
<template>
  <div class="w-full flex flex-center">
    <RadioGroup
      v-model:value="value"
      variant="primary-filled"
      @change="(val) => handler(val)"
    >
      <RadioButton
        v-for="(item, index) in ROUNDED_LIST"
        :key="index"
        :value="item.value"
        @click="handler(item.value)"
        >{{ item.name }}
      </RadioButton>
    </RadioGroup>
  </div>
</template>
<script setup lang="ts">
import { RadioButton, RadioGroup } from 'tdesign-vue-next';

import { ROUNDED_LIST } from '/@/settings/projectSetting';

import { HandlerEnum } from '../enum';
import { useHandler } from '../handler';

const [value, handler] = useHandler(HandlerEnum.CHANGE_ROUNDED);
</script>
