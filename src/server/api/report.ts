import http from '~/server';

/**
 * 用户分页
 * @param currentPage 当前页
 * @param pageSize 页数量
 * @returns
 */
export async function getRejectArticleList(
  page: number,
  pageSize: number
): Promise<{ code: number; data: any }> {
  const res = await http.post<{ code: number; data: any }>('/article/getRejectArticleList', {
    page,
    pageSize
  });
  return res;
}
