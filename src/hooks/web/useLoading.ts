/**
 * loading hooks
 * 用于代码控制loading
 *
 * @author zoulan
 * @since 2025-07-07
 */
import type { LoadingProps } from 'tdesign-vue-next';
import type { Ref } from 'vue';
import { nextTick, ref } from 'vue';
/** loading组件基础定义 */
export interface BasicLoadingProps extends LoadingProps {
  /**
   * 开启loading
   *
   * @param text 提示信息
   */
  openLoading: (text?: string) => void;
  /** 关闭loading */
  closeLoading: () => void;
}
export function useLoading(loadingProps?: LoadingProps) {
  /** loading插件，放在v-loading里 */
  const loading: Ref<BasicLoadingProps> = ref({
    loading: false,
    showOverlay: true,
    text: undefined,
    ...loadingProps,
    openLoading,
    closeLoading
  });
  /**
   * 开启loading
   *
   * @param text 提示信息
   */
  async function openLoading(text?: string) {
    // 这里必须重复赋值才能生效
    loading.value = { ...loading.value, text, loading: true };
    // 需要nextTick保障页面出现加载，避免数据查询太快不出现loading
    await nextTick();
  }

  /** 关闭loading */
  function closeLoading() {
    // 这里必须重复赋值才能生效
    loading.value = { ...loading.value, text: undefined, loading: false };
  }
  return { loading };
}
