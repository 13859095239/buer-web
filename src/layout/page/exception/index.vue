<template>
  <Empty
    type="fail"
    title="错误"
    description="Sorry, the server is wrong."
  >
    <template #action>
      <Button>返回首页</Button>
    </template>
  </Empty>
</template>
<script lang="ts" setup>
import { Button, Empty } from 'tdesign-vue-next';
</script>
