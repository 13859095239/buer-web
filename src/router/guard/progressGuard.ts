/**
 * 进度条路由守卫
 *
 * @author zoulan
 * @since 2023-05-22
 */
import nProgress from 'nprogress';
import type { Router } from 'vue-router';

import { useRootSetting } from '/@/hooks/setting/useRootSetting';

export function createProgressGuard(router: Router) {
  // 是否开启页面切换进度条
  const { openTransitionProgress } = useRootSetting();
  router.beforeEach(async () => {
    if (openTransitionProgress.value) {
      nProgress.start();
    }
    return true;
  });
  router.afterEach(async () => {
    if (openTransitionProgress.value) {
      nProgress.done();
    }
    return true;
  });
}
