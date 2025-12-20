<!--
  - 任务信息页
  -
  - @author zoulan
  - @since 2024-06-06
  -->
<template>
  <BasicDrawer
    v-model:methods="drawerMethods"
    v-bind="drawerProps"
  >
    <BadgeRibbon
      text="Hippies"
      color="green"
    >
      <Card v-for="item in dataSource">
        <Descriptions bordered>
          <DescriptionsItem label="办理人">
            {{ item.username }}
          </DescriptionsItem>
          <DescriptionsItem label="开始时间">
            {{ item.startTime }}
          </DescriptionsItem>
          <DescriptionsItem label="结束时间">
            {{ item.endTime }}
          </DescriptionsItem>
          <DescriptionsItem
            label="办理意见"
            :span="3"
          >
            {{ item.username }}
          </DescriptionsItem>
        </Descriptions>
      </Card>
    </BadgeRibbon>
  </BasicDrawer>
</template>
<script setup lang="ts">
import { Badge, Card, Descriptions } from 'tdesign-vue-next';
import { nextTick, ref, shallowRef } from 'vue';

import { listTaskinst } from '/@/api/flow/taskinst';
import type { BasicDrawerProps, DrawerMethods } from '/@/components/Drawer';
import { BasicDrawer } from '/@/components/Drawer';

const { Ribbon: BadgeRibbon } = Badge;
const DescriptionsItem = Descriptions.Item;

let drawerMethods: DrawerMethods;
const dataSource = ref<Recordable[]>([]);
/** 初始化Drawer */
const drawerProps = shallowRef<BasicDrawerProps>({
  title: `快捷键查看`,
  onClosed() {
    dataSource.value = [];
  }
});

/** 显示查看视图 */
const show = (procInstId: string, taskDefKey: string) => {
  clearData();
  drawerMethods!.show();
  nextTick(async () => {
    dataSource.value = await listTaskinst({ procInstId, taskDefKey });
  });
};

/** 清空数据 */
const clearData = () => {
  dataSource.value = [];
};

defineExpose({
  show
});
</script>
