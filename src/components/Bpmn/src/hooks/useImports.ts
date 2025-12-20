/**
 * modeler 导入 hooks
 *
 * @author zoulan
 * @since 2023-06-21
 */
import type Modeler from 'bpmn-js/lib/Modeler';
import type { Ref } from 'vue';

import type { BpmnMethods } from '../types';

export function useImports(modeler: Ref<Modeler>, methods: BpmnMethods) {
  /**
   * 导入xml
   *
   * @param xml xml 注意xml中key不能是数字,如果是数字会报错,无法显示
   */
  async function importXML(xml) {
    try {
      const { warnings } = await modeler.value.importXML(xml);
      if (warnings && warnings.length) {
        warnings.forEach((warn) => console.warn(warn));
      }
      methods.setDefaultActiveElement();
    } catch (e) {
      console.error(`[Process Designer Warn]: ${e}`);
    }
  }

  /**
   * 导入xml
   * @param importFileRef file控件
   */
  function changeImportFile(importFileRef: Ref<HTMLInputElement>) {
    if (importFileRef.value && importFileRef.value.files) {
      const file = importFileRef.value.files[0];
      const reader = new FileReader();
      reader.readAsText(file);
      reader.onload = function () {
        const xmlStr = this.result;
        importXML(xmlStr as string);
      };
      importFileRef.value.value = '';
      importFileRef.value.files = null;
    }
  }
  /**
   * 打开xml
   */
  async function openXml(bpmnXML) {
    try {
      await modeler.value.importXML(bpmnXML);
    } catch (err) {
      console.error('could not import BPMN 2.0 diagram', err);
    }
  }
  return {
    importXML,
    changeImportFile,
    openXml
  };
}
