<!--
  - 导入结果组件
  - 显示导入统计和错误详情
  - 支持错误日志导出功能
  - 
  - @author zoulan
  - @since 2025-10-01
  -->
<template>
  <div>
    <Row :gutter="16">
      <Col :span="8">
        <Card>
          <div class="text-center">
            <div class="i-tdesign:check-circle mb-2 text-2xl text-green-500"></div>
            <p class="text-sm text-gray-500">成功</p>
            <p class="text-lg font-bold">{{ importResult.success }} 条</p>
          </div>
        </Card>
      </Col>
      <Col :span="8">
        <Card>
          <div class="text-center">
            <div class="i-tdesign:error-circle mb-2 text-2xl text-red-500"></div>
            <p class="text-sm text-gray-500">失败</p>
            <p class="text-lg font-bold">{{ importResult.failed }} 条</p>
          </div>
        </Card>
      </Col>
      <Col :span="8">
        <Card>
          <div class="text-center">
            <div class="i-tdesign:file mb-2 text-2xl text-blue-500"></div>
            <p class="text-sm text-gray-500">总计</p>
            <p class="text-lg font-bold">{{ importResult.total }} 条</p>
          </div>
        </Card>
      </Col>
    </Row>

    <!-- 错误详情 -->
    <Alert
      v-if="importResult.errors && importResult.errors.length > 0"
      theme="warning"
      message="导入过程中发现错误，请检查以下信息："
    >
      <template #description>
        <div class="max-h-40 overflow-y-auto">
          <div
            v-for="(error, index) in importResult.errors"
            :key="index"
            class="py-1 text-sm"
          >
            <span class="text-red-600 font-medium">第 {{ error.row }} 行</span>
            <span
              v-if="error.column"
              class="ml-2 text-red-500"
            >
              {{ error.column }} 列
            </span>
            <span class="ml-2 text-gray-700">{{ error.message }}</span>
          </div>
        </div>
        <div class="mt-3">
          <Button
            theme="default"
            variant="outline"
            size="small"
            @click="handleExportErrorLog"
          >
            <template #icon>
              <div class="i-tdesign:download"></div>
            </template>
            导出错误日志
          </Button>
        </div>
      </template>
    </Alert>
  </div>
</template>
<script setup lang="ts">
import { Alert, Button, Card, Col, Row } from 'tdesign-vue-next';

import type { ImportResult } from '../types';

interface Props {
  importResult: ImportResult;
}

defineProps<Props>();

const emit = defineEmits<{
  'export-error-log': [];
}>();

const handleExportErrorLog = () => {
  emit('export-error-log');
};
</script>
