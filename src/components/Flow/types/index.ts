/**
 * 流程组件展示模式
 * create 创建流程
 * todo 流程办理
 * view 流程查看
 * print 流程打印
 */
export type FlowFormMode = 'create' | 'todo' | 'done' | 'view' | 'print';

/** 流程信息 */
export interface FlowInfo {
  /** 任务id */
  taskId?: string;
  /** 任务名称 */
  taskName?: string;
  /** 流程实例id */
  procInstId?: string;
  /** 流程定义id */
  procDefId: string;
  /** 流程实例名称 */
  procInstName?: string;
  /** 流程实例流水号 */
  businessKey?: string;
  /** 流程实例开始时间 */
  procInstStartTime?: string;
  /** 流程实例结束时间 */
  procInstEndTime?: string;
  /** 模型key */
  modelKey: string;
  /** 模型名称 */
  modelName: string;
  /** web表单路径 */
  modelWebPath: string;
}

/** 流程实例信息 */
export interface ProcinstInfo {
  /** 流程实例名称 */
  name: string;
  /** 流程实例id */
  procInstId: string;
  /** 流程定义id */
  procDefId: string;
  /** 流程实例流水号 */
  businessKey: string;
  /** 流程实例开始时间 */
  startTime: string;
  /** 流程实例结束时间 */
  endTime: string;
  /** 模型key */
  modelKey: string;
  /** 模型名称 */
  modelName: string;
  /** web表单路径 */
  webPath: string;
}

/** 任务信息 */
export interface TaskInfo {
  id: string;
  name: string;
  permission: Map<string, string>;
}

/** 流程表单 props */
export interface FlowFormProps {
  /** 流程路由模式 */
  flowFormMode: FlowFormMode;
  /** 流程信息 */
  flowInfo: FlowInfo;
  /** 保存完成事件,通常用于刷新父页面列表 */
  onSaved: () => void;
}
