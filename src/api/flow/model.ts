/**
 * 模型 API
 *
 * @author zoulan
 * @since 2023-05-27
 */
import { http } from '../../utils/http';
/**
 * 通过id查询模型
 *
 * @param id id
 * @returns 模型对象
 */
export const getModelById = (id: string) => {
  return http.get({
    url: `flow/model/${id}`
  });
};

/**
 * 通过模型key 查询模型
 *
 * @param key 模型key置
 * @returns 模型对象
 */
export const getModelByKey = (key: string) => {
  return http.get({
    url: `flow/model/key/${key}`
  });
};

/**
 * 分页查询模型
 *
 * @param params 请求参数
 * @returns  模型分页
 */
export const pageModel = (params: Recordable) => {
  return http.get<any>({
    url: `flow/model/page`,
    params
  });
};

/**
 * 新增模型
 *
 * @param data 请求参数
 * @returns 是否成功
 */
export const saveModel = (data: Recordable): Promise<string> => {
  return http.post({
    url: 'flow/model',
    data
  });
};

/**
 * 通过id修改模型
 *
 * @param data 请求参数
 * @returns 是否成功
 */
export const updateModelById = (data: ModelUpdateDTO): Promise<boolean> => {
  return http.put({
    url: 'flow/model',
    data
  });
};

/**
 * 通过id删除模型
 *
 * @param id id
 * @returns 是否成功
 */
export const removeModelByIds = (ids: string[]): Promise<boolean> => {
  return http.delete({ url: 'flow/model', data: ids });
};

/**
 * 通过模型id,发布流程
 *
 * @param modelId 模型id
 * @returns 是否成功
 */
export const deployModelByModelId = (modelId: string): Promise<boolean> => {
  return http.post({
    url: `flow/model/deploy/modelId/${modelId}`
  });
};
/**
 * 通过流程定义id，发布为当前版本
 *
 * @param procDefId 流程定义
 * @returns 是否成功
 */
export const deployModelByProcDefId = (procDefId: string): Promise<boolean> => {
  return http.post({
    url: `flow/model/deploy/procDefId/${procDefId}`
  });
};

/**
 * 根据modelId获取model
 *
 * @param id
 * @returns
 */
export const getModelBpmn = (id: string) => {
  return http.get({ url: `flow/model/bpmn/${id}` });
};

/**
 * 根据modelId获取model
 *
 * @param data
 * @returns
 */
export const updateModelEditorBpmn = (data: Recordable) => {
  return http.put({ url: 'flow/model/bpmn', data });
};

/**
 * 模型 VO
 */
export interface ModelVO {
  /**
   * modelId
   */
  id?: string;
  /**
   * rev
   */
  rev?: number;

  /**
   * 名称
   */
  name?: string;

  /**
   * 模型key
   */
  key?: string;

  /**
   * desc
   */

  desc?: string;

  /**
   * category
   */
  category?: string;

  /**
   * description
   */
  description?: string;

  /**
   *version
   */
  version?: string;

  /**
   * 排序
   */
  sort?: number;

  /**
   * modelXml
   */
  modelXml?: string;
}

/**
 * 模型更新，包含xml DTO
 */
export interface ModelUpdateDTO extends Omit<ModelVO, 'version' | 'rev'> {}
