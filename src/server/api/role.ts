import http from '~/server';

/**
 * 角色分页
 * @param currentPage 当前页
 * @param pageSize 页数量
 * @returns
 */
export async function getRoleList(page: number, pageSize: number): Promise<any> {
  const res = await http.post<{ code: number; data: any }>('/role/getRoleList', {
    page,
    pageSize
  });
  return res;
}
