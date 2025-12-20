<!--
  - 当前路由路径汉堡包 组件
  -
  - @author zoulan
  - @since 2023-09-05
  -->
<template>
  <Breadcrumb>
    <BreadcrumbItem
      v-for="(route, index) in routes"
      :key="index"
      :value="route.path"
    >
      <span
        v-show="showBreadCrumbIcon"
        class="i-material-symbols:bookmark-outline pr-5 text-4"
      ></span>
      <span v-if="routes.indexOf(route) === routes.length - 1">
        {{ route.breadcrumbName }}
      </span>
      <router-link
        v-else
        class="color-gray-400 hover:color-gray-800"
        :to="route.path"
      >
        {{ route.breadcrumbName }}
      </router-link>
    </BreadcrumbItem>
  </Breadcrumb>
</template>
<script setup lang="ts">
import { Breadcrumb, BreadcrumbItem } from 'tdesign-vue-next';
import { ref, watch } from 'vue';

import { useHeaderSetting } from '/@/hooks/setting/useHeaderSetting';
import { router } from '/@/router';
import { usePermissionStore } from '/@/store/modules/permission';
import type { Menu } from '/@/types/system/permission';

const { showBreadCrumbIcon } = useHeaderSetting();
const routes = ref<Route[]>([]);
interface Route {
  path: string;
  breadcrumbName: string;
  children?: Array<{
    path: string;
    breadcrumbName: string;
  }>;
}
watch(
  router.currentRoute,
  (route) => {
    routes.value = [];
    const { fullPath } = route;
    const nodes: Menu[] = usePermissionStore().getParentMenus((p) => p.path === fullPath, true);
    nodes.forEach((node) => {
      routes.value.push({
        breadcrumbName: node.name,
        path: node.path,
        children:
          node.children.length > 0
            ? node.children.map((child) => {
                return { breadcrumbName: child.name, path: child.path };
              })
            : undefined
      });
    });
  },
  { deep: true, immediate: true }
);
</script>
