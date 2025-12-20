import { saveAs } from 'file-saver';

export function useDownload() {
  function saveFile(url: string, fileName: string) {
    saveAs(url, fileName);
  }
  function saveFileByStr(content: string, fileName: string) {
    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    saveAs(blob, fileName);
  }
  function saveFileByBlob(blob: Blob, fileName: string) {
    saveAs(blob, fileName);
  }
  return { saveFile, saveFileByStr, saveFileByBlob };
}
