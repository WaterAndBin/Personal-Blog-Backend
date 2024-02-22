<script setup lang="ts">
import zhCn from 'element-plus/dist/locale/zh-cn.mjs';
// import zhCn from 'element-plus/es/locale/lang/zh-cn';
</script>

<template>
  <div>
    <div class="h-4">
      <Crumbs></Crumbs>
    </div>
    <div class="mt-5 overflow-hidden break-all rounded-lg bg-white p-5 shadow-lg">
      <el-config-provider :locale="zhCn">
        <NuxtPage class="min-h-[calc(100vh-220px)]"></NuxtPage>
      </el-config-provider>
    </div>
  </div>
</template>
