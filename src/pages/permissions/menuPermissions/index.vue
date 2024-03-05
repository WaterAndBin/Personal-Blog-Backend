<script lang="ts" setup>
import setMenuPermissionsDialog from './setMenuPermissionsDialog.vue';
import { getMenuPermissionsList } from '~/server/api/permissions';
import type { roleList } from '~/types/role';

/* dom */
const setMenuPermissionsDialogRef = ref();

/**
 * 初始数据
 */
const initState = {
  page: 1 as number, // 页码,当前页面
  pageSize: 10 as number, // 单页面需要展示多少数据
  pageTotal: 0 as number, // 数据总数
  loading: true as boolean, // 判断是否显示加载
  tableData: [] as roleList[] // 全部数据
};
const state = reactive({ ...initState });

/**
 *  获取数据列表
 */
const getData = (): void => {
  state.loading = true;
  setTimeout(async () => {
    const res = await getMenuPermissionsList(state.page, state.pageSize);
    if (res.code == 200) {
      state.tableData = res.data.list;
      state.pageTotal = res.data.total;
      ElMessage.success('获取列表数据成功');
    }
    state.loading = false;
  }, 1000);
};

/**
 * 设置页码
 * @param pages 获取的页码
 * @param pageSizes 页码的总数
 */
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
        <div class="text-2xl font-semibold">菜单权限</div>
        <div class="w-full flex flex-col">
          <div class="grid my-3 justify-items-end"></div>
          <div class="">
            <el-table :data="state.tableData" border style="width: 100%">
              <el-table-column prop="role_id" label="角色id" />
              <el-table-column prop="role_name" label="角色名字" />
              <el-table-column prop="created_id" label="创建者" />
              <el-table-column prop="created_time" label="创建时间" />
              <el-table-column prop="updated_id" label="修改者">
                <template #default="scope">
                  <div v-if="scope.row.updated_id">
                    {{ scope.row.updated_id }}
                  </div>
                  <div v-else>-</div>
                </template>
              </el-table-column>
              <el-table-column prop="updated_time" label="修改时间">
                <template #default="scope">
                  <div v-if="scope.row.updated_time">
                    {{ scope.row.updated_time }}
                  </div>
                  <div v-else>-</div>
                </template>
              </el-table-column>
              <el-table-column fixed="right" label="操作" width="150" header-align="center">
                <template>
                  <div class="flex-default">
                    <el-button
                      type="primary"
                      size="small"
                      @click="setMenuPermissionsDialogRef.show()"
                    >
                      修改权限
                    </el-button>
                  </div>
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

    <setMenuPermissionsDialog ref="setMenuPermissionsDialogRef"></setMenuPermissionsDialog>
  </LoadingPages>
</template>
