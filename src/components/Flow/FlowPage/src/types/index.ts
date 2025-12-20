import type { FlowFormMode, FlowInfo } from '../../../types';

export type RegisterFn = (props: BasicFlowPageProps) => FlowPageMethods;

export interface BasicFlowPageProps {
  /** 流程组件展示模式 */
  flowFormMode: FlowFormMode;
  /** 流程信息 */
  flowInfo?: FlowInfo;
  /** 创建流程事件 */
  onCreateProcinst?: () => void;
  /** 办理完成事件 */
  onCompleteTask?: () => void;
  /**  注册事件 */
  onRegister?: (FlowPageMethods: FlowPageMethods) => void;
}

export interface FlowPageMethods {
  /** 关闭modal */
  close: () => void;
  /** 关闭modal并刷新页面 */
  closeWithRefresh: () => void;
}

export interface FlowFormEmit {
  (e: 'update:methods', FormMethods: Required<FlowPageMethods>): void;
  (e: 'close'): void;
}
