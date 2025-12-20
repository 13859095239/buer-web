<!--
  - 导入进度组件
  - 显示导入步骤和进度条
  - 支持取消导入操作
  - 
  - @author zoulan
  - @since 2025-10-01
  -->
<template>
  <div>
    <Steps
      :current="importProgress.currentStep - 1"
      :status="importProgress.completed ? 'finish' : 'process'"
      :options="[
        { title: '上传文件' },
        { title: '解析文件' },
        { title: '验证数据' },
        { title: '导入数据' },
        { title: '导入完成' }
      ]"
    />

    <Progress
      :percentage="importProgress.progress"
      :status="importProgress.completed ? 'success' : undefined"
      :label="importProgress.currentStepText"
    />

    <!-- 取消按钮 -->
    <div
      v-if="importing"
      class="mt-4 text-center"
    >
      <Button
        theme="default"
        variant="outline"
        @click="handleCancel"
      >
        取消导入
      </Button>
    </div>
  </div>
</template>
<script setup lang="ts">
import { Button, Progress, Steps } from 'tdesign-vue-next';

import type { ImportProgress as ImportProgressType } from '../types';

interface Props {
  importing: boolean;
  importProgress: ImportProgressType;
}

defineProps<Props>();

const emit = defineEmits<{
  cancel: [];
}>();

const handleCancel = () => {
  emit('cancel');
};
</script>
