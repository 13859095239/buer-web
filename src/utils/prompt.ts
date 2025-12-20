/**
 * 提示工具类
 *
 * @author zoulan
 * @since 2024-05-05
 */
import { DialogPlugin, MessagePlugin } from 'tdesign-vue-next';
/**
 * 保存成功提示
 * @param content 消息内容
 *
 */
export function saveSuccess(content: string = '保存成功') {
  MessagePlugin.success(content);
}
/**
 * 保存失败提示
 * @param content 消息内容
 *
 */
export function saveError(content: string = '保存失败') {
  MessagePlugin.error(content);
}

/**
 * 删除成功提示
 * @param content 消息内容
 *
 */
export function deleteSuccess(content: string = '删除成功') {
  MessagePlugin.success(content);
}

/**
 * 保存失败提示
 * @param content 消息内容
 *
 */
export function errorMessage(content: string = '保存失败') {
  MessagePlugin.error(content);
}

/**
 * 删除数据提示
 *
 * @param onOk 确定事件
 * @param onCancel 取消事件
 * @returns 确定|取消
 */
export function deleteWarnModel(): Promise<boolean> {
  return warnModel('永久删除该数据');
}

/**
 * 获取统一警告内容
 *
 * @param content 消息内容
 */
function getModelWarnContent(content: string): string {
  return `此操作将${content}, 是否继续?`;
}

/**
 * 警告提示
 *
 * @param content 消息内容
 * @param onOk 确定事件
 * @param onCancel 取消事件
 * @returns 确定|取消
 */
export function warnModel(content: string): Promise<boolean> {
  return new Promise((resolve, reject) => {
    const confirmDialog = DialogPlugin.confirm({
      theme: 'warning',
      header: '操作提示',
      confirmBtn: '确定',
      cancelBtn: '取消',
      body: getModelWarnContent(content),
      onConfirm: () => {
        confirmDialog.hide();
        return resolve(true);
      },
      onCancel: () => {
        confirmDialog.hide();
        return reject(false);
      }
    });
  });
}
