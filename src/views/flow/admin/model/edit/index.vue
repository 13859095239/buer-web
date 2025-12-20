<!--
  - 流程设计 编辑页
  -
  - @author zoulan
  - @since 2023-07-12
  -->
<template>
  <BasicModal
    v-model:methods="modalMethods"
    v-bind="modalProps"
  >
    <SegmentedContainer
      v-model="activeValue"
      v-bind="segmentedContainerProps"
    >
      <template #modelInfo>
        <ModelInfo ref="modelInfoRef" />
      </template>
      <template #modelVariable>
        <ModelVariable ref="modelVariableRef" />
      </template>
      <template #modelPermission>
        <ModelPermission ref="modelPermissionRef" />
      </template>
      <template #modelDesign>
        <ModelDesign ref="modelDesignRef" />
      </template>
    </SegmentedContainer>
    <template #footer></template>
  </BasicModal>
</template>
<script lang="ts" setup>
import { nextTick, reactive, ref, shallowRef } from 'vue';

import type { SegmentedContainerProps } from '/@/components/Container/SegmentedContainer/index';
import { SegmentedContainer } from '/@/components/Container/SegmentedContainer/index';
import type { BasicModalProps, ModalMethods } from '/@/components/Modal';
import { BasicModal } from '/@/components/Modal';
import { templateLoaded } from '/@/utils/template';

import ModelDesign from './modelDesign/index.vue';
import ModelInfo from './modelInfo/index.vue';
import ModelPermission from './modelPermission/index.vue';
import ModelVariable from './modelVariable/index.vue';

const emit = defineEmits<{
  (e: 'saved'): void;
}>();
const modelDesignRef = ref<InstanceType<typeof ModelDesign>>();
const modelInfoRef = ref<InstanceType<typeof ModelInfo>>();
const modelVariableRef = ref<InstanceType<typeof ModelVariable>>();
const modelPermissionRef = ref<InstanceType<typeof ModelPermission>>();
const modalMethods = ref<ModalMethods>({} as ModalMethods);

const activeValue = ref('modelInfo');
/** 模型 id */
let id: Nullable<string> = null;
const modalProps = shallowRef<BasicModalProps>({
  title: '编辑流程',
  header: false,
  footer: false,
  fullscreen: true,
  onSaved: async () => {
    modalMethods.value.close();
    emit('saved');
  },
  onClosed() {
    clearData();
  }
});
const segmentedContainerProps: SegmentedContainerProps = reactive({
  title: '流程编辑',
  titleIcon: 'flow',
  size: 'large',
  options: [
    {
      label: '基础信息',
      value: 'modelInfo',
      actions: [
        {
          label: '保存',
          theme: 'success',
          onClick: async () => {
            const add = id === undefined;
            id = await modelInfoRef.value?.saveData();
            // 新增，加载其他页签
            if (add) {
              setSegmentedDisabled(false);
              modelVariableRef.value?.init(id!);
              modelPermissionRef.value?.init(id!);
            }
          }
        }
      ]
    },
    {
      label: '流程变量',
      value: 'modelVariable'
    },
    {
      label: '流程权限',
      value: 'modelPermission'
    },
    {
      label: '流程设计',
      value: 'modelDesign',
      actions: [
        {
          label: '保存',
          color: 'success',
          onClick: () => {
            modelDesignRef.value?.saveData();
          }
        }
      ]
    }
  ],
  gobalActions: [
    {
      label: '返回',
      color: 'success',
      onClick: () => modalMethods.value.close()
    }
  ],
  onChange(value) {
    if (value === 'modelDesign') {
      nextTick(() => {
        modelDesignRef.value?.init(id!);
      });
    }
  }
});

/**
 * 显示流程设计信息
 *
 * @param _id 模型id
 */
const showModel = (_id: string) => {
  clearData();
  setSegmentedDisabled(false);
  id = _id;
  modalMethods.value.show();
  nextTick(() => {});
};

/** 显示新增流程设计 */
const showAddModel = () => {
  clearData();
  setSegmentedDisabled(true);
  modalMethods.value.show();
};

/**
 * 显示编辑流程设计
 *
 * @param _id 模型id
 */
const showEditModel = (_id: string) => {
  clearData();
  id = _id;
  setSegmentedDisabled(false);
  modalMethods.value.show();
  templateLoaded(modelInfoRef).then(() => {
    modelInfoRef.value?.init(id!);
  });
  templateLoaded(modelVariableRef).then(() => {
    modelVariableRef.value?.init(id!);
  });
  templateLoaded(modelPermissionRef).then(() => {
    modelPermissionRef.value?.init(id!);
  });
};

/**
 * 设置segmented禁用状态
 * @param disabled 是否禁用
 */
function setSegmentedDisabled(disabled: boolean) {
  segmentedContainerProps.options.forEach((option, index) => index > 0 && (option.disabled = disabled));
}

/** 清空数据 */
const clearData = () => {
  id = null;
  modelDesignRef.value?.clearData();
  modelInfoRef.value?.clearData();
  modelVariableRef.value?.clearData();
  modelPermissionRef.value?.clearData();
  activeValue.value = 'modelInfo';
};

defineExpose({
  showModel,
  showAddModel,
  showEditModel,
  clearData
});
</script>
