<script setup lang="ts">
// 不使用模板
definePageMeta({
  layout: false
});
</script>

<template>
  <div
    class="box-container h-screen w-screen flex flex-wrap items-center justify-center bg-[#eeeeee] bg-cover bg-center bg-no-repeat overflow-hidden"
  >
    <div
      class="relative box-border h-94% w-96% flex items-center justify-around rounded-md p-12"
      style="background-color: rgb(255 255 255 / 80%)"
    >
      <div class="login-left ml-2.5 w-220">
        <img class="h-full w-full" src="~/assets/images/login_left.png" alt="login" />
      </div>
      <div
        class="login-form w-420px rounded-md p-45px"
        style="background-color: var($login-back); box-shadow: rgb(0 0 0 / 10%) 0 2px 10px 2px"
      >
        <div class="mb-11 flex items-center justify-center">
          <svg-icon name="logo" class="h-52px w-60px" />
          <h2 class="m-0 whitespace-nowrap pl-4 text-8 font-bold color-[#34495e]">
            个人博客后台管理系统
          </h2>
        </div>
        <Login />
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.box-container {
  background-image: url('../../assets/sprite/svg/login-bg.svg');
}

@media screen and (max-width: 1250px) {
  .login-left {
    display: none;
  }
}

@media screen and (max-width: 600px) {
  .login-form {
    width: 97% !important;
  }
}
</style>
