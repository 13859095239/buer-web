<!--
  - 富文本 组件
  - 下载汉化文件地址https://www.tiny.cloud/get-tiny/language-packages
  - 组件皮肤在node_modules/tinymce/skins目录下，可以按需复制到public/resource/tinymce下
  - skin_url属性设置组件皮肤
  - 
  - @author zoulan
  - @since 2023-08-15
  -->
<template>
  <textarea
    id="tinymce"
    ref="tinymceRef"
  ></textarea>
</template>
<script setup lang="ts">
/* eslint-disable simple-import-sort/imports */
import tinymce from 'tinymce/tinymce';
// 导入tinymce样式文件
import 'tinymce/skins/ui/oxide/skin';
// 导入tinymce主题文件
import 'tinymce/themes/silver/theme';
// 导入tinymce图标文件
import 'tinymce/icons/default';
// 导入tinymce核心模型文件
import 'tinymce/models/dom';
// 加载插件
import 'tinymce/plugins/advlist';
import 'tinymce/plugins/autolink';
import 'tinymce/plugins/lists';
import 'tinymce/plugins/link';
import 'tinymce/plugins/image';
import 'tinymce/plugins/charmap';
import 'tinymce/plugins/preview';
import 'tinymce/plugins/anchor';
import 'tinymce/plugins/searchreplace';
import 'tinymce/plugins/visualblocks';
import 'tinymce/plugins/code';
import 'tinymce/plugins/fullscreen';
import 'tinymce/plugins/insertdatetime';
import 'tinymce/plugins/media';
import 'tinymce/plugins/table';
import 'tinymce/plugins/wordcount';

import { defaultsDeep } from 'lodash-es';
import type { Editor } from 'tinymce/tinymce';
import { ref, watch } from 'vue';

import { templateLoaded } from '/@/utils/template';

import { content_style, menu, plugins, toolbar } from './config/tinymce';
import { useImageUpload } from './hooks/useImageUpload';
import type { BasicTinyProps, TinyEmit, TinyMethods } from './types';

const props = defineProps<BasicTinyProps>();
const emit = defineEmits<TinyEmit>();
const { imagesUploadHandler } = useImageUpload();
/** 组件方法 */
const methods: Partial<TinyMethods> = {};
function getMethods(): TinyMethods {
  return methods as Required<TinyMethods>;
}
emit('update:methods', getMethods());
props.onRegister?.(getMethods());
let editor: Editor;
/** 值 */
const model = defineModel<string>();
const tinymceRef = ref<HTMLElement>();
templateLoaded(tinymceRef).then(async () => {
  // 初始化tiny组件
  const [tinymceEditor] = await tinymce.init({
    target: tinymceRef.value,
    license_key: 'gpl',
    // 汉化文件存放目录
    language_url: '/resource/tinymce/langs/zh_CN.js',
    // 汉化语言
    language: 'zh_CN',
    // 这里是skin的路径用于设置主题有亮与暗两种主题
    skin_url: '/resource/tinymce/skins/ui/oxide',
    // 工具栏
    toolbar,
    // 插件
    plugins,
    // 隐藏右下角技术支持
    branding: false,
    // 隐藏右上角升级按钮
    promotion: false,
    // 菜单栏
    menu,
    // 不允许改变大小
    resize: false,
    // 自动焦点
    auto_focus: true,
    // 取消获取焦点时,高亮显示
    highlight_on_focus: false,
    // 调用原生
    fullscreen_native: true,
    // 内容样式
    content_style,
    // 底部状态栏
    statusbar: false,
    // 上传图片 handler
    images_upload_handler: imagesUploadHandler
  });
  editor = tinymceEditor;
  editor.setContent(model.value || '');
  // change keyup undo redo四个事件应该能覆盖编辑器内容变化的所有情况了
  // editor.getContent()方法可以获取编辑器内容
  editor.on('change keyup undo redo', () => {
    const content = editor.getContent();
    model.value = content;
  });
  watch(model, () => {
    editor.setContent(model.value || '');
  });
});

defaultsDeep(methods, {});
</script>
<style lang="less">
.tox-tinymce {
  border: 1px solid #d9d9d9 !important;
  border-radius: 6px !important;
}
.tox-editor-header {
  box-shadow: none !important;
}
.tox {
  z-index: 9999 !important;
  .tox-mbtn:focus:not(:disabled)::after {
    box-shadow: none !important;
    border: 1px solid #006ce7;
  }
  .tox-split-button:focus::after {
    border: 1px solid #006ce7;
    box-shadow: none !important;
  }
}
</style>
