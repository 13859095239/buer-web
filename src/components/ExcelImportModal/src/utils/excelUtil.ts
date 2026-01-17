/**
 * Excel处理工具函数
 *
 * @author zoulan
 * @since 2026-01-17
 */
import * as XLSX from 'xlsx';

/**
 * 异常行信息
 */
export interface ErrorRow {
  /** 行索引（从1开始，第1行是表头） */
  rowIndex: number;
  /** 异常信息 */
  message: string;
}

/**
 * 生成包含异常信息的Excel文件
 * @param originalBuffer 原始Excel文件的ArrayBuffer
 * @param errorRows 异常行信息数组
 * @returns 新的Excel文件的Blob对象
 */
export function generateErrorFile(originalBuffer: ArrayBuffer, errorRows: ErrorRow[]): Blob {
  // 读取原始Excel文件
  const workbook = XLSX.read(originalBuffer, { type: 'array' });
  const firstSheetName = workbook.SheetNames[0];
  const worksheet = workbook.Sheets[firstSheetName];

  // 将工作表转换为JSON，方便操作
  const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1, defval: '' });

  // 添加异常信息列标题
  if (jsonData.length > 0) {
    const headerRow = jsonData[0] as any[];
    headerRow.push('异常信息');
  }

  // 为每行添加异常信息
  // 注意：jsonData[0]是表头行（Excel第1行），jsonData[1]是第一条数据（Excel第2行）
  // 后端返回的rowIndex通常从2开始（第2行是第一条数据行）
  if (errorRows.length > 0 && jsonData.length > 0) {
    const originalHeaderColCount = (jsonData[0] as any[]).length - 1; // 原始表头列数（不包括刚添加的异常信息列）

    errorRows.forEach((errorRow) => {
      // rowIndex 通常从2开始（第2行是第一条数据），rowIndex=1是表头
      // 转换为数组索引：rowIndex=2 -> 数组索引1, rowIndex=1 -> 数组索引0（表头）
      if (errorRow.rowIndex < 1) {
        return; // 无效的行索引
      }

      const dataRowIndex = errorRow.rowIndex - 1; // 转换为数组索引（从0开始）

      if (dataRowIndex >= 0 && dataRowIndex < jsonData.length) {
        const row = jsonData[dataRowIndex] as any[];
        // 确保行有足够的列数（补齐到原始表头列数）
        while (row.length < originalHeaderColCount) {
          row.push('');
        }
        // 添加或更新异常信息（最后一列）
        const errorColIndex = originalHeaderColCount; // 异常信息列的索引
        if (row.length === originalHeaderColCount) {
          row.push(errorRow.message || '');
        } else {
          row[errorColIndex] = errorRow.message || '';
        }
      }
    });
  }

  // 创建新的工作表
  const newWorksheet = XLSX.utils.aoa_to_sheet(jsonData);

  // 创建工作簿
  const newWorkbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(newWorkbook, newWorksheet, firstSheetName);

  // 生成文件
  const wbout = XLSX.write(newWorkbook, { bookType: 'xlsx', type: 'array' });
  return new Blob([wbout], {
    type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
  });
}
