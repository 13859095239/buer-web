/**
 * modeler 比例尺 hooks
 *
 * @author zoulan
 * @since 2023-06-21
 */
import type Modeler from 'bpmn-js/lib/Modeler';
import type BpmnViewer from 'bpmn-js/lib/NavigatedViewer';
import type Canvas from 'diagram-js/lib/core/Canvas';
import type { Ref } from 'vue';
import { computed } from 'vue';

export function useScales(modeler: Ref<Modeler | BpmnViewer>) {
  const canvas = modeler.value.get('canvas') as Canvas;
  let currentZoom = 1;
  const currentScale = computed(() => `${Math.floor(currentZoom * 10 * 10)}%`);

  /**
   * 缩小画板比例
   */
  function zoomIn(zoomStep = 0.1) {
    const newZoom = Math.floor(currentZoom * 100 + zoomStep * 100) / 100;
    if (newZoom > 4) {
      throw new Error('[Process Designer Warn ]: The zoom ratio cannot be greater than 4');
    }
    currentZoom = newZoom;
    canvas.zoom(currentZoom);
  }
  /**
   * 放大画板比例
   */
  function zoomOut(zoomStep = 0.1) {
    const newZoom = Math.floor(currentZoom * 100 - zoomStep * 100) / 100;
    if (newZoom < 0.2) {
      throw new Error('[Process Designer Warn ]: The zoom ratio cannot be less than 0.2');
    }
    currentZoom = newZoom;
    canvas.zoom(currentZoom);
  }
  /**
   * 还原画板比例
   */
  function resetZoom() {
    currentZoom = 1;
    canvas.zoom('fit-viewport', 'auto');
  }
  return {
    zoomIn,
    zoomOut,
    resetZoom,
    currentScale
  };
}
