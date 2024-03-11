<script lang="ts" setup>
import updateUserDialog from './updateUserDialog.vue';
import { getAllRole } from '~/server/api/role';
import { getUserList, updateUser, deleteUser } from '~/server/api/user';
import type { RoleList } from '~/types/role';
import type { UserList } from '~/types/user';

const updateRoleRef = ref();

/**
 * 初始数据
 */
const initState = {
  page: 1 as number, // 页码,当前页面
  pageSize: 10 as number, // 单页面需要展示多少数据
  pageTotal: 0 as number, // 数据总数
  loading: true as boolean, // 判断是否显示加载
  tableData: [] as UserList[], // 全部数据
  roleData: [] as RoleList[] // 全部角色
};
const state = reactive({ ...initState });

/**
 *  获取数据列表
 */
const getData = (): void => {
  state.loading = true;
  setTimeout(async () => {
    const res = await getUserList(state.page, state.pageSize);
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

/**
 * 修改数据
 */
const updateData = (data: UserList): void => {
  updateRoleRef.value.setData(data);
};

/**
 * 改变状态
 */
const updateStatus = async (data: UserList, status: number): Promise<void> => {
  const res = await updateUser({ ...data, status });
  if (res.code == 200) {
    getData();
    if (status == 0) {
      ElMessage.success('开启成功');
    } else {
      ElMessage.success('禁用成功');
    }
  }
};

/**
 * 删除用户
 * @param data userList
 */
const deleteData = async (data: UserList): Promise<void> => {
  const res = await deleteUser(data.id);
  if (res.code == 200) {
    ElMessage.success('删除成功');
    getData();
  } else {
    ElMessage.error('删除失败');
  }
};

/**
 * 获取所有的角色
 */
const getRole = async (): Promise<void> => {
  const res = await getAllRole();
  if (res.code == 200) {
    state.roleData = res.data;
    console.log(state.roleData);
  }
};

onMounted(() => {
  getData();
  getRole();
});
</script>

<template>
  <LoadingPages :loading="state.loading">
    <div class="flex flex-1 flex-col justify-between">
      <div class="h-full w-full">
        <div class="text-2xl font-semibold">用户管理</div>
        <div class="w-full flex flex-col">
          <div class="grid my-3 justify-items-end"></div>
          <div class="">
            <el-table :data="state.tableData" border style="width: 100%">
              <el-table-column prop="id" label="用户id" />
              <el-table-column prop="user_name" label="用户名字" />
              <el-table-column prop="user_name" label="用户角色">
                <template #default="scope">
                  <span>
                    {{
                      state.roleData.find((items) => items.id == scope.row.role_id)?.role_name ??
                      '-'
                    }}
                  </span>
                </template>
              </el-table-column>
              <el-table-column prop="account" label="用户账号" />
              <el-table-column prop="created_time" label="创建时间" />
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
              <el-table-column fixed="right" label="操作" width="150" header-align="center">
                <template #default="scope">
                  <div class="flex-default">
                    <el-button type="primary" size="small" @click="updateData(scope.row)">
                      修改
                    </el-button>
                    <el-popconfirm title="确认删除吗？" @confirm="deleteData(scope.row)">
                      <template #reference>
                        <el-button>删除</el-button>
                      </template>
                    </el-popconfirm>
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

    <updateUserDialog
      ref="updateRoleRef"
      :role-data="state.roleData"
      @get-Data="getData"
    ></updateUserDialog>
  </LoadingPages>
</template>
