<template>
  <div
    v-loading="loading"
    style="width: 430px"
    class="enter-x relative mx-auto my-auto w-full rounded-md px-5 py-8 shadow-md xl:ml-16 lg:w-2/4 sm:w-3/4 xl:bg-transparent xl:p-4 sm:px-8 xl:shadow-none"
  >
    <Title
      level="h2"
      class="enter-x mb-3 ml-15px text-center text-2xl font-bold xl:text-left xl:text-3xl"
      >登录</Title
    >
    <Form class="enter-x p-4">
      <FormItem
        name="account"
        class="enter-x"
      >
        <Input
          v-model:value="dataForm.username"
          size="large"
          class="fix-auto-fill"
        >
          <template #prefix-icon>
            <div class="i-tdesign:user" />
          </template>
        </Input>
      </FormItem>
      <FormItem
        name="account"
        class="enter-x"
      >
        <Input
          v-model:value="dataForm.password"
          type="password"
          size="large"
          autocomplete="new-password"
        >
          <template #prefix-icon>
            <div class="i-tdesign:user-locked-filled" />
          </template>
        </Input>
      </FormItem>
      <FormItem
        name="account"
        class="enter-x"
      >
        <div class="relative flex">
          <div class="grow">
            <Input
              v-model:value="dataForm.captchaValue"
              autocomplete="off"
              size="large"
              class="fix-auto-fill w-100px"
            />
          </div>
          <div class="relative m-l-40px m-r-20px h-44px w-145px flex-none">
            <img
              :src="captchaImage"
              class="relative bottom-5px h-40px w-145px cursor-pointer"
              @click="loadCaptcha()"
            />
          </div>
        </div>
      </FormItem>
      <FormItem
        name="account"
        class="enter-x"
      >
        <Button
          size="large"
          block
          @click="login"
          >登录</Button
        >
      </FormItem>
    </Form>
  </div>
</template>
<script setup lang="ts">
import { Button, Form, FormItem, Input, Title } from 'tdesign-vue-next';
import { reactive, ref } from 'vue';

import { createCaptcha } from '/@/api/resource/captcha';
import { useLoading } from '/@/hooks/web/useLoading';
import { useUserStore } from '/@/store/modules/user';

const { loading } = useLoading({ attach: 'body' });
const captchaImage = ref('');
const dataForm = reactive({
  username: 'admin',
  password: '1',
  captchaId: '',
  captchaValue: ''
});
/**  验证码加载 */
function loadCaptcha() {
  dataForm.captchaId = '';
  dataForm.captchaValue = '';
  createCaptcha().then((result) => {
    dataForm.captchaId = result.captchaId;
    captchaImage.value = result.captchaImage;
  });
}
loadCaptcha();

function login() {
  loading.value.openLoading();
  useUserStore()
    .login(dataForm)
    .catch(() => {
      loadCaptcha();
    })
    .finally(() => loading.value.closeLoading());
}
</script>
