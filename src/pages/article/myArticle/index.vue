<script lang="ts" setup>
import { articleStatus } from '../article';
import { deleteMyArticle, getMyArticle } from '~/server/api/article';
import { getMyInfo } from '~/server/api/user';
import type { ArticleList } from '~/types/article';

/* dom */
const articleDetailDialogRef = ref();

/**
 * 初始数据
 */
const initState = {
  page: 1 as number, // 页码,当前页面
  pageSize: 10 as number, // 单页面需要展示多少数据
  pageTotal: 0 as number, // 数据总数
  loading: true as boolean, // 判断是否显示加载
  tableData: [] as ArticleList[] // 全部数据
};
const state = reactive({ ...initState });

/**
 *  获取数据列表
 */
const getData = (): void => {
  state.loading = true;
  setTimeout(async () => {
    const res = await getMyArticle(state.page, state.pageSize);
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
 * 删除数据
 * @param pages 获取的页码
 * @param pageSizes 页码的总数
 */
const deleteData = async (data: number): Promise<void> => {
  const res = await deleteMyArticle(data);
  if (res.code == 200) {
    ElMessage.success('删除成功');
    getData();
  } else {
    ElMessage.error('删除失败');
  }
};

const getDetail = async (data: any): Promise<void> => {
  const res = await getMyInfo();
  if (res.code == 200) {
    articleDetailDialogRef.value.getDataShow({ ...data, author: res.data });
  }
};

onMounted(() => {
  getData();
});
</script>

<template>
  <LoadingPages :loading="state.loading">
    <div class="flex flex-1 flex-col justify-between">
      <div class="h-full w-full">
        <div class="text-2xl font-semibold">我的文章</div>
        <div class="w-full flex flex-col">
          <div class="grid my-3 justify-items-end"></div>
          <div class="">
            <el-table :data="state.tableData" border style="width: 100%">
              <el-table-column prop="id" label="文章id" />
              <el-table-column prop="article_title" label="文章标题" />
              <el-table-column prop="account" label="文章封面">
                <template #default="scope">
                  <div v-if="scope.row.article_cover">
                    <el-image
                      style="width: 100px"
                      :src="'http://127.0.0.1:9090/' + scope.row.article_cover"
                      :zoom-rate="1.2"
                      :max-scale="7"
                      :min-scale="0.2"
                      :preview-src-list="['http://127.0.0.1:9090/' + scope.row.article_cover]"
                      fit="cover"
                    />
                  </div>
                  <div v-else>-</div>
                </template>
              </el-table-column>
              <el-table-column prop="article_title" label="文章标题" />
              <el-table-column prop="created_time" label="发布时间" />
              <el-table-column prop="updated_time" label="修改时间">
                <template #default="scope">
                  <div v-if="scope.row.updated_time">
                    {{ scope.row.updated_time }}
                  </div>
                  <div v-else>-</div>
                </template>
              </el-table-column>
              <el-table-column prop="updated_time" label="状态">
                <template #default="scope">
                  <div>
                    {{
                      articleStatus.find((items) => items.key == scope.row.status)?.value ??
                      '未知错误'
                    }}
                  </div>
                </template>
              </el-table-column>
              <el-table-column prop="reject_reason" label="不通过审核原因" />
              <el-table-column fixed="right" label="操作" width="150" header-align="center">
                <template #default="scope">
                  <div class="flex-default">
                    <!-- <el-button type="primary" size="small" @click="">修改</el-button> -->
                    <el-button type="primary" size="small" @click="getDetail(scope.row)">
                      文章详情
                    </el-button>
                    <el-popconfirm title="确认删除吗？" @confirm="deleteData(scope.row.id)">
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

    <!-- 文章详情 -->
    <ArticleDetailDialog ref="articleDetailDialogRef"></ArticleDetailDialog>
  </LoadingPages>
</template>
