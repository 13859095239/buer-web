/**
 * BPMN 事件hooks
 *
 * @author zoulan
 * @since 2023-06-05
 */
import type Modeling from 'bpmn-js/lib/features/modeling/Modeling.js';
import type { Shape } from 'bpmn-js/lib/model/Types';
import type Modeler from 'bpmn-js/lib/Modeler';
import type EventBus from 'diagram-js/lib/core/EventBus';
import type { Ref } from 'vue';

import type { ElementEvent } from '../types';

interface HandleProps {
  handleCanvasClick?: (e: Event) => void;
  handleElementClick?: (e: Event) => void;
  handleCanvasContextmenu?: (e: Event) => void;
  handleElementContextmenu?: (e: Event) => void;
  /**
   * customEditContextPad 点击事件
   *
   * @param e 事件
   * @returns void
   */
  onEditPropertie?: (elementEvent: ElementEvent) => void;
}
export function useEvent(modeler: Ref<Modeler>, handleProps: HandleProps) {
  const modeling = modeler.value.get<Modeling>('modeling');
  const eventBus = modeler.value.get<EventBus>('eventBus');
  const { handleCanvasClick, handleElementClick, handleCanvasContextmenu, handleElementContextmenu, onEditPropertie } =
    handleProps;
  if (onEditPropertie) {
    eventBus.on('editPropertie', (elementEvent: ElementEvent) => {
      onEditPropertie(elementEvent);
    });
  }
  if (handleCanvasClick) {
    modeler.value.on('canvas.click', (e: any) => {
      handleCanvasClick?.(e);
    });
  }
  if (handleElementClick) {
    modeler.value.on('element.click', (e: any) => {
      handleElementClick?.(e);
    });
  }

  if (handleCanvasContextmenu) {
    modeler.value.on('canvas.contextmenu', (e: Shape) => {
      handleCanvasContextmenu?.(e);
    });
  }
  if (handleElementContextmenu) {
    modeler.value.on('element.contextmenu', (e: PointerEvent) => {
      handleElementContextmenu?.(e);
    });
  }
  return {
    modeling
  };
}
