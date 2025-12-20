<!--
  - Bpmn组件
  -
  - @author zoulan
  - @since 2023-07-12
  -->
<template>
  <SiderContainer
    :siderWidth="350"
    siderDirection="right"
  >
    <template #sider>
      <!-- 侧边属性栏 -->
      <Properties
        v-if="activeElement"
        ref="propertiesRef"
        v-bind="{
          modeler: modeler!,
          activeElement,
          methods: getMethods()
        }"
      />
    </template>
    <div>
      <!--  Bpmn 操作小工具栏 -->
      <Toolbar
        v-if="modeler"
        v-bind="{ bpmnProps: props, modeler }"
        @save-model="methods.onSave"
      />
      <!--  Bpmn 组件画布 -->
      <div
        ref="canvas"
        class="boder-none! h-660px w-full"
      ></div>
    </div>
  </SiderContainer>
</template>
<script setup lang="ts">
import type { Element } from 'bpmn-js/lib/model/Types';
import type Modeler from 'bpmn-js/lib/Modeler';
import { defaultsDeep } from 'lodash-es';
import type { Ref } from 'vue';
import { onMounted, ref, toRef, watchEffect } from 'vue';

import { SiderContainer } from '/@/components/Container';

import Toolbar from './components/Toolbar.vue';
import { useActiveElement } from './hooks/useActiveElement';
import { useImports } from './hooks/useImports';
import { useModeler } from './hooks/useModeler';
import { useProperties } from './hooks/useProperties';
import { useXml } from './hooks/useXml';
import Properties from './properties/index.vue';
import type { BasicBpmnProps, BpmnMethods } from './types';

const props = withDefaults(defineProps<BasicBpmnProps>(), { mode: 'edit' });
const emit = defineEmits<{
  (e: 'update:methods', tableMethods: Required<BpmnMethods>): void;
}>();
const propertiesRef = ref<InstanceType<typeof Properties> | null>();
const propsRef = toRef(props);
const methods: Partial<BpmnMethods> = {};
function getMethods(): BpmnMethods {
  return methods as Required<BpmnMethods>;
}
// bpmn画布
const canvas = ref<HTMLElement>();
const modeler = ref<Modeler<any>>();
/** 当前活动元素 */
const activeElement = ref<Element | undefined>(undefined);
function getModeler(): Ref<Modeler<any>> {
  return modeler as Ref<Modeler<any>>;
}

// 只有页面加载完成后,才能对 modeler 进行操作
onMounted(() => {
  const { modeler: _modeler, getModdle, getElementRegistry, getModeling } = useModeler(canvas);
  modeler.value = _modeler.value;
  const { getXml } = useXml(getModeler());
  const { importXML } = useImports(getModeler(), getMethods());
  emit('update:methods', getMethods());
  defaultsDeep(methods, {
    getXml,
    importXML,
    onSave: () => propsRef.value.onSave?.(),
    getModeler,
    getModdle,
    getElementRegistry,
    getModeling
  });

  const {
    activeElement: innerActiveElement,
    getActiveElement,
    setActiveElement,
    setDefaultActiveElement,
    startChangeActiveElement,
    stopChangeActiveElement
  } = useActiveElement(getModeler());

  // 直接让外部 activeElement 和内部保持绑定
  watchEffect(() => {
    activeElement.value = innerActiveElement.value;
  });

  const {
    updateProperties,
    updatePropertiesById,
    updateAcitiviProperties,
    updateModdleProperties,
    updateAcitiviModdleProperties,
    updateModdlePropertiesById,
    updateAcitiviAssign,
    updateExtensions,
    getExtensionElements,
    getExtensionObjectList
  } = useProperties(getModeler(), activeElement);

  defaultsDeep(methods, {
    updateProperties,
    updatePropertiesById,
    updateAcitiviProperties,
    updateModdleProperties,
    updateAcitiviModdleProperties,
    updateModdlePropertiesById,
    updateAcitiviAssign,
    updateExtensions,
    getExtensionElements,
    getExtensionObjectList,
    getActiveElement,
    setActiveElement,
    startChangeActiveElement,
    stopChangeActiveElement,
    setDefaultActiveElement
  });
});
</script>
<style lang="scss">
@import url('./style/index.scss');
</style>
