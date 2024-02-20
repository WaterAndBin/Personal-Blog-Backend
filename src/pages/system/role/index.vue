<script lang="ts" setup>
import { getRoleList } from '~/server/api/role';

/* 页码,当前页面 */
const page = ref<number>(1);
/* 单页面需要展示多少数据 */
const pageSize = ref<number>(10);
/* 数据总数 */
const pageTotal = ref<number>(0);
/* 判断是否显示加载 */
const loading = ref<boolean>(true);
/* 全部数据 */
const data = ref<any[]>([]);

const getData = async (): Promise<void> => {
  loading.value = true;
  const res = await getRoleList(page.value, pageSize.value);
  if (res.code == 200) {
    data.value = res;
  }
};

const setPage = (pages: number, pageSizes: number): void => {
  page.value = pages;
  pageSize.value = pageSizes;
  getData();
};

onMounted(() => {
  getData();
});
</script>

<template>
  <LoadingPages :loading="loading">
    <div class="h-full w-full flex flex-col justify-between">
      <div>
        <div class="text-2xl font-semibold">角色管理</div>
        <div class="w-full flex flex-col">
          <div class="grid my-3 justify-items-end">
            <el-button type="primary" plain>添加新角色</el-button>
          </div>
          <div class="">
            <el-table v-loading="loading" :data="data" border style="width: 100%">
              <el-table-column prop="date" label="角色id" />
              <el-table-column prop="name" label="角色名字" />
              <el-table-column prop="name" label="创建者" />
              <el-table-column prop="name" label="创建时间" />
              <el-table-column prop="name" label="修改者" />
              <el-table-column prop="name" label="修改时间" />
              <el-table-column fixed="right" label="禁用" width="120">
                <template #default>
                  <el-button link type="primary" size="small">禁用</el-button>
                </template>
              </el-table-column>
              <el-table-column fixed="right" label="操作" width="120">
                <template #default="scope">
                  {{ scope.row }}
                  <el-button link type="primary" size="small">修改</el-button>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </div>
      </div>
      <div>
        <Pages
          :page="page"
          :page-size="pageSize"
          :page-total="pageTotal"
          :set-page="setPage"
        ></Pages>
      </div>
    </div>
  </LoadingPages>
</template>
