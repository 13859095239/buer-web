/**
 * Excel导入弹窗组件类型定义
 *
 * @author zoulan
 * @since 2026-01-18
 */

/**
 * Excel导入弹窗组件属性接口
 *
 */
export interface BasicExcelImportModalProps {
  /**
   * 弹窗标题
   */
  title: string;

  /**
   * 后端导入API地址
   */
  importUrl: string;

  /**
   * 模板下载地址
   */
  templateUrl: string;
}

/**
 * 导入成功结果接口，导入操作完成后返回的结果数据，包含成功数量、错误信息等
 *
 */
export interface ImportSuccessResult {
  /**
   * 成功导入的数量，成功导入的数据行数（不包括表头）
   */
  success: number;

  /**
   * 是否有异常，标识导入过程中是否存在错误或异常数据
   */
  hasError: boolean;

  /**
   * 异常行信息数组，包含所有导入失败或存在异常的数据行信息
   */
  errorRows?: Array<{
    /**
     * 行索引（从1开始，第1行是表头，第2行开始是数据），Excel文件中的行号，用于定位错误数据的位置
     */
    rowIndex: number;

    /**
     * 异常信息，该行数据的具体错误描述信息
     */
    message: string;
  }>;
}

/**
 * Excel导入弹窗组件事件接口，定义组件可以触发的事件类型
 *
 * @interface ExcelImportModalEmit
 */
export interface ExcelImportModalEmit {
  /**
   * 导入成功事件，当Excel文件导入操作成功完成时触发，无论是否有部分数据异常
   * @param e 事件名称 'success'
   * @param result 导入成功的结果数据，包含成功数量、错误信息等
   */
  (e: 'success', result: ImportSuccessResult): void;

  /**
   * 导入失败事件，当Excel文件导入操作失败时触发
   * @param e 事件名称 'error'
   * @param error 错误对象，包含失败原因等错误信息
   */
  (e: 'error', error: Error): void;
}
