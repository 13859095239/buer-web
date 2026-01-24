/**
 * 文件处理 hooks
 * 处理文件选择、读取等逻辑
 *
 * @author zoulan
 * @since 2024-01-01
 */
import { ref } from 'vue';

export function useFile() {
  const fileList = ref<any[]>([]);
  const selectedFile = ref<File | null>(null);
  const originalFileBuffer = ref<ArrayBuffer | null>(null);

  /**
   * 格式化上传响应（不需要实际上传）
   */
  const formatResponse = () => {
    return { url: '', name: '' };
  };

  /**
   * 文件选择变化处理
   * @param files 文件列表
   */
  const handleFileChange = (files: any[]) => {
    // 更新文件列表
    fileList.value = files;

    // 从文件列表中获取选中的文件
    const validFiles = files.filter(f => f.status !== 'fail' && f.status !== 'error');
    if (validFiles.length > 0) {
      const fileItem = validFiles[0];
      // 尝试多种方式获取 File 对象
      let fileObj: File | null = null;
      
      if (fileItem.raw instanceof File) {
        fileObj = fileItem.raw;
      } else if (fileItem instanceof File) {
        fileObj = fileItem;
      } else if (fileItem.originFileObj instanceof File) {
        fileObj = fileItem.originFileObj;
      }
      
      if (fileObj) {
        selectedFile.value = fileObj;

        // 读取文件为 ArrayBuffer，用于后续生成异常文件
        const reader = new FileReader();
        reader.onload = (e) => {
          originalFileBuffer.value = e.target?.result as ArrayBuffer;
        };
        reader.readAsArrayBuffer(fileObj);
      } else {
        // 如果无法获取 File 对象，尝试从文件信息创建
        console.warn('无法从文件对象中提取 File，文件信息:', fileItem);
        selectedFile.value = null;
        originalFileBuffer.value = null;
      }
    } else {
      // 没有有效文件，清空选择
      selectedFile.value = null;
      originalFileBuffer.value = null;
    }
  };

  /**
   * 清空文件相关状态
   */
  const clearFile = () => {
    fileList.value = [];
    selectedFile.value = null;
    originalFileBuffer.value = null;
  };

  return {
    fileList,
    selectedFile,
    originalFileBuffer,
    formatResponse,
    handleFileChange,
    clearFile
  };
}
