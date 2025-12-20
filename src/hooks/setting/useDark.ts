/**
 * <p>
 * 主题切换 hooks
 * </p>
 *
 * @author zoulan
 * @since 2025-06-07
 */
import { nextTick } from 'vue';

import { THEME_ENUM } from '/@/constants/appConstants';
import { useAppStore } from '/@/store/modules/app';

export function useDark() {
  /**
   * 主题切换
   * @param isDark 是否黑暗模式
   * @param event 触发事件，用于动画效果
   * @returns
   */
  function themeChange(isDark: boolean, event: MouseEvent) {
    // 是否支持动画效果
    const isAppearanceTransition =
      // @ts-expect-error
      document.startViewTransition && !window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!isAppearanceTransition) {
      // 不支持动画
      useAppStore().setProjectSetting({
        theme: isDark ? THEME_ENUM.DARK : THEME_ENUM.LIGHT
      });
      return;
    }

    /**
     * 动画效果开始,自定义圆形扩散动画
     *   1、触发条件：当调用 document.startViewTransition() 时，浏览器会识别出即将发生的DOM变化，并准备一个视图过渡。
     *   2、捕获快照：浏览器会在当前渲染帧结束时自动捕捉页面的一个快照（旧视图）。这包括页面上的所有可见元素及其样式和布局信息。
     *   3、执行回调函数：startViewTransition 接受一个回调函数作为参数，在这个回调中你可以更新DOM，比如改变类名、添加或移除元素、修改属性等。这些改动代表了新视图的状态。
     *   4、生成新快照：一旦回调函数完成并且新的DOM状态被提交给浏览器，浏览器会再次捕捉页面的新快照（新视图）。
     *   5、应用过渡效果：浏览器使用这两个快照来计算从旧视图到新视图之间的差异，并根据这些差异自动应用合适的动画效果。默认情况下，浏览器会选择一种适当的动画方式来确保过渡看起来自然流畅。
     *   6、完成过渡：当过渡完成后，旧视图被完全替换为新视图，且浏览器恢复正常的渲染流程。此时，Promise 返回，表示过渡已经结束。
     *   7、伪元素控制：在整个过程中，可以利用 ::view-transition-old(root) 和 ::view-transition-new(root) 这两个特殊的CSS伪元素来定义旧视图和新视图的具体样式，包括它们如何混合、层叠顺序等。
     */
    const x = event.clientX;
    const y = event.clientY;
    const endRadius = Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y));
    const transition = document.startViewTransition(async () => {
      // 在这个方法里面，浏览器会识别出即将发生的DOM变化，并准备新旧视图过渡
      useAppStore().setProjectSetting({
        theme: isDark ? THEME_ENUM.DARK : THEME_ENUM.LIGHT
      });
      await nextTick();
    });
    transition.ready.then(() => {
      const clipPath = [`circle(0px at ${x}px ${y}px)`, `circle(${endRadius}px at ${x}px ${y}px)`];
      // 调用动画
      document.documentElement.animate(
        {
          clipPath: isDark ? [...clipPath].reverse() : clipPath
        },
        {
          duration: 450,
          easing: 'ease-in',
          pseudoElement: isDark ? '::view-transition-old(root)' : '::view-transition-new(root)'
        }
      );
    });
    /** 动画效果结束 */
  }
  return { themeChange };
}
