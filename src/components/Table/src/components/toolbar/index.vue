<!--
  - table 工具栏
  -
  - @author zoulan
  - @since 2023-08-15
  -->
<template>
  <div class="flex flex-row flex-nowrap">
    <div class="flex-1 px-10px !leading-46px space-x-10px">
      <template
        v-for="item in data"
        :key="item.name"
      >
        <!-- 普通按钮 -->
        <Button
          v-if="!item.menuItems"
          :theme="item.theme"
          :disabled="item.isRelationSelected && !hasSelected"
          @click="onClick(item)"
        >
          <template #icon> <component :is="getIcon(item.icon)"></component></template>
          {{ item.name }}
        </Button>
        <!-- 下拉按钮 -->
        <Dropdown
          v-else
          trigger="click"
        >
          <template #overlay>
            <Menu>
              <MenuItem
                v-for="(menu, menuIndex) in item.menuItems"
                :key="menuIndex"
                @click="onClick(menu)"
              >
                {{ menu.name }}
              </MenuItem>
            </Menu>
          </template>
          <Button :theme="item.theme">
            {{ item.name }}
            <DownOutlined />
          </Button>
        </Dropdown>
      </template>
    </div>
    <div class="flex-1">
      <slot></slot>
    </div>
    <!-- 右侧表格操作按钮 -->
    <div class="float-right pr-2 v-middle leading-46px">
      <!-- 刷新表格数据 -->
      <Tooltip :content="visibleSearchFormModel ? '隐藏搜索' : '显示搜索'">
        <Button
          theme="default"
          variant="text"
          class="p-x-2!"
          @click="visibleSearchFormModel = !visibleSearchFormModel"
        >
          <template #icon><div class="i-tdesign:search size-5 color-[var(--td-text-color-secondary)]"></div></template>
        </Button>
      </Tooltip>
      <!-- BasicSiderToolbar 按钮 -->
      <template
        v-for="item in siderToolbar"
        :key="item.name"
      >
        <Tooltip :content="item.name">
          <Button
            theme="default"
            variant="text"
            class="p-x-2!"
            @click="item.onClick"
          >
            <template #icon>
              <component :is="getSiderIcon(item.icon)"></component>
            </template>
          </Button>
        </Tooltip>
      </template>
      <!-- 刷新表格数据 -->
      <Tooltip content="刷新表格数据">
        <Button
          theme="default"
          variant="text"
          class="p-x-2!"
          @click="props.methods!.reload"
        >
          <template #icon><div class="i-tdesign:refresh size-5 color-[var(--td-text-color-secondary)]"></div></template>
        </Button>
      </Tooltip>
      <!-- 配置表格列 -->
      <Tooltip content="配置表格列">
        <Button
          theme="default"
          variant="text"
          class="p-x-2!"
          @click="columnControllerVisible = true"
        >
          <template #icon><div class="i-tdesign:setting size-5 color-[var(--td-text-color-secondary)]"></div></template>
        </Button>
      </Tooltip>
    </div>
  </div>
</template>
<script setup lang="ts">
import { Button, Dropdown, Menu, Tooltip } from 'tdesign-vue-next';
import type { VNode } from 'vue';
import { h, toRefs } from 'vue';

import { ActionIconEnum } from '../../enums';
import type { BasicToolbar, BasicSiderToolbar, TableMethods } from '../../types';

const props = withDefaults(defineProps<Props>(), {});
// 选中行对象列表model
const visibleSearchFormModel = defineModel<boolean>('visibleSearch', {
  default: true
});
const { Item: MenuItem } = Menu;
interface Props {
  data?: Array<BasicToolbar>;
  hasSelected?: boolean;
  selectedRowKey?: string;
  selectedRowKeys: string[];
  selectedRows: any[];
  methods?: TableMethods;
  siderToolbar?: Array<BasicSiderToolbar>;
}
const { data, hasSelected, selectedRowKey, selectedRowKeys, selectedRows, siderToolbar } = toRefs(props);
const columnControllerVisible = defineModel<boolean>('columnControllerVisible', {
  default: false
});
// 获取toolbar按钮图标
function getIcon(actionIconEnum?: ActionIconEnum): VNode | undefined {
  switch (actionIconEnum) {
    case ActionIconEnum.ADD:
      return h('div', { class: 'i-tdesign:add' });
    case ActionIconEnum.EDIT:
      return h('div', { class: 'i-tdesign:edit' });
    case ActionIconEnum.VIEW:
      return h('div', { class: 'i-tdesign:file' });
    case ActionIconEnum.DELETE:
      return h('div', { class: 'i-tdesign:delete' });
    case ActionIconEnum.COPY:
      return h('div', { class: 'i-tdesign:copy' });
    case ActionIconEnum.REDO:
      return h('div', { class: 'i-tdesign:rollback' });
    case ActionIconEnum.SETTING:
      return h('div', { class: 'i-material-symbols:check-box-outline' });
    case ActionIconEnum.EXPORT:
      return h('div', { class: 'i-tdesign:download' });
  }
}

// 获取右侧工具栏按钮图标（带样式）
function getSiderIcon(actionIconEnum?: ActionIconEnum): VNode | undefined {
  if (!actionIconEnum) return undefined;
  const iconClass = getIconClass(actionIconEnum);
  if (!iconClass) return undefined;
  return h('div', { class: `${iconClass} size-5 color-[var(--td-text-color-secondary)]` });
}

// 获取图标类名
function getIconClass(actionIconEnum?: ActionIconEnum): string | undefined {
  switch (actionIconEnum) {
    case ActionIconEnum.ADD:
      return 'i-tdesign:add';
    case ActionIconEnum.EDIT:
      return 'i-tdesign:edit';
    case ActionIconEnum.VIEW:
      return 'i-tdesign:file';
    case ActionIconEnum.DELETE:
      return 'i-tdesign:delete';
    case ActionIconEnum.COPY:
      return 'i-tdesign:copy';
    case ActionIconEnum.REDO:
      return 'i-tdesign:rollback';
    case ActionIconEnum.SETTING:
      return 'i-material-symbols:check-box-outline';
    case ActionIconEnum.EXPORT:
      return 'i-tdesign:download';
    default:
      return undefined;
  }
}

// toolbar按钮点击事件
function onClick(item) {
  item.onClick?.({
    selectedRowKey: selectedRowKey.value,
    selectedRowKeys: selectedRowKeys.value,
    selectedRows: selectedRows.value
  });
}
</script>
