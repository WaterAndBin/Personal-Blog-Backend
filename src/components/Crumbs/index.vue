<script lang="ts" setup>
const router = useRouter();
</script>

<template>
  <div class="h-full flex items-center">
    <el-row>
      <el-tag
        class="mx-1 cursor-pointer"
        size="large"
        type="info"
        effect="plain"
        @click="router.push('/home')"
      >
        主页
      </el-tag>
      <el-tag class="mx-1" size="large" closable type="info" effect="plain">Large</el-tag>
    </el-row>
  </div>
</template>
