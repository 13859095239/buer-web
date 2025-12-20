/**
 * basic控件设置
 *
 * @author zoulan
 * @since 2023-05-21
 */

import type { RowSelectionType } from '/@/components/Table/src/types/table';
import { COMPONENT_SIZE_ENUM } from '/@/constants/appConstants';

/** 表格组件选中类型 */
export const TABLE_ROW_SELECTION_TYPE: RowSelectionType = 'multiple';

/** 流程引擎moddle前缀 */
export const BPMN_MODDLE_PREFIX = 'flowable';
/** 多实例任务分配候选组监听器后端类 */
export const CANDIDATE_GROUP_TASK_LISTENER = 'com.buer.flow.biz.Listener.CandidateGroupTaskListener';
/** 流程引擎moddle前缀 */
export const FLOW_TASK_LISTENER_CLASS = 'com.buer.flow.biz.Listener.BasicTaskListener';
/** 流程引擎moddle前缀 */
export const FLOW_EXECUTION_LISTENER_CLASS = 'com.buer.flow.biz.Listener.BasicExecutionListener';
/** form组件标签宽度 */
export const FORM_LABLE_WIDTH = 100;
/** 分页组件分页选项 */
export const PAGE_SIZE_OPTIONS = [10, 20, 50, 100];
/** modal组件默认靠顶距离 */
export const MODAL_TOP = '50px';
/** modal组件默认宽度 */
export const MODAL_WIDTH = 'column-1';
/** drawer组件默认宽度 */
export const DRAWER_SIZE = '400';

/** Tree/SelectTree/Select/Cascader/Table等组件绑定label列设置 */
export const KEYS_LABEL = 'name';
/** 组件绑定label列设置 */
export const KEYS_VALUE = 'id';
/** 组件绑定父节点id列设置 */
export const KEYS_PARENT_ID = 'parentId';
/** 组件绑定children子节点列设置 */
export const KEYS_CHILDREN = 'children';
/** 组件绑定disabled禁用列设置 */
export const KEYS_DISABLED = 'disabled';

/** Select/Cascader等下拉选择控件，默认未选中时显示的内容 */
export const SELECT_PLACEHOLDER = '请选择';

/** upload组件文件上传地址 */
export const UPLOAD_ACTION = '/web/api/resource/oss/upload';
/** upload组件最大附件数 */
export const UPLOAD_MAX_LENGTH = 5;

/** rate 设置 */
export const RATE_COUNT = 5;
/** slider组件最小值设置 */
export const SILIDER_MIN = 0;
/** slider组件最大值设置 */
export const SILIDER_MAX = 100;

/** spin尺寸设置 */
export const SPIN_SIZE = COMPONENT_SIZE_ENUM.LARGE;

export const FLOW_SETTING = {};
