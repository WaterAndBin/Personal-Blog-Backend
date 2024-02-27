<!-- 个人中心 -->
<script lang="ts" setup>
const userStore = useUserStore();

const layout = (): void => {
  userStore.$reset();
  ElMessage.success('退出成功');
  navigateTo('/login');
};
</script>

<template>
  <div>
    <el-popover placement="bottom" :width="130" trigger="click">
      <div class="flex-default flex-col">
        <div>
          <el-button>个人信息</el-button>
        </div>
        <div class="mt-3">
          <el-button @click="layout">退出登录</el-button>
        </div>
      </div>
      <template #reference>
        <el-button>个人中心</el-button>
      </template>
    </el-popover>
  </div>
</template>
