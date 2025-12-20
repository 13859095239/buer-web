/**
 * <p>
 * Bpmn组件types
 * </p>
 *
 * @author zoulan
 * @since 2023-06-21
 */
import type { SaveXMLResult } from 'bpmn-js/lib/BaseViewer';
import type Modeling from 'bpmn-js/lib/features/modeling/Modeling';
import type { Moddle, ModdleElement, Root } from 'bpmn-js/lib/model/Types';
import type Modeler from 'bpmn-js/lib/Modeler';
import type ElementRegistry from 'diagram-js/lib/core/ElementRegistry';

export type { UserTaskPropertie } from './properties';
export type RegisterFn = (props: BasicBpmnProps) => BpmnMethods;
export interface BasicBpmnProps {
  /** Bpmn组件模式,默认edit */
  mode?: 'edit' | 'view';
  /** 是否显示保存按钮 */
  saveButton?: boolean;

  /** Bpmn组件对外方法 */
  methods?: BpmnMethods;

  // onSave?: () => void;
}

export interface BpmnMethods {
  /** 导入xml */
  importXML: (xml) => void;
  /** 获取当前xml内容 */
  getXml: () => Promise<SaveXMLResult>;
  /** 保存事件 */
  onSave: () => void;

  /** 获取Modeler对象 */
  getModeler: () => Modeler;
  /** 获取Moddle对象 */
  getModdle: () => Moddle;
  /** 获取lementRegistry对象 */
  getElementRegistry: () => ElementRegistry;
  /** 获取Modeling对象 */
  getModeling: () => Modeling;
  /** 更新元素属性 */
  updateProperties: (element: Element, propertie: Recordable) => void;
  /** 通过id,更新元素属性 */
  updatePropertiesById: (elementId: string, propertie: Recordable) => void;
  /** 更新当前活动元素属性 */
  updateAcitiviProperties: (propertie: Recordable) => void;
  /** 更新元素的Moddle属性 */
  updateModdleProperties: (element: Element, moddleElement: ModdleElement, propertie: Recordable) => void;
  /** 通过id,更新元素的Moddle属性 */
  updateModdlePropertiesById: (elementId: string, moddleElement: ModdleElement, propertie: Recordable) => void;
  /** 更新当前活动元素的Moddle属性 */
  updateAcitiviModdleProperties: (moddleElement: ModdleElement, propertie: Recordable) => void;
  /** 更新当前活动元素的Moddle属性 */
  updateAcitiviAssign: (
    userOrGroupIds: string[],
    assignType?: AssignTypeEnum,
    auditType?: AuditTypeEnum,
    multiSignPercent?: MultiSignPercentEnum,
    variableType?: AssignVariableTypeEnum,
    variableName?: string
  ) => void;

  /** 更新元素的扩展属性 */
  updateExtensions: (element: Element, extensionType: ExtensionType, updateExtensionList: Recordable[]) => void;
  /** 获取扩展属性 */
  getExtensionElements: (element: Element) => Recordable[];
  /** 获取扩展属性对象列表 */
  getExtensionObjectList: (element: Element, extensionType?: ExtensionType) => Recordable[];
  /** 获取当前活动元素 */
  getActiveElement: () => any;
  /** 设置当前活动元素 */
  setActiveElement: (activatedElement: any) => void;
  /** 开启元素改变事件 */
  startChangeActiveElement: () => void;
  /** 关闭元素改变事件 */
  stopChangeActiveElement: () => void;
  /** 设置默认当前活动元素 */
  setDefaultActiveElement: () => void;
}

/** Element 有关的事件回调参 */
export interface ElementEvent {
  element: Root;
  event: PointerEvent;
}

/** Element类型Enum */
export enum ElementTypeEnum {
  TASK = 'bpmn:Task',
  START_EVENT = 'bpmn:StartEvent',
  END_EVENT = 'bpmn:EndEvent',
  SERVICE_TASK = 'bpmn:ServiceTask',
  USER_TASK = 'bpmn:UserTask',
  BusinessRule_TASK = 'bpmn:BusinessRuleTask',
  SCRIPT_TASK = 'bpmn:ScriptTask',
  RECEIVE_TASK = 'bpmn:ReceiveTask',
  MANUAL_TASK = 'bpmn:ManualTask',
  SEQUENCE_FLOW = 'bpmn:SequenceFlow',
  EXCLUSIVE_GATEWAY = 'bpmn:ExclusiveGateway',
  PARALLEL_GATEWAY = 'bpmn:ParallelGateway',
  INCLUSIVE_GATEWAY = 'bpmn:InclusiveGateway',
  EVENT_BASED_GATEWAY = 'bpmn:EventBasedGateway',
  INTERMEDIATE_CATCH_EVENT = 'bpmn:IntermediateCatchEvent',
  INTERMEDIATE_THROW_EVENT = 'bpmn:IntermediateThrowEvent',
  BOUNDARY_EVENT = 'bpmn:BoundaryEvent',
  CALL_ACTIVITY = 'bpmn:CallActivity',
  SUB_PROCESS = 'bpmn:SubProcess',
  PROCESS = 'bpmn:Process'
}

/**
 * 扩展属性类型
 * ExecutionListener 执行事件
 * TaskListener 任务事件
 * Properties 扩展属性
 */
export type ExtensionType = 'ExecutionListener' | 'TaskListener' | 'Properties';

export interface ListenerObject {
  /** 事件类型 */
  event: string;
  /** 创建时参数 */
  value: string;
}

export interface PropertiesObject {
  /** 变量名 */
  name: string;
  /** 变量值 */
  value: string;
}

/** 审批类型 */
export enum AssignTypeEnum {
  /** 人员 */
  USER = 'user',
  /** 角色 */
  ROLE = 'role',
  /** 部门 */
  DEPT = 'dept',
  /** 岗位 */
  POST = 'post',
  /** 团队 */
  TEAM = 'team',
  /** 发起人 */
  START_USER = 'startUser',
  /** 发起人部门领导 */
  DEPT_LEADER = 'deptLeader',
  /** 发起人上级部门领导 */
  PARENT_DEPT_LEADER = 'parentDeptLeader',
  /** 自定义变量 */
  CUSTOM_VARIABLE = 'customVariable'
}

/** 审批方式 */
export enum AuditTypeEnum {
  /** 竞签 */
  CANDIDATE = 'candidate',
  /** 并签 */
  COMBINE = 'combine',
  /** 串签 */
  SEQUENTIAL = 'sequential'
}

/** 流程会签比例 */
export enum MultiSignPercentEnum {
  /** 25%以上处理人审批通过即可 */
  PERCENT_25 = '25',
  /** 50%以上处理人审批通过即可 */
  PERCENT_50 = '50',
  /** 75%以上处理人审批通过即可 */
  PERCENT_75 = '75',
  /** 100%以上处理人审批通过即可 */
  PERCENT_100 = '100'
}
