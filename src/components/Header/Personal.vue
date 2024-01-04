<!-- 个人中心 -->
<script lang="ts" setup></script>

<template>
  <div>
    <el-popover placement="bottom" :width="130" trigger="click">
      <div class="flex-default flex-col">
        <div>
          <el-button>个人信息</el-button>
        </div>
        <div class="mt-3">
          <el-button>退出登录</el-button>
        </div>
      </div>
      <template #reference>
        <el-button>个人中心</el-button>
      </template>
    </el-popover>
  </div>
</template>
