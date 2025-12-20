export type RegisterFn = (props: BasicFlowRouterProps) => FlowRouterMethods;

export interface BasicFlowRouterProps {
  /** 保存完成事件 */
  onSaved?: () => void;
  /**  注册事件 */
  onRegister?: (flowRouterMethods: FlowRouterMethods) => void;
}

export interface FlowRouterMethods {
  /** 弹出新增流程 */
  showAddProcinst: (modelKey: string) => void;
  /** 弹出办理流程 */
  showMyTodoTask: (taskId: string, procInstId: string) => void;
  /** 弹出查看已办流程 */
  showMyDoneTaskinst: (taskId: string) => void;
  /** 弹出查看流程信息 */
  showViewProcinst: (procInstId: string) => void;
  /** 弹出查看打印信息 */
  showPrintProcinst: (procInstId: string) => void;
  /** 弹出待阅办流程 */
  showDoCc: (ccId: string) => void;
  /** 弹出已阅办流程 */
  showDoneCc: (ccId: string) => void;

  /**
   * 认领任务
   *
   * @param taskId 任务ID
   * @returns void
   *
   */
  claimTask: (taskId: string) => Promise<boolean>;

  /**
   * 撤销认领任务
   *
   * @param taskId 任务ID
   * @returns void
   *
   */
  unclaimTask: (taskId: string) => Promise<boolean>;
}

export interface FlowRouterEmit {
  (e: 'update:methods', flowRouterMethods: Required<FlowRouterMethods>): void;
}
