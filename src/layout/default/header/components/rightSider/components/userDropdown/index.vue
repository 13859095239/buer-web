<template>
  <Dropdown>
    <Button
      shape="circle"
      variant="text"
      class="px-6px"
    >
      <div>
        <div class="i-ant-design:user-outlined transform pr-0px text-24px transition-800 hover:text-26px" />
        <span
          class="dropdown-name !ml-3px"
          :style="{}"
          @click.prevent
          >{{ userStore.getName }}</span
        >
      </div>
    </Button>
    <DropdownMenu>
      <DropdownItem @click="onUserEdit">账号修改</DropdownItem>
      <DropdownItem @click="onResetPassword">修改密码</DropdownItem>
      <DropdownItem @click="userStore.logout()">退出系统</DropdownItem>
    </DropdownMenu>
  </Dropdown>
  <UserEdit ref="userEditRef" />
  <ResetPassword ref="resetPasswordRef" />
</template>
<script setup lang="ts">
import { Button, Dropdown, DropdownItem, DropdownMenu } from 'tdesign-vue-next';
import { ref } from 'vue';

import { useUserStore } from '/@/store/modules/user';

import ResetPassword from './ResetPassword.vue';
import UserEdit from './UserEdit.vue';

const userEditRef = ref<InstanceType<typeof UserEdit> | null>();
const resetPasswordRef = ref<InstanceType<typeof ResetPassword> | null>();

const userStore = useUserStore();

function onResetPassword() {
  resetPasswordRef.value.showEdit();
}
function onUserEdit() {
  userEditRef.value.showEdit();
}
</script>
