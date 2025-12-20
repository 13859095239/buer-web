import { LoadingDirective } from 'tdesign-vue-next';
import type { App } from 'vue';

export function setupGlobDirectives(app: App) {
  // 注册全局指令v-loading,用tdesign-vue-next自带的loading组件
  app.directive('loading', LoadingDirective);
}
