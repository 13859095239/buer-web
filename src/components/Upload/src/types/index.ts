import type { ProgressProps, UploadFile } from 'tdesign-vue-next';

export type RegisterFn = (props: BasicUploadProps) => UploadMethods;
/** Upload组件参数 */
export interface BasicUploadProps extends Pick<ProgressProps, 'color' | 'strokeWidth'> {
  /** 是否允许编辑 */
  editable?: boolean;
  /** 自动生成fileGroupId */
  autoGenerateId?: boolean;
  /** 是否多选 */
  multiple?: boolean;
  /** 最大上传个数 */
  maxLength?: number;
  /** 注册事件 */
  onRegister?: (uploadMethods: UploadMethods) => void;
}
/** 文件项 */
export interface UploadData {
  /** 文件组id */
  fileGroupId: string;
  /** 文件列表 */
  uploadDataItems: UploadDataItem[];
}
/** 文件项 */
export interface UploadDataItem {
  /** 文件fileId */
  id: string;
  /** 操作 */
  status: 'add' | 'delete' | 'update' | 'normal';
}
/** Upload组件方法 */
export interface UploadMethods {
  /** 清空数据 */
  clearData: () => void;
  /** 自动生成fileGroupId */
  generateFileGroupId: () => void;
  /** 获取提交数据 */
  getUploadData: () => string;
}

export interface UploadEmit {
  (e: 'update:methods', tableMethods: Required<UploadMethods>): void;
  (e: 'update:modelValue', value: string | undefined): void;
  (e: 'update:modelData', value: UploadData | undefined): void;
  (e: 'update:modelFileList', value: Recordable[]): void;
}

/** 文件列表类型 */
export type UploadFileList = BasicUploadFile[];

export interface BasicUploadFile extends UploadFile {
  /** 文件id */
  ossId: string;
}
