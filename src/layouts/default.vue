<script lang="ts" setup></script>

<template>
  <div class="h-screen w-screen overflow-y-hidden">
    <el-container class="w-full h-full">
      <el-aside width="auto">
        <Aside></Aside>
      </el-aside>
      <el-container class="h-full w-full">
        <el-header class="h-[50px]">
          <Header></Header>
        </el-header>
        <el-main class="h-[calc(100vh-50px-40px)] bg-red-100">
          <Main></Main>
        </el-main>
        <el-footer class="h-[40px] w-full flex-default">
          <Footer></Footer>
        </el-footer>
      </el-container>
    </el-container>
  </div>
</template>
