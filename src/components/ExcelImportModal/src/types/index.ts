/**
 * Excel导入弹窗组件类型定义
 *
 * @author zoulan
 * @since 2024-01-01
 */

export interface BasicExcelImportModalProps {
  /** 弹窗标题 */
  title?: string;

  /** 导入接口地址 */
  importUrl: string;

  /** 模板下载地址 */
  templateUrl?: string;
}

export interface ImportSuccessResult {
  /** 成功导入的数量 */
  success: number;

  /** 是否有异常 */
  hasError: boolean;

  /** 异常行信息 */
  errorRows?: Array<{
    /** 行索引（从1开始，第1行是表头，第2行开始是数据） */
    rowIndex: number;

    /** 异常信息 */
    message: string;
  }>;
}

export interface ExcelImportModalEmit {
  /** 导入成功事件 */
  (e: 'success', result: ImportSuccessResult): void;

  /** 导入失败事件 */
  (e: 'error', error: Error): void;
}
