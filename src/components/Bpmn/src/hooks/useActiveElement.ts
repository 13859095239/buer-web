/**
 * BPMN 活动对象 hooks
 *
 * @author zoulan
 * @since 2023-06-05
 */
import type Modeler from 'bpmn-js/lib/Modeler';
import type ElementRegistry from 'diagram-js/lib/core/ElementRegistry';
import type { Ref } from 'vue';
import { computed, markRaw, ref } from 'vue';

export function useActiveElement(modeler: Ref<Modeler>) {
  /**
   *  是否开启元素改变事件
   *  用在如修改连接线的属性同时会修改target元素并触发element.changed情况下关闭元素改变事件
   */
  let startChange = true;
  // 元素操作类
  const elementRegistry = modeler.value.get<ElementRegistry>('elementRegistry');
  const activeElement = ref<any>(undefined);
  // 添加事件，用于捕获当前活动对象，用于刷新右侧属性栏等场景
  ['element.click', 'shape.added', 'element.changed'].forEach((event) => {
    modeler.value.on(event, (e: any) => {
      const { element } = e;
      if (e.type === 'element.changed') {
        // 判断是否存在,如果不存在不触发
        // 删除的时候有的时候会触发element.changed
        const isExits = elementRegistry.find((el) => el.id === element.id) !== undefined;
        if (!isExits || !startChange) {
          return;
        }
      }
      activeElement.value = markRaw(element);
    });
  });
  // 当移除元素的时候，初始化默认的activeElement
  ['shape.removed', 'elements.delete'].forEach((event) => {
    modeler.value.on(event, () => {
      setDefaultActiveElement();
    });
  });
  // 当前活动元素id
  const activeElementId = computed(() => (activeElement.value ? activeElement.value.id : undefined));
  /** 设置当前活动的元素 */
  function setActiveElement(activatedElement: any) {
    activeElement.value = markRaw(activatedElement);
  }
  /** 设置默认当前活动的元素 */
  function setDefaultActiveElement() {
    const defaultActivatedElement =
      elementRegistry.find((el) => el.type === 'bpmn:Process') ??
      elementRegistry.find((el) => el.type === 'bpmn:Collaboration');
    activeElement.value = markRaw(defaultActivatedElement!);
  }
  /** 设置当前活动元素 */
  function getActiveElement() {
    return activeElement.value;
  }
  /** 开启元素改变事件 */
  function startChangeActiveElement() {
    startChange = true;
  }
  /** 关闭元素改变事件 */
  function stopChangeActiveElement() {
    startChange = false;
  }

  return {
    activeElementId,
    activeElement,
    setActiveElement,
    setDefaultActiveElement,
    getActiveElement,
    startChangeActiveElement,
    stopChangeActiveElement
  };
}
