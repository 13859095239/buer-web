<!--
  - 弹出抽屉 组件
  -
  - @author zoulan
  - @since 2023-08-15
  -->
<template>
  <Drawer
    v-model:visible="visible"
    :header="props.title"
    :closeOnOverlayClick="false"
    :destroyOnClose="true"
    :lazy="true"
    :placement="props.placement"
    :sizeDraggable="true"
    :closeBtn="true"
    :confirmBtn="props.saveButton === false ? null : ''"
    :size="props.size"
    attach="body"
  >
    <!-- 内容区域 -->
    <div v-loading="loading">
      <slot></slot>
    </div>
    <!-- 自定义footer插槽 -->
    <slot name="footer"></slot>
    <!-- 默认footer -->
    <template
      v-if="!$slots.footer"
      #footer
    >
      <Button
        style="margin-right: 8px"
        @click="close()"
        >取消</Button
      >
      <Button
        v-if="saveButton"
        @click="props.onSaved?.()"
        >保存</Button
      >
    </template>
  </Drawer>
</template>
<script setup lang="ts">
import { assign } from 'lodash-es';
import { Button, Drawer } from 'tdesign-vue-next';
import { toRefs } from 'vue';

import { useLoading } from '/@/hooks/web/useLoading';
import { DRAWER_SIZE } from '/@/settings/componentSetting';

import { useVisible } from './hooks/useVisible';
import type { BasicDrawerProps, DrawerEmit, DrawerMethods } from './types';

const props = withDefaults(defineProps<BasicDrawerProps>(), {
  canFullscreen: true,
  placement: 'right',
  size: DRAWER_SIZE,
  saveButton: true
});
const emit = defineEmits<DrawerEmit>();
const { loading } = useLoading();
const methods: Partial<DrawerMethods> = {};
emit('update:methods', methods as Required<DrawerMethods>);
props.onRegister?.(methods as Required<DrawerMethods>);
const { saveButton } = toRefs(props);

const { show, close, visible } = useVisible(props);

assign(methods, {
  show,
  close,
  loading: loading.value
});
</script>
