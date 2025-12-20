/**
 * bpmn 模拟流程 hook
 *
 * @author zoulan
 * @since 2023-06-21
 */
import type Modeler from 'bpmn-js/lib/Modeler';
import type BpmnViewer from 'bpmn-js/lib/NavigatedViewer';
import type ToggleMode from 'bpmn-js-token-simulation/lib/features/toggle-mode/modeler/ToggleMode';
import type { Ref } from 'vue';

export function useSimulation(modeler: Ref<Modeler | BpmnViewer>) {
  const toggleMode = modeler.value.get<ToggleMode>('toggleMode');
  function simulationToggle() {
    toggleMode.toggleMode();
  }
  return {
    simulationToggle
  };
}
