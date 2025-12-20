import { saveAs } from 'file-saver';

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
 * 通过Blob保存文件
 * @param response Blob或ArrayBuffer数据
 * @param fileName 文件名
 */
export function saveFileByBlob(response: any, fileName: string) {
  // 检查是否是有效的Blob数据
  if (!(response instanceof Blob) && !(response instanceof ArrayBuffer)) {
    throw new TypeError('响应数据格式不正确，期望Blob或ArrayBuffer');
  }
  const blob = response as Blob;
  // 检查Blob大小
  if (blob.size === 0) {
    throw new Error('下载的文件为空');
  }
  fileName = `${fileName}_${new Date().toISOString().slice(0, 10).replace(/-/g, '')}.xlsx`;
  saveAs(blob, fileName);
}
