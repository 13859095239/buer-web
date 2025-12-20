/**
 * 流程定义 API
 *
 * @author zoulan
 * @since 2024-06-07
 */
import { http } from '../../utils/http';

/**
 * 通过id查询流程定义
 *
 * @param id id
 * @returns 模型类型对象
 */
export const getProcessDefinitionById = (id: string): Promise<Recordable> => {
  return http.get({ url: `flow/process-definition/${id}` });
};

/**
 * 分页查询流程定义
 *
 * @param params 请求参数
 * @returns  模型类型分页对象
 */
export const pageProcessDefinition = (params: Recordable) => {
  return http.get<any>({ url: 'flow/process-definition/page', params });
};

/**
 * 新增流程定义
 *
 * @param data 请求参数
 * @returns 是否成功
 */
export const saveProcessDefinition = (data: Recordable): Promise<boolean> => {
  return http.post({ url: 'flow/process-definition', data });
};

/**
 * 通过id修改流程定义
 *
 * @param data 请求参数
 * @returns 是否成功
 */
export const updateProcessDefinitionById = (data: Recordable): Promise<boolean> => {
  return http.put({ url: 'flow/process-definition', data });
};

/**
 * 通过id删除流程定义
 *
 * @param id id
 * @returns 是否成功
 */
export const removeProcessDefinitionByIds = (ids: string[]): Promise<boolean> => {
  return http.delete({ url: 'flow/process-definition', data: ids });
};

/**
 * 通过流程实例id获取流程图
 *
 * @param procDefId 流程实例id
 * @returns 模型对象
 */
export const getBpmnByProcessDefinitionId = (procDefId: string) => {
  return http.get({
    url: `flow/process-definition/bpmn/procDefId/${procDefId}`
  });
};

/**
 * 通过模型key获取最新流程图
 *
 * @param modelKey 模型key
 * @returns 模型对象
 */
export const getNewestBpmnByModelKey = (modelKey: string) => {
  return http.get({ url: `flow/process-definition/bpmn/modelKey/${modelKey}` });
};
/**
 * 通过id更新流程定义状态
 * 激活->挂起
 *
 * @param id id
 * @returns boolean
 */
export const suspendProcDefById = (id: string): Promise<boolean> => {
  return http.put({ url: `flow/process-definition/suspendProcDefById/${id}` });
};

/**
 * 通过id更新流程定义状态
 * 挂起->激活
 *
 * @param id id
 * @returns boolean
 */
export const activateProcDefById = (id: string): Promise<boolean> => {
  return http.put({ url: `flow/process-definition/activateProcDefById/${id}` });
};
