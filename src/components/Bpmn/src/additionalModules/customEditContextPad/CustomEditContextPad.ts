/**
 * 自定义CustomEditContextPad
 *
 * @author zoulan
 * @since 2023-06-19
 */
import type {
  Canvas,
  Connect,
  ContextPad,
  ContextPadEntries,
  Create,
  ElementFactory,
  EventBus,
  Injector,
  Modeling,
  PopupMenu,
  Rules,
  Translate
} from 'bpmn-js/lib/features/context-pad/ContextPadProvider';
import ContextPadProvider from 'bpmn-js/lib/features/context-pad/ContextPadProvider';
import type { Element } from 'bpmn-js/lib/model/Types';
import { computed, markRaw, unref } from 'vue';

import type { ElementEvent } from '/@/components/Bpmn/src/types';

export default class CustomEditContextPad extends ContextPadProvider {
  // 全局变量，按需定义
  private eventBus: EventBus;
  private translate: Translate;

  /** 构造函数 */
  constructor(
    config: any,
    injector: Injector,
    eventBus: EventBus,
    contextPad: ContextPad,
    modeling: Modeling,
    elementFactory: ElementFactory,
    connect: Connect,
    create: Create,
    popupMenu: PopupMenu,
    canvas: Canvas,
    rules: Rules,
    translate: Translate,
    appendPreview
  ) {
    super(
      config,
      injector,
      eventBus,
      contextPad,
      modeling,
      elementFactory,
      connect,
      create,
      popupMenu,
      canvas,
      rules,
      translate,
      appendPreview
    );

    // 有用到的变量赋值
    this.eventBus = eventBus;
    this.translate = translate;
  }

  getContextPadEntries(element: Element): ContextPadEntries {
    const { translate, eventBus } = this;

    const classNameComputed = computed(() => {
      // !hidden
      return element.type === 'bpmn:Task' ? 'bpmn-icon-service-task' : 'bpmn-icon-service-task';
    });
    return {
      'append.service-task': {
        group: 'model',
        className: unref(classNameComputed),
        title: translate('编辑'),
        action: (event, element) => {
          const { type } = event;
          element = markRaw(element);
          if (type === 'click') {
            // 总线发送editPropertie事件
            eventBus.fire('editPropertie', {
              event,
              element
            } as ElementEvent);
          }
        }
      }
    };
  }
}
