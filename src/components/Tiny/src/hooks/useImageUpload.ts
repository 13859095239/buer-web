/**
 * 图片上传 hooks
 *
 * @author zoulan
 * @since 2023-12-11
 */

import { http } from '/@/utils/http';

export function useImageUpload() {
  /**
   * 上传图片 Handler
   * 参考官网 https://www.tiny.cloud/docs/configure/file-image-upload/#images_upload_handler
   */
  const imagesUploadHandler = (blobInfo): Promise<string> =>
    new Promise((resolve, reject) => {
      const filename = blobInfo.filename();
      const formData = new FormData();
      formData.append('file', blobInfo.blob(), filename);

      http
        .post({
          url: 'resource/oss/upload',
          data: formData,
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        })
        .then((r) => {
          // 上传成功返回图片url
          resolve(r.url);
        })
        .catch(() => reject());
    });
  return { imagesUploadHandler };
}
