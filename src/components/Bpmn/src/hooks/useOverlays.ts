/**
 * BPMN Overlays hooks
 *
 * @author zoulan
 * @since 2023-06-05
 */

import type Overlays from 'diagram-js/lib/features/overlays/Overlays';
import type { Ref } from 'vue';

export function useOverlays(modeler: Ref<HTMLElement | any>) {
  const overlays = modeler.value.get('overlays') as Overlays;
  overlays.add('SCAN_OK', 'note', {
    position: {
      bottom: 0,
      right: 0
    },
    html: '<div class="diagram-note">Mixed up the labels?</div>'
  });

  return {};
}
