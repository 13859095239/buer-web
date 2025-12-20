/**
 * 字典项类型
 *
 * @author zoulan
 * @since 2023-07-08
 */
/** 字典项VO */
export interface DictItemVO {
  /** id */
  id: Long;

  /** 字典id */
  dictId: Long;

  /** 字典标识 */
  dictKey: string;

  /** 名称 */
  name: string;

  /** 值 */
  value: string;

  /** 类型 */
  type: 'default' | 'primary' | 'success' | 'warning' | 'danger' | undefined;

  /** 描述 */
  description: string;

  /** 排序 */
  sort: number;
}
