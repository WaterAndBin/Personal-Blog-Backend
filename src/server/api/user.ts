import http from '~/server';
import type { userAccount } from '~/types/user';

/**
 * 角色分页
 * @param currentPage 当前页
 * @param pageSize 页数量
 * @returns
 */
export async function userRegister(data: userAccount): Promise<any> {
  const res = await http.post<{ code: number; data: any }>('/user/register', {
    ...data
  });
  return res;
}
