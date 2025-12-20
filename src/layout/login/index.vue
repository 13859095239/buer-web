<template>
  <div class="login relative h-full w-full overflow-hidden px-4">
    <div class="relative mx-auto h-full py-2 container sm:px-10">
      <div class="h-full flex">
        <div class="mr-4 min-h-full w-6/12 flex flex-col pl-4">
          <div class="my-auto">
            <img
              src="../../assets/svg/login-box-bg.svg"
              class="-enter-x w-1/2 -mt-16"
            />
            <div class="-enter-x mt-10 text-white font-medium">
              <span class="mt-4 inline-block text-3xl">
                {{ title }}
              </span>
            </div>
            <div class="-enter-x text-md mt-5 text-white font-normal dark:text-gray-500"></div>
          </div>
        </div>
        <div class="my-0 h-full w-6/12 flex py-5 xl:h-auto xl:py-0">
          <LoginForm />
        </div>
      </div>
    </div>
    <AppDarkModeToggle class="right-50px top-20px !absolute" />
  </div>
</template>
<script setup lang="ts">
import { AppDarkModeToggle } from '/@/components/Application';

import LoginForm from './components/LoginForm.vue';

const title = window.config.title;
</script>
<style lang="less">
@dark-bg: #293146;

.login {
  &::before {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    margin-left: -48%;
    background-image: url('/@/assets/svg/login-bg.svg');
    background-position: 100%;
    background-repeat: no-repeat;
    background-size: auto 100%;
    content: '';
  }
}

html[theme-mode='dark'] {
  .login {
    &::before {
      background-image: url(/@/assets/svg/login-bg-dark.svg);
    }

    background: @dark-bg;
  }

  .ant-form {
    background: transparent !important;
  }

  .ant-input,
  .ant-input-password {
    background-color: #232a3b;
  }

  input.fix-auto-fill,
  .fix-auto-fill input {
    -webkit-text-fill-color: #c9d1d9 !important;
    box-shadow: inherit !important;
  }
}
</style>
