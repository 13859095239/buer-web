/**
 * 字典类型
 *
 * @author zoulan
 * @since 2023-07-08
 */

/** 字典VO */
export interface DictVO {
  /** id */
  id: Long;

  /** 字典标识 */
  dictKey: string;

  /** 名称 */
  name: string;

  /** 描述 */
  description: string;

  /** 是否是系统内置 */
  systemFlag: string;
}
