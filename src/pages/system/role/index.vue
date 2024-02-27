<script lang="ts" setup>
import addRoleDialog from './addRoleDialog.vue';
import updateRoleDialog from './updateRoleDialog.vue';
import { getRoleList, updateRole } from '~/server/api/role';
import type { roleList } from '~/types/role';

/* dom */
const addRoleDialogRef = ref();
const updateRoleRef = ref();

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
    const res = await getRoleList(state.page, state.pageSize);
    if (res.code == 200) {
      state.tableData = res.data.list;
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

/**
 * 修改数据
 */
const updateData = (data: roleList): void => {
  updateRoleRef.value.setData(data);
};

/**
 * 改变状态
 */
const updateStatus = async (data: roleList, status: number): Promise<void> => {
  const res = await updateRole({ ...data, status });
  if (res.code == 200) {
    getData();
    if (status == 0) {
      ElMessage.success('开启成功');
    } else {
      ElMessage.success('禁用成功');
    }
  }
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
            <el-button type="primary" plain @click="addRoleDialogRef.showDialog()">
              添加新角色
            </el-button>
          </div>
          <div class="">
            <el-table :data="state.tableData" border style="width: 100%">
              <el-table-column prop="id" label="角色id" />
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
              <el-table-column fixed="right" label="禁用" width="80" header-align="center">
                <template #default="scope">
                  <div class="flex-default">
                    <el-button
                      v-if="scope.row.status == 0"
                      type="danger"
                      size="small"
                      @click="updateStatus(scope.row, 1)"
                    >
                      禁用
                    </el-button>
                    <el-button
                      v-if="scope.row.status == 1"
                      type="success"
                      size="small"
                      @click="updateStatus(scope.row, 0)"
                    >
                      开启
                    </el-button>
                  </div>
                </template>
              </el-table-column>
              <el-table-column fixed="right" label="操作" width="120" header-align="center">
                <template #default="scope">
                  <div class="flex-default">
                    <el-button type="primary" size="small" @click="updateData(scope.row)">
                      修改
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

    <addRoleDialog ref="addRoleDialogRef" @get-Data="getData"></addRoleDialog>
    <updateRoleDialog ref="updateRoleRef" @get-Data="getData"></updateRoleDialog>
  </LoadingPages>
</template>
