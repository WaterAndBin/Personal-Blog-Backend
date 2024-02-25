<script lang="ts" setup>
import { getRoleList } from '~/server/api/role';

const initState = {
  page: 1, // 页码,当前页面
  pageSize: 10, // 单页面需要展示多少数据
  pageTotal: 0, // 数据总数
  loading: true, // 判断是否显示加载
  tableData: [] // 全部数据
};
const state = reactive({ ...initState });

const getData = async (): Promise<void> => {
  state.loading = true;
  const res = await getRoleList(state.page, state.pageSize);
  if (res.code == 200) {
    // state.tableData = res;
    ElMessage.success('获取列表数据成功');
  }
  console.log(res);
  state.loading = false;
};

const setPage = (pages: number, pageSizes: number): void => {
  state.page = pages;
  state.pageSize = pageSizes;
  getData();
};

onMounted(() => {
  nextTick(() => {
    getData();
  });
});
</script>

<template>
  <LoadingPages :loading="state.loading">
    <div class="flex flex-1 flex-col justify-between">
      <div class="h-full w-full">
        <div class="text-2xl font-semibold">角色管理</div>
        <div class="w-full flex flex-col">
          <div class="grid my-3 justify-items-end">
            <el-button type="primary" plain>添加新角色</el-button>
          </div>
          <div class="">
            <el-table :data="state.tableData" border style="width: 100%">
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
          :page="state.page"
          :page-size="state.pageSize"
          :page-total="state.pageTotal"
          :set-page="setPage"
        ></Pages>
      </div>
    </div>
  </LoadingPages>
</template>
