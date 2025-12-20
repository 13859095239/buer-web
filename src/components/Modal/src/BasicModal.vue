<!--
  - 弹出 组件
  -
  - @author zoulan
  - @since 2023-08-15
  -->
<template>
  <Dialog
    ref="dialogRef"
    v-model:visible="visible"
    :destroyOnClose="true"
    :lazy="true"
    :top="props.top"
    :width="widthComputed"
    :mode="mode"
    :draggable="true"
    :closeOnOverlayClick="false"
    :closeOnEscKeydown="false"
    :confirmBtn="props.saveButton === false ? null : ''"
    :footer="props.footer"
    attach="body"
    :dialogStyle="{
      padding: mode === 'full-screen' ? '0px' : '15px 30px'
    }"
    :class="{
      'dialog-hidden-header': !props.header
    }"
    :onCancel="close"
    :onClose="close"
    :onConfirm="props.onSaved"
  >
    <div v-loading="loading">
      <!-- 内容区域 -->
      <slot></slot>
    </div>
    <!-- 自定义顶部右侧操作按钮组件 -->
    <template #closeBtn>
      <HeaderButton
        :basicProps="props"
        :mode="mode"
        :methods="methods"
      />
    </template>
    <!-- 自定义顶部左侧标题组件 -->
    <template
      v-if="props.header"
      #header
    >
      <div ref="modalTitleElRef">
        <HeaderTitle :basicProps="props" />
      </div>
    </template>
    <!-- 自定义底部操作组件 -->
    <!-- <template
      #footer
      v-if="props.footer">
      <div ref="modalTitleElRef">
        <Footer :basic-props="props" />
      </div>
    </template> -->
  </Dialog>
</template>
<script setup lang="ts">
import { assign } from 'lodash-es';
import type { DialogInstance, DialogProps } from 'tdesign-vue-next';
import { Dialog } from 'tdesign-vue-next';
import { ref } from 'vue';

import { useLoading } from '/@/hooks/web/useLoading';
import { MODAL_TOP, MODAL_WIDTH } from '/@/settings/componentSetting';

import HeaderButton from './components/HeaderButton.vue';
import HeaderTitle from './components/HeaderTitle.vue';
import { useFullscreen } from './hooks/useFullscreen';
import { useSize } from './hooks/useSize';
import { useVisible } from './hooks/useVisible';
import type { BasicModalProps, ModalEmit, ModalMethods } from './types';

const props = withDefaults(defineProps<BasicModalProps>(), {
  top: MODAL_TOP,
  width: MODAL_WIDTH,
  canFullscreen: true,
  header: true,
  footer: true,
  saveButton: true
});
const emit = defineEmits<ModalEmit>();
const { loading } = useLoading();
const dialogRef = ref<DialogInstance | null>(null);
const methods: Partial<ModalMethods> = {};
const modalTitleElRef = ref<HTMLElement>();
emit('update:methods', methods as Required<ModalMethods>);
props.onRegister?.(methods as Required<ModalMethods>);
const mode = ref<DialogProps['mode']>(props.fullscreen ? 'full-screen' : 'modal');
const { toggleFullScreen } = useFullscreen(mode);
const { show, close, visible } = useVisible(props, dialogRef);
const { widthComputed } = useSize(props);
assign(methods, {
  show,
  close,
  toggleFullScreen,
  loading: loading.value
});
</script>
<style lang="less" scoped>
// dialog header 右侧操作按钮
:global(.t-dialog .t-dialog__close) {
  @apply w-auto! pr-0px bg-transparent;
}

// 不显示 dialog header
:global(.dialog-hidden-header .t-dialog__header) {
  @apply hidden;
}

// mode=fullscreen 全屏模式下统一 padding
:global(.dialog-hidden-header .t-dialog__body) {
  @apply p-t-none;
}

// 取消 t-dialog__body 左边 padding,取消滚动条,统一采用body滚动
:global(.t-dialog .t-dialog__body) {
  @apply p-x-none;
  // of-hidden!
}
</style>
