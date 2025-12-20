/**
 * 属性实体
 *
 * @author zoulan
 * @since 2023-07-01
 */

/** 基础属性 */
interface BasicPropertie {
  /** id */
  id: string;
  /** 名称 */
  name: string;
}

/** 用户任务属性 */
export interface UserTaskPropertie extends BasicPropertie {
  limitTime;
  remind;
  remindBefoureLimitTime;
  remindIntervalTime;
  remindCount;
  assigneeType;
  assignee;
  candidateUsers;
  multiSign;
  flowMultiSignType;
  flowMultiSignPercent;
}

/**
 * 开始事件属性
 */
export interface StartEventPropertie {}

/** 结束事件属性 */
export interface EndEventPropertie {}

/** 连接线属性 */
export interface sequenceFlowPropertie extends BasicPropertie {
  /**  条件表达式 */
  conditionExpression: ConditionExpression;
}

/** 条件表达式 */
export interface ConditionExpression {
  /** 表达式 */
  body: string;
}
