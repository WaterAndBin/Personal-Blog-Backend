<script lang="ts" setup></script>

<template>
  <el-sub-menu index="">
    <template #title>
      <el-icon><ElIconIceCream /></el-icon>
      <span>系统管理</span>
    </template>
    <el-menu-item index="">菜单管理</el-menu-item>
    <el-menu-item index="/system/role">角色管理</el-menu-item>
    <el-menu-item index="">用户管理</el-menu-item>
    <el-menu-item index="/system/tabs">标签管理</el-menu-item>
  </el-sub-menu>
</template>
