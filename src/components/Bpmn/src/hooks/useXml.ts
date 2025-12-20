/**
 * modeler xml hooks
 *
 * @author zoulan
 * @since 2023-06-21
 */
import type Modeler from 'bpmn-js/lib/Modeler';
import type { Ref } from 'vue';
import { ref } from 'vue';

export function useXml(modeler: Ref<Modeler<any>>) {
  const resultData = ref('');
  async function getXml() {
    return await modeler.value.saveXML();
  }
  async function refreshResult() {
    const { xml } = await modeler.value.saveXML({ format: true });
    resultData.value = xml || '';
  }
  return {
    resultData,
    refreshResult,
    getXml
  };
}
