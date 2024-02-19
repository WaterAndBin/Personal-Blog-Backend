<script lang="ts" setup></script>

<template>
  <div class="box-border h-screen w-screen overflow-hidden">
    <el-container class="h-full w-full">
      <el-aside width="auto" class="border-r-1 border-zinc-950/10 border-solid">
        <Aside></Aside>
      </el-aside>
      <el-container class="h-full w-full">
        <el-header class="h-[60px] border-b-1 border-zinc-950/10 border-solid">
          <Header></Header>
        </el-header>
        <el-main class="bg-[#F3F4F9]">
          <Main></Main>
        </el-main>
        <el-footer class="border-t-1 border-zinc-950/10 border-solid" style="height: 40px">
          <Footer class="h-full flex-default"></Footer>
        </el-footer>
      </el-container>
    </el-container>
  </div>
</template>
