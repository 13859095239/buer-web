/**
 * 代码中获取这些以 VITE_ 为前缀的用户自定义环境变量的 TypeScript 智能提示
 * 配置参考vite官网
 *
 */
/// <reference types="vite/client" />
interface ImportMetaEnv {
  readonly VITE_APP_TITLE: string;
  readonly VITE_DROP_CONSOLE: boolean;
  readonly VITE_BASE_API: string;
  readonly VITE_FILE_API: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
