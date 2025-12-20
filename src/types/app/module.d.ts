/**
 * 公共插件定义
 * 定义方式参考官方
 *
 * @author zoulan
 * @since 2023-05-22
 */
declare module '*.vue' {
  import type { DefineComponent } from 'vue';

  const Component: DefineComponent<{}, {}, any>;
  export default Component;
}

declare module 'virtual:*' {
  const result: any;
  export default result;
}
