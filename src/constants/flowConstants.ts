/**
 * 流程静态数据
 *
 * @author zoulan
 * @since 2025-09-25
 */

import type { StaticOption } from '../types/app/global';

/** 审批类型枚举 */
export enum ASSIGN_TYPE_ENUM {
  /** 人员 */
  USER = 'user',
  /** 角色 */
  ROLE = 'role',
  /** 部门 */
  DEPT = 'dept',
  /** 团队 */
  TEAM = 'team',
  /** 发起人 */
  START_USER = 'startUser',
  /** 发起人部门领导 */
  START_USER_DEPT_LEADER = 'startUserDeptLeader',
  /** 发起人上级部门领导 */
  START_USER_PARENT_DEPT_LEADER = 'startUserParentDeptLeader',
  /** 自定义变量 */
  CUSTOM_VARIABLE = 'CUSTOM_VARIABLE'
}

/** 审批类型列表 */
export const ASSIGN_TYPE_LIST: StaticOption[] = [
  {
    id: ASSIGN_TYPE_ENUM.USER,
    name: '人员'
  },
  {
    id: ASSIGN_TYPE_ENUM.ROLE,
    name: '角色'
  },
  {
    id: ASSIGN_TYPE_ENUM.DEPT,
    name: '部门'
  },
  {
    id: ASSIGN_TYPE_ENUM.TEAM,
    name: '团队'
  },
  {
    id: ASSIGN_TYPE_ENUM.START_USER,
    name: '发起人'
  },
  {
    id: ASSIGN_TYPE_ENUM.START_USER_DEPT_LEADER,
    name: '发起人部门领导'
  },
  {
    id: ASSIGN_TYPE_ENUM.START_USER_PARENT_DEPT_LEADER,
    name: '发起人上级部门领导'
  },
  {
    id: ASSIGN_TYPE_ENUM.CUSTOM_VARIABLE,
    name: '自定义变量'
  }
];

/** 审批方式枚举 */
export enum AUDIT_TYPE_ENUM {
  /** 竞签 */
  CANDIDATE = 'candidate',
  /** 并签 */
  COMBINE = 'combine',
  /** 串签 */
  SEQUENTIAL = 'sequential'
}

/** 审批方式列表 */
export const AUDIT_TYPE_LIST: StaticOption[] = [
  {
    id: AUDIT_TYPE_ENUM.CANDIDATE,
    name: '竞签'
  },
  {
    id: AUDIT_TYPE_ENUM.COMBINE,
    name: '并签'
  },
  {
    id: AUDIT_TYPE_ENUM.SEQUENTIAL,
    name: '串签'
  }
];

/** 审批变量类型枚举 */
export enum ASSIGN_VARIABLE_TYPE_ENUM {
  /** 人员变量 */
  USER = 'user',
  /** 组变量 */
  GROUP = 'group'
}

/** 审批变量类型列表 */
export const ASSIGN_VARIABLE_TYPE_LIST: StaticOption[] = [
  {
    id: ASSIGN_VARIABLE_TYPE_ENUM.USER,
    name: '人员变量'
  },
  {
    id: ASSIGN_VARIABLE_TYPE_ENUM.GROUP,
    name: '组变量'
  }
];

/** 流程会签比例枚举 */
export enum Multi_SIGN_PERCENT_ENUM {
  /** 25%以上处理人审批通过即可 */
  PERCENT_25 = '25',
  /** 50%以上处理人审批通过即可 */
  PERCENT_50 = '50',
  /** 75%以上处理人审批通过即可 */
  PERCENT_75 = '75',
  /** 100%以上处理人审批通过即可 */
  PERCENT_100 = '100'
}

/** 流程会签比例列表 */
export const Multi_SIGN_PERCENT_LIST: StaticOption[] = [
  { id: Multi_SIGN_PERCENT_ENUM.PERCENT_25, name: '25%' },
  { id: Multi_SIGN_PERCENT_ENUM.PERCENT_50, name: '50%' },
  { id: Multi_SIGN_PERCENT_ENUM.PERCENT_75, name: '75%' },
  { id: Multi_SIGN_PERCENT_ENUM.PERCENT_100, name: '100%' }
];

/** 操作按钮列表 */
export const OPERATION_BUTTON_LIST: StaticOption[] = [
  { id: 'agree', name: '同意' },
  { id: 'reject', name: '拒绝' },
  { id: 'rejectToStart', name: '驳回至起点' },
  { id: 'rejectToTask', name: '驳回至历史任务' },
  { id: 'transfer', name: '转办' },
  { id: 'suspend', name: '暂停' },
  { id: 'activate', name: '恢复' },
  { id: 'multiAdd', name: '加签' },
  { id: 'multiMinus', name: '减签' },
  { id: 'multiAgree', name: '会签(同意)' },
  { id: 'multiRefuse', name: '会签(拒绝)' },
  { id: 'multiAbstain', name: '会签(弃权)' }
];

/** 流转类型列表 */
export const SEQUENCE_FLOW_TYPE_LIST: StaticOption[] = [
  { id: 'normal', name: '普通顺序流' },
  { id: 'default', name: '默认顺序流' },
  { id: 'condition', name: '条件顺序流' }
];

/** 任务事件列表 */
export const TASK_LISTENER_EVENT_LIST: StaticOption[] = [
  { id: 'create', name: '任务创建时触发' },
  { id: 'assignment', name: '任务被分配给用户或组时触发' },
  { id: 'complete', name: '任务完成时触发' },
  { id: 'delete', name: '删除任务时触发' }
];

/** 执行事件列表 */
export const EXECUTE_LISENER_EVENT_LIST: StaticOption[] = [
  { id: 'start', name: '任务创建时流程实例启动时触发触发' },
  { id: 'end', name: '任务被分配给用户或组时触发' }
];
