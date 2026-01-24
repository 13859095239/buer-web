import { saveAs } from 'file-saver';
import moment from 'moment';

/**
 * 保存文件（通过URL）
 * @param url 文件URL
 * @param fileName 文件名
 */
export function saveFile(url: string, fileName: string) {
  saveAs(url, fileName);
}

/**
 * 通过字符串内容保存文件
 * @param content 文件内容
 * @param fileName 文件名
 */
export function saveFileByStr(content: string, fileName: string) {
  const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
  saveAs(blob, fileName);
}

/**
 * 从响应头中提取文件名
 */
function extractFileNameFromHeaders(headers: any): string {
  if (!headers) return '';
  const downloadFilename = headers['download-filename'] || headers['Download-Filename'];
  if (downloadFilename) {
    try {
      return decodeURIComponent(downloadFilename);
    } catch {
      return downloadFilename;
    }
  }
  const contentDisposition = headers['content-disposition'] || headers['Content-Disposition'];
  const match = contentDisposition?.match(/filename\*=utf-8''(.+?)(?:;|$)|filename="(.+?)"|filename=([^;]+)/i);
  if (match) {
    const filename = (match[1] || match[2] || match[3])?.trim();
    if (filename) {
      try {
        return decodeURIComponent(filename);
      } catch {
        return filename;
      }
    }
  }
  return '';
}

/**
 * 通过Blob保存文件
 * @param response Blob或ArrayBuffer数据，或者包含data和headers的对象
 * @param fileName 文件名（可选），如果为空则从响应头中提取
 */
export function saveFileByBlob(response: any, fileName?: string) {
  // 提取blob和headers
  let blob: Blob;
  let headers: any = null;
  if (response instanceof Blob || response instanceof ArrayBuffer) {
    blob = response instanceof ArrayBuffer ? new Blob([response]) : response;
  } else if (response?.data || response?.blob) {
    const data = response.data || response.blob;
    if (!(data instanceof Blob || data instanceof ArrayBuffer)) {
      throw new TypeError('响应数据格式不正确，期望Blob或ArrayBuffer');
    }
    blob = data instanceof ArrayBuffer ? new Blob([data]) : data;
    headers = response.headers;
  } else {
    throw new TypeError('响应数据格式不正确，期望Blob或ArrayBuffer');
  }

  if (blob.size === 0) throw new Error('下载的文件为空');

  // 处理文件名
  if (!fileName?.trim()) {
    fileName = extractFileNameFromHeaders(headers);
    if (!fileName) throw new Error('无法获取文件名，请提供文件名参数或确保响应头包含文件名信息');
  }

  // 在文件名末尾添加日期
  const dateStr = moment().format('YYYYMMDD');
  const lastDotIndex = fileName.lastIndexOf('.');
  const nameWithoutExt = lastDotIndex > 0 ? fileName.substring(0, lastDotIndex) : fileName;
  const ext = lastDotIndex > 0 ? fileName.substring(lastDotIndex) : '.xlsx';
  fileName = `${nameWithoutExt}_${dateStr}${ext}`;

  saveAs(blob, fileName);
}
