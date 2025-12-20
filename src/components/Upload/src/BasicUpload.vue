<!--
  - upload 组件
  -
  - @author zoulan
  - @since 2023-12-03
  -->
<template>
  <div class="relative">
    <Upload
      v-model:files="fileList"
      :action="UPLOAD_ACTION"
      :headers="headers"
      :multiple="true"
      :max="props.maxLength"
      :formatResponse="formatResponse"
      theme="file"
      @change="handleChange"
    >
      <!-- 自定义上传按钮 -->
      <Button
        v-if="editable"
        theme="primary"
      >
        <template #icon>
          <div class="i-tdesign:cloud-upload mr-1.5 mt-3px"></div>
        </template>
        上传文件
      </Button>
    </Upload>
  </div>
</template>
<script lang="ts" setup>
import { defaultsDeep } from 'lodash-es';
import { Button, Upload } from 'tdesign-vue-next';

import { UPLOAD_ACTION, UPLOAD_MAX_LENGTH } from '/@/settings/componentSetting';

import { useData } from './hooks/useData';
import { useSort } from './hooks/useSort';
import type { BasicUploadProps, UploadEmit, UploadMethods } from './types';

const props = withDefaults(defineProps<BasicUploadProps>(), {
  maxLength: UPLOAD_MAX_LENGTH
});
const emit = defineEmits<UploadEmit>();
/** fileGroupId,sys_oss外键 */
const model = defineModel<string>();
/** fileGroupId下的fileId列表，回发给后端更新最新的文件 */
const modelData = defineModel<string>('modelData');
const methods: Partial<UploadMethods> = {};
emit('update:methods', methods as Required<UploadMethods>);
props.onRegister?.(methods as Required<UploadMethods>);

const { headers, fileList, handleChange, formatResponse, clearData, generateFileGroupId, getUploadData } = useData({
  model,
  modelData
});
useSort(fileList);

defaultsDeep(methods, {
  clearData,
  getUploadData,
  generateFileGroupId
});
</script>
