/**
 * <p>
 * 模型 API
 * </p>
 *
 * @author zoulan
 * @since 2023-05-27
 */

/**
 * 模型 VO
 */
export interface ModelVO {
  /**
   * modelId
   */
  id: string;
  /**
   * rev
   */
  rev: number;

  /**
   * 名称
   */
  name: string;

  /**
   * 模型key
   */
  key: string;

  /**
   * desc
   */

  desc: string;

  /**
   * category
   */
  category: string;

  /**
   * description
   */
  description: string;

  /**
   *version
   */
  version: string;

  /**
   * 排序
   */
  sort: number;

  /**
   * modelXml
   */
  modelXml: string;
}

/**
 * 模型更新，包含xml DTO
 */
export interface ModelUpdateDTO extends Omit<ModelVO, 'version' | 'rev'> {}
