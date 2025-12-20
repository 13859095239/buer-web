/**
 * BPMN 属性 hooks
 *
 * @author zoulan
 * @since 2023-06-05
 */
/* eslint-disable no-template-curly-in-string */
import type Modeling from 'bpmn-js/lib/features/modeling/Modeling.js';
import type { Element, Moddle, ModdleElement } from 'bpmn-js/lib/model/Types';
import type Modeler from 'bpmn-js/lib/Modeler';
import { getBusinessObject } from 'bpmn-js/lib/util/ModelUtil';
import type ElementRegistry from 'diagram-js/lib/core/ElementRegistry';
import type { Ref } from 'vue';

import {
  ASSIGN_TYPE_ENUM,
  ASSIGN_VARIABLE_TYPE_ENUM,
  AUDIT_TYPE_ENUM,
  Multi_SIGN_PERCENT_ENUM
} from '/@/constants/flowConstants';
import {
  BPMN_MODDLE_PREFIX,
  CANDIDATE_GROUP_TASK_LISTENER,
  FLOW_EXECUTION_LISTENER_CLASS,
  FLOW_TASK_LISTENER_CLASS
} from '/@/settings/componentSetting';

import type { ExtensionType, ListenerObject, PropertiesObject } from '../types';

export function useProperties(modeler: Ref<Modeler>, activeElement: Ref<Element | undefined>) {
  const modeling = modeler.value.get<Modeling>('modeling');
  const elementRegistry = modeler.value.get<ElementRegistry>('elementRegistry');
  const moddle = modeler.value.get<Moddle>('moddle');
  /** 更新元素属性 */
  function updateProperties(element: Element, propertie: Recordable) {
    modeling.updateProperties(element, propertie);
  }

  /** 更新当前活动元素属性 */
  function updateAcitiviProperties(propertie: Recordable) {
    if (activeElement.value !== undefined) {
      modeling.updateProperties(activeElement.value, propertie);
    }
  }

  /** 通过elementId,更新元素属性 */
  function updatePropertiesById(elementId: string, propertie: Recordable) {
    const element = elementRegistry.get(elementId) as any;
    updateProperties(element, propertie);
  }

  /** 更新元素的Moddle属性 */
  function updateModdleProperties(element: Element, moddleElement: ModdleElement, propertie: Recordable) {
    modeling.updateModdleProperties(element, moddleElement, propertie);
  }

  /** 更新当前活动元素的Moddle属性 */
  function updateAcitiviModdleProperties(moddleElement: ModdleElement, propertie: Recordable) {
    if (activeElement.value !== undefined) {
      modeling.updateModdleProperties(activeElement.value, moddleElement, propertie);
    }
  }

  /** 通过elementId,更新元素的Moddle属性 */
  function updateModdlePropertiesById(elementId: string, moddleElement: ModdleElement, propertie: Recordable) {
    const element = elementRegistry.get(elementId) as any;
    updateModdleProperties(element, moddleElement, propertie);
  }

  /**
   * 更新当前活动元素的办理人员
   *
   * @param userOrGroupIds 人员或组id列表
   * @param assignType 办理人类型
   * @param auditType 审批类型
   * @param multiSignPercent 会签比例
   * @param variableType 变量类型
   * @param variableName 变量名称
   *
   */
  function updateAcitiviAssign(
    userOrGroupIds: string[],
    assignType: ASSIGN_TYPE_ENUM = ASSIGN_TYPE_ENUM.USER,
    auditType: AUDIT_TYPE_ENUM = AUDIT_TYPE_ENUM.CANDIDATE,
    multiSignPercent: Multi_SIGN_PERCENT_ENUM = Multi_SIGN_PERCENT_ENUM.PERCENT_100,
    variableType: ASSIGN_VARIABLE_TYPE_ENUM = ASSIGN_VARIABLE_TYPE_ENUM.USER,
    variableName: string
  ) {
    // 审批类型是否用户
    const isUser = assignType === ASSIGN_TYPE_ENUM.USER;
    // 单个办理人,用assignee
    const oneUser = isUser && userOrGroupIds.length === 1;
    // 多个办理人,用candidateUsers
    const multiUsers = isUser && userOrGroupIds.length > 1;
    // 更新属性
    updateAcitiviProperties({
      // 审批类型
      'flowable:assigneeType': assignType,
      // 审批方式
      'flowable:auditType': auditType,
      // 流程会签比例
      'flowable:multiSignPercent': multiSignPercent,
      // 变量类型
      'flowable:variableType': variableType,
      // 变量名
      'flowable:variableName': variableName
    });
    // 多人情况根据auditType是会签模式还是候选人模式
    switch (auditType) {
      // 竞签,单实例
      case AUDIT_TYPE_ENUM.CANDIDATE: {
        // 移除组任务监听器
        removeGroupExtensionModdle(activeElement.value!);
        if (assignType === ASSIGN_TYPE_ENUM.USER) {
          // 人员
          updateAcitiviProperties({
            loopCharacteristics: undefined,
            // 办理人
            assignee: oneUser ? userOrGroupIds[0] : undefined,
            // 候选人
            candidateUsers: multiUsers ? userOrGroupIds : undefined,
            // 组
            candidateGroups: undefined
          });
        } else if (assignType === ASSIGN_TYPE_ENUM.CUSTOM_VARIABLE) {
          // 变量
          updateAcitiviProperties({
            loopCharacteristics: undefined,
            assignee: undefined,
            // 人员变量
            candidateUsers: variableType === ASSIGN_VARIABLE_TYPE_ENUM.USER ? variableName : undefined,
            // 组变量
            candidateGroups: variableType === ASSIGN_VARIABLE_TYPE_ENUM.GROUP ? variableName : undefined
          });
        } else {
          // 组
          updateAcitiviProperties({
            loopCharacteristics: undefined,
            assignee: undefined,
            candidateUsers: undefined,
            candidateGroups: userOrGroupIds
          });
        }
        break;
      }
      // 多实例,并签/串签
      case AUDIT_TYPE_ENUM.COMBINE:
      case AUDIT_TYPE_ENUM.SEQUENTIAL: {
        // 多实例属性
        const loopCharacteristics = moddle.create('bpmn:MultiInstanceLoopCharacteristics', {
          // 是否并行多实例
          isSequential: auditType === AUDIT_TYPE_ENUM.SEQUENTIAL,
          // 变量处理
          'flowable:collection': assignType !== ASSIGN_TYPE_ENUM.CUSTOM_VARIABLE ? '${assigneeList}' : variableName,
          'flowable:elementVariable': 'assignee'
        });
        // 创建多实例完成条件
        const completionCondition = moddle.create('bpmn:FormalExpression', {
          body: `\${nrOfCompletedInstances/nrOfInstances >= ${Number(multiSignPercent.replace('%', '')) / 100}}`
        });
        // 将 completionCondition 作为子元素
        loopCharacteristics.completionCondition = completionCondition;
        // 更新多实例属性
        updateAcitiviProperties({
          loopCharacteristics
        });
        // 移除组任务监听器
        removeGroupExtensionModdle(activeElement.value!);
        if (isUser) {
          // 人员
          // 更新属性
          updateAcitiviProperties({
            assignee: '${assignee}',
            candidateUsers: undefined,
            candidateGroups: undefined
          });
        } else {
          // 创建组任务监听器
          createGroupExtensionModdle(activeElement.value!);
        }
        break;
      }
    }
  }

  /** 创建组任务监听器 */
  function createGroupExtensionModdle(element: Element) {
    // 创建 extensionElements
    let extensionElements = element.businessObject.extensionElements;
    if (!extensionElements) {
      extensionElements = moddle.create('bpmn:ExtensionElements');
      extensionElements.values = [];
    }

    // 创建 flowable:TaskListener
    const taskListener = moddle.create('flowable:TaskListener', {
      event: 'create',
      class: CANDIDATE_GROUP_TASK_LISTENER
    });

    // 加入 extensionElements
    extensionElements.get('values').push(taskListener);

    // 更新属性
    updateAcitiviProperties({
      candidateUsers: undefined,
      candidateGroups: undefined,
      // 办理人变量
      assignee: undefined,
      extensionElements
    });
  }

  /** 移除组任务监听器 */
  function removeGroupExtensionModdle(element: Element) {
    // 获取 extensionElements
    const extensionElements = element.businessObject.extensionElements;
    if (extensionElements && extensionElements.values) {
      // 过滤掉指定 class 的 listener
      const newValues = extensionElements.values.filter((listener) => {
        return !(listener.$type === 'flowable:TaskListener' && listener.class === CANDIDATE_GROUP_TASK_LISTENER);
      });

      // 更新
      modeling.updateProperties(element, {
        extensionElements:
          newValues.length > 0
            ? { ...extensionElements, values: newValues }
            : // 如果全删了，就把 extensionElements 置空
              undefined
      });
    }
  }
  /** 创建监听器Moddle */
  function createExtensionModdle(extensionObject: ListenerObject | PropertiesObject, extensionType: ExtensionType) {
    // listener对象
    const listenerObject: Recordable = {};
    // 根据类型，创建对应的moddle属性
    switch (extensionType) {
      case 'TaskListener':
        extensionObject = extensionObject as ListenerObject;
        listenerObject.class = FLOW_TASK_LISTENER_CLASS;
        addField(listenerObject, extensionObject.value);
        listenerObject.event = extensionObject.event;
        break;
      case 'ExecutionListener':
        extensionObject = extensionObject as ListenerObject;
        listenerObject.class = FLOW_EXECUTION_LISTENER_CLASS;
        addField(listenerObject, extensionObject.value);
        listenerObject.event = extensionObject.event;
        break;
      case 'Properties':
        extensionObject = extensionObject as PropertiesObject;
        listenerObject.name = extensionObject.name;
        listenerObject.value = extensionObject.value;
        break;
    }
    // 创建listenerModdle
    const listenerModdle = moddle.create(`${BPMN_MODDLE_PREFIX}:${extensionType}`, listenerObject);
    return listenerModdle;
  }

  /**  注入字段 */
  function addField(listenerObject, value) {
    // 注入字段
    if (value !== undefined) {
      const field = moddle.create(`${BPMN_MODDLE_PREFIX}:Field`, { name: 'value', stringValue: value });
      listenerObject.fields = [field];
    }
  }

  /** 更新元素的扩展属性 */
  function updateExtensions(element: Element, extensionType: ExtensionType, updateExtensionList: Recordable[]) {
    // 所有扩展属性
    const extensionElements = getExtensionElements(element);
    // 其他的扩展元素
    const otherExtensionElements = extensionElements.filter((extensionElement) => {
      return extensionElement.$type !== `${BPMN_MODDLE_PREFIX}:${extensionType}`;
    });
    // 将传入的更新数据转换成moddle对象
    const updateExtensionElements = updateExtensionList.map((item) => {
      switch (extensionType) {
        case 'TaskListener':
        case 'ExecutionListener': {
          const listenerObject: ListenerObject = {
            event: item.event,
            value: item.value
          };
          return createExtensionModdle(listenerObject, extensionType);
        }
        case 'Properties': {
          const propertiesObject: PropertiesObject = {
            name: item.name,
            value: item.value
          };
          return createExtensionModdle(propertiesObject, extensionType);
        }
        default:
          return null;
      }
    });
    // 修改后新的扩展属性, 当前修改类型+其他类型扩展属性
    let newExtensionElements: Recordable[] | undefined = otherExtensionElements.concat(updateExtensionElements);
    newExtensionElements = newExtensionElements.length > 0 ? newExtensionElements : undefined;
    const extensions = moddle.create('bpmn:ExtensionElements', {
      values: newExtensionElements
    });
    // 更新属性
    updateProperties(element, {
      extensionElements: extensions
    });
  }

  /**
   * 获取扩展属性
   *
   * @param element 当前元素
   * @param includeExtensionType 包含的扩展属性类型
   */
  function getExtensionElements(element: Element, includeExtensionType?: ExtensionType): Recordable[] {
    // 获取所有扩展属性
    let extensionElements = getBusinessObject(element).extensionElements?.values ?? [];
    if (includeExtensionType !== undefined) {
      // 筛选扩展属性类型
      extensionElements = extensionElements.filter((element) => {
        // 扩展属性类型
        const type = element.$type;
        return `${BPMN_MODDLE_PREFIX}:${includeExtensionType}` === type;
      });
    }
    return extensionElements;
  }

  /**
   * 获取扩展属性对象列表
   *
   * @param element 当前元素
   * @param includeExtensionType 包含的扩展属性类型
   */
  function getExtensionObjectList(element: Element, includeExtensionType?: ExtensionType): Recordable[] {
    // 获取扩展属性
    const elements = getExtensionElements(element, includeExtensionType);
    // 返回属性对象列表
    const extensionObjectList = elements.map((element) => {
      // 扩展属性类型
      const type = element.$type;
      // 扩展属性对象
      let extensionObject: Recordable = {};
      switch (type) {
        case `${BPMN_MODDLE_PREFIX}:TaskListener`:
          extensionObject = {
            type: 'TaskListener',
            event: element.event,
            value: element.fields[0].stringValue
          };
          break;
        case `${BPMN_MODDLE_PREFIX}:ExecutionListener`:
          extensionObject = {
            type: 'ExecutionListener',
            event: element.event,
            value: element.fields[0].stringValue
          };
          break;
        case `${BPMN_MODDLE_PREFIX}:Properties`: {
          const { name, value } = element.$attrs;
          extensionObject = {
            type: 'Properties',
            name,
            value
          };
          break;
        }
      }
      return extensionObject;
    });
    return extensionObjectList;
  }

  return {
    updateProperties,
    updatePropertiesById,
    updateAcitiviProperties,
    updateModdleProperties,
    updateAcitiviModdleProperties,
    updateModdlePropertiesById,
    updateExtensions,
    getExtensionElements,
    modeling,
    getExtensionObjectList,
    updateAcitiviAssign
  };
}
