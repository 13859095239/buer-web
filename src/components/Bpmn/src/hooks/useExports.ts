/**
 * modeler 导出 hooks
 *
 * @author zoulan
 * @since 2023-06-21
 */
import type Modeler from 'bpmn-js/lib/Modeler';
import type { Ref } from 'vue';

import { useDownload } from '/@/hooks/web/useDownload';

const { saveFileByStr } = useDownload();
export function useExports(modeler: Ref<Modeler>) {
  /**
   * 导出xml
   */
  async function saveXml() {
    const { xml, error } = await modeler.value.saveXML();
    if (error) console.error(`[Process Designer Warn ]: ${error.message || error}`);
    else saveFileByStr(xml!, '流程图.xml');
  }

  /**
   * 导出svg
   */
  async function saveSvg() {
    const { svg } = await modeler.value.saveSVG();
    saveFileByStr(svg, '流程图.svg');
  }

  return {
    saveXml,
    saveSvg
  };
}
