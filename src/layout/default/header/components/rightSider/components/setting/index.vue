<template>
  <div>
    <Button
      shape="circle"
      variant="text"
      class="px-6px"
      @click="drawerMethods!.show()"
    >
      <div class="i-ant-design:setting-outlined transform text-24px transition-800 hover:rotate-180" />
    </Button>
    <BasicDrawer
      v-bind="drawerProps"
      v-model:methods="drawerMethods"
      class="text-center"
    >
      <RadioGroup
        v-model="activeKey"
        variant="primary-filled"
      >
        <RadioButton value="appearance">外观</RadioButton>
        <RadioButton value="layout">布局</RadioButton>
        <RadioButton value="general">通用</RadioButton>
      </RadioGroup>
      <template v-if="activeKey === 'appearance'">
        <Divider>主题</Divider>
        <ThemeMode />
        <Divider>内置主题</Divider>
        <ColorMode class="mb-3" />
        <SwitchItem
          title="深色侧边栏"
          :event="HandlerEnum.CHANGE_SIDER_THEME"
        />
        <Divider>圆角</Divider>
        <Rounded />
      </template>
      <template v-else-if="activeKey === 'layout'">
        <Divider>导航栏模式</Divider>
        <LayoutMode />
        <Divider>侧边栏</Divider>
        <SwitchItem
          title="显示侧边栏"
          :event="HandlerEnum.CHANGE_SIDER_COLLAPSED"
        />
        <SwitchItem
          title="折叠菜单"
          :event="HandlerEnum.CHANGE_MENU_COLLAPSED"
        />
        <SwitchItem
          title="侧边导航菜单手风琴模式"
          :event="HandlerEnum.CHANGE_MENU_ACCORDION"
        />
        <NumberItem
          title="菜单展开宽度"
          :event="HandlerEnum.CHANGE_MENU_WIDTH"
        />
        <Divider>顶栏</Divider>
        <SwitchItem
          title="启用标签栏"
          :event="HandlerEnum.CHANGE_SHOW_MULTI_TABS"
        />
        <SwitchItem
          title="开启面包屑导航"
          :event="HandlerEnum.CHANGE_SHOW_BREADCRUMB"
        />
        <SwitchItem
          title="显示面包屑图标"
          :event="HandlerEnum.CHANGE_SHOW_BREADCRUMB_ICON"
        />
      </template>
      <template v-else-if="activeKey === 'general'">
        <SwitchItem
          title="水印"
          :event="HandlerEnum.CHANGE_SHOW_WATERMARK"
        />
        <Divider>动画效果</Divider>
        <SwitchItem
          title="页面切换进度条"
          :event="HandlerEnum.CHANGE_OPEN_TRANSITION_PROGRESS"
        />
        <SwitchItem
          title="页面切换Loading"
          :event="HandlerEnum.CHANGE_OPEN_TRANSITION_LOADING"
        />
        <SwitchItem
          title="页面切换动画"
          :event="HandlerEnum.CHANGE_OPEN_TRANSITION_ANIMATION"
        />
        <TransitionAnimation
          v-if="openTransitionAnimation"
          :event="HandlerEnum.CHANGE_TRANSITION_ANIMATION_MODE"
        />
      </template>
      <div class="mt-6">
        <Button
          theme="success"
          block
          class="ant-btn-warning"
          @click="handleResetSetting()"
          >重置</Button
        >
        <Button
          theme="danger"
          block
          class="ant-btn-error mt-3"
          @click="handleClearAndRedo"
          >清空缓存并返回登录页</Button
        >
        <Button
          theme="primary"
          block
          class="ant-btn-primary mt-3"
          @click="drawerMethods!.close()"
          >关闭</Button
        >
      </div>
      <template #footer></template>
    </BasicDrawer>
  </div>
</template>
<script setup lang="ts">
import { Button, Divider, RadioButton, RadioGroup } from 'tdesign-vue-next';
import { ref, shallowRef } from 'vue';

import type { BasicDrawerProps, DrawerMethods } from '/@/components/Drawer';
import { BasicDrawer } from '/@/components/Drawer';
import { useRootSetting } from '/@/hooks/setting/useRootSetting';
import { useAppStore } from '/@/store/modules/app';

import ColorMode from './components/ColorMode.vue';
import LayoutMode from './components/LayoutMode/index.vue';
import NumberItem from './components/NumberItem.vue';
import Rounded from './components/Rounded.vue';
import SwitchItem from './components/SwitchItem.vue';
import ThemeMode from './components/ThemeMode.vue';
import TransitionAnimation from './components/TransitionAnimation.vue';
import { HandlerEnum } from './enum';

const { openTransitionAnimation } = useRootSetting();
let drawerMethods: DrawerMethods;
const drawerProps = shallowRef<BasicDrawerProps>({
  title: '系统设置',
  size: '385',
  saveButton: false
});
const activeKey = ref('appearance');
function handleClearAndRedo() {
  localStorage.clear();
  location.reload();
}
function handleResetSetting() {
  useAppStore().resetSetting();
}
</script>
