/**
 * BPMN Modeler初始化hooks
 *
 * @author zoulan
 * @since 2023-06-05
 */
import type Modeling from 'bpmn-js/lib/features/modeling/Modeling';
import type { Moddle } from 'bpmn-js/lib/model/Types';
import Modeler from 'bpmn-js/lib/Modeler';
// 官方流程校验 module
import LintModule from 'bpmn-js-bpmnlint';
// 官方流程模拟 module
import TokenSimulationModule from 'bpmn-js-token-simulation';
import type ElementRegistry from 'diagram-js/lib/core/ElementRegistry';
import type { Ref } from 'vue';
import { ref } from 'vue';

import BpmnlintConfig from '/@/components/Bpmn/src/Lint/bpmnlint';

// 扩展bpmn xml标签
import customMeta from '../additionalModules/customMetaModel/customMeta.json';
// 兼容flowable标签
import FlowableDescriptor from '../resources/flowableDescriptor.json';

FlowableDescriptor.types.push(...customMeta.types);

// 自定义扩展模块
import {
  CustomEditContextPad,
  CustomPaletteProvider,
  CustomTranslate,
  FlowableCustomModdle
} from '/@/components/Bpmn/src/additionalModules';

export function useModeler(canvas) {
  const modeler = ref(
    new Modeler({
      // 渲染容器
      container: canvas.value,
      // 宽度
      width: '100%',
      // 高度
      height: '100%',
      // 自定义且与默认扩展包一起使用的模块列表
      additionalModules: [
        // 扩展点击右侧功能 ContextPad
        CustomEditContextPad,
        // 汉化
        CustomTranslate,
        // 流程检验插件
        LintModule,
        // 流程模拟
        TokenSimulationModule,
        // 兼容flowable标签
        FlowableCustomModdle,
        CustomPaletteProvider,
        {
          // 禁用节点编辑
          labelEditingProvider: ['value', '']
        }
      ],
      moddleExtensions: {
        // 兼容activiti标签
        activiti: FlowableDescriptor
      },
      // 流程校验规则
      linting: {
        // 规则配置
        bpmnlint: BpmnlintConfig,
        // 是否启用
        active: true
      }
      // TODO:新版本取消了，键盘操作绑定，默认绑定画布了
      // keyboard: {
      //   // 或者window，注意与外部表单的键盘监听事件是否冲突
      //   bindTo: document
      // }
    })
  );

  /** 获取Modeler对象 */
  function getModeler() {
    return modeler.value;
  }
  /** 获取Moddle对象 */
  function getModdle() {
    return modeler.value.get<Moddle>('moddle');
  }
  /** 获取lementRegistry对象 */
  function getElementRegistry() {
    return modeler.value.get<ElementRegistry>('elementRegistry');
  }
  /** 获取Modeling对象 */
  function getModeling() {
    return modeler.value.get<Modeling>('modeling');
  }
  return {
    modeler: modeler as Ref<Modeler>,
    getModeler,
    getModdle,
    getElementRegistry,
    getModeling
  };
}
