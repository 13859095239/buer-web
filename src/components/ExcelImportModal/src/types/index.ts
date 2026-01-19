/**
 * Excel导入弹窗组件类型定义
 *
 * @author zoulan
 * @since 2024-01-01
 */

/**
 * Excel导入弹窗组件属性接口
 *
 * @interface BasicExcelImportModalProps
 */
export interface BasicExcelImportModalProps {
  /**
   * 弹窗标题
   * @default 'Excel数据导入'
   */
  title?: string;

  /**
   * 导入接口地址
   * @required
   */
  importUrl: string;

  /**
   * 模板下载地址
   */
  templateUrl?: string;
}

/**
 * 导入成功结果接口
 *
 * @interface ImportSuccessResult
 */
export interface ImportSuccessResult {
  /**
   * 成功导入的数量
   */
  success: number;

  /**
   * 是否有异常
   */
  hasError: boolean;

  /**
   * 异常行信息数组
   */
  errorRows?: Array<{
    /**
     * 行索引（从1开始，第1行是表头，第2行开始是数据）
     */
    rowIndex: number;

    /**
     * 异常信息
     */
    message: string;
  }>;
}

/**
 * Excel导入弹窗组件事件接口
 *
 * @interface ExcelImportModalEmit
 */
export interface ExcelImportModalEmit {
  /**
   * 导入成功事件
   * @param e 事件名称 'success'
   * @param result 导入成功的结果数据，包含成功数量、错误信息等
   */
  (e: 'success', result: ImportSuccessResult): void;

  /**
   * 导入失败事件
   * @param e 事件名称 'error'
   * @param error 错误对象，包含失败原因等错误信息
   */
  (e: 'error', error: Error): void;
}
