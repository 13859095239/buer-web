/**
 * Excel导入模态框组件类型定义
 * 包含组件属性、事件、方法等类型接口
 *
 * @author zoulan
 * @since 2025-10-01
 */

/** Excel导入模态框属性 */
export interface BasicExcelImportModalProps {
  /** 是否显示模态框 */
  visible?: boolean;
  /** 模态框标题 */
  title?: string;
  /** 导入接口地址 */
  importUrl?: string;
  /** 请求头 */
  headers?: Record<string, string>;
  /** 模板下载地址 */
  templateUrl?: string;
}

/** 导入结果数据 */
export interface ImportResult {
  /** 总数量 */
  total: number;
  /** 成功数量 */
  success: number;
  /** 失败数量 */
  failed: number;
  /** 错误信息列表 */
  errors?: ImportError[];
  /** 导入数据 */
  data?: any[];
}

/** 导入错误信息 */
export interface ImportError {
  /** 行号 */
  row: number;
  /** 列名 */
  column?: string;
  /** 错误信息 */
  message: string;
  /** 数据值 */
  value?: any;
}

/** 上传文件信息 */
export interface UploadFileInfo {
  /** 文件ID */
  fileId: string;
  /** 文件名 */
  fileName: string;
  /** 文件大小 */
  fileSize: number;
  /** 上传时间 */
  uploadTime: string;
  /** 文件状态 */
  status: 'uploading' | 'success' | 'error';
}

/** 模态框方法 */
export interface ExcelImportModalMethods {
  /** 显示模态框 */
  show: () => void;
  /** 隐藏模态框 */
  hide: () => void;
  /** 重置表单 */
  reset: () => void;
  /** 开始导入 */
  startImport: () => Promise<void>;
  /** 下载模板 */
  downloadTemplate: () => void;
  /** 导出错误日志 */
  exportErrorLog: () => void;
}

/** 模态框事件 */
export interface ExcelImportModalEmit {
  (e: 'update:visible', visible: boolean): void;
  (e: 'success', result: ImportResult): void;
  (e: 'error', error: Error): void;
  (e: 'upload-success', fileInfo: UploadFileInfo): void;
  (e: 'upload-error', error: Error): void;
}

/** 导入步骤枚举 */
export enum ImportStep {
  /** 上传文件 */
  UPLOAD = 1,
  /** 解析文件 */
  PARSE = 2,
  /** 验证数据 */
  VALIDATE = 3,
  /** 导入数据 */
  IMPORT = 4,
  /** 完成 */
  COMPLETE = 5
}

/** 导入步骤文本 */
export const IMPORT_STEP_TEXT = {
  [ImportStep.UPLOAD]: '上传文件',
  [ImportStep.PARSE]: '解析文件',
  [ImportStep.VALIDATE]: '验证数据',
  [ImportStep.IMPORT]: '导入数据',
  [ImportStep.COMPLETE]: '导入完成'
} as const;
