<!--
  - 单选 组件
  -
  - @author zoulan
  - @since 2023-08-15
  -->
<template>
  <div class="flex gap-10px">
    <ElementSider />
    <FormContent v-model="formDesignConfig" />
    <PropertiesSider v-model="formDesignConfig" />
  </div>
</template>
<script setup lang="ts">
import { defaultsDeep } from 'lodash-es';
import { ref } from 'vue';

import ElementSider from './components/elementSider/index.vue';
import FormContent from './components/formContent/index.vue';
import PropertiesSider from './components/propertiesSider/index.vue';
import type { BasicFormDesignProps, FormDesignConfig, FormDesignEmit, FormDesignMethods } from './types';

const props = withDefaults(defineProps<BasicFormDesignProps>(), {});
const emit = defineEmits<FormDesignEmit>();
const methods: Partial<FormDesignMethods> = {};
const model = defineModel<string>();
emit('update:methods', methods as Required<FormDesignMethods>);
props.onRegister?.(methods as Required<FormDesignMethods>);

defaultsDeep(methods, {});

const formDesignConfig = ref<FormDesignConfig>({
  cols: 3,
  formDesignSchemas: []
});
</script>
