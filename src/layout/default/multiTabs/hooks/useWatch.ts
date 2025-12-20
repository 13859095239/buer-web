import type { Ref } from 'vue';
import { unref, watch } from 'vue';
import type { RouteLocationNormalized, RouteMeta } from 'vue-router';

import { router } from '/@/router';
import { PAGE_REDIRECT_TO_NAME } from '/@/router/constant';
import { useMultipleTabStore } from '/@/store/modules/multipleTab';

const tabStore = useMultipleTabStore();
export function useWatch(activeKey: Ref<string>) {
  watch(
    router.currentRoute,
    (route) => {
      const { name } = route;
      if (name === PAGE_REDIRECT_TO_NAME || !route) {
        return;
      }
      const { path, fullPath, meta = {} } = route;
      const { currentActiveMenu, hideTab } = meta as RouteMeta;
      const isHide = !hideTab ? null : currentActiveMenu;
      const p = isHide || fullPath || path;
      if (activeKey.value !== p) {
        activeKey.value = p as string;
      }
      if (isHide) {
        const findParentRoute = router.getRoutes().find((item) => item.path === currentActiveMenu);
        findParentRoute && tabStore.addTab(findParentRoute as unknown as RouteLocationNormalized);
      } else {
        tabStore.addTab(unref(route));
      }
    },
    { deep: true, immediate: true }
  );
}
