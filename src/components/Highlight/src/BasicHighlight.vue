<!--
  - highlight.js 高亮代码 组件
  - 官网 http://highlight.cndoc.wiki/doc
  -
  - @author zoulan
  - @since 2024-05-29
  -->
<template>
  <pre class="hljs"><code v-html="highlightedCode" /></pre>
</template>
<script setup lang="ts">
// 样式可以去官网挑选 https://highlightjs.org/demo
import 'highlight.js/styles/atom-one-dark-reasonable.css';

import hljs from 'highlight.js/lib/core';
import json from 'highlight.js/lib/languages/json';
import xml from 'highlight.js/lib/languages/xml';
import { computed } from 'vue';

const props = defineProps({
  value: {
    type: String,
    required: true
  }
});
hljs.registerLanguage('xml', xml);
hljs.registerLanguage('json', json);
const highlightedCode = computed(() => hljs.highlightAuto(props.value).value);
</script>
<style lang="less" scoped>
.hljs {
  padding: 5px;
  /* 保留空白符，自动换行 */
  white-space: pre-wrap;
  /* 长单词或URL内部进行换行 */
  word-break: break-all;
}
</style>
