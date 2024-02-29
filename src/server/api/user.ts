import http from '~/server';
import type { userAccount, userList, userListPagination } from '~/types/user';

/**
 * 注册
 * @param data 数据
 * @returns
 */
export async function userRegister(data: userAccount): Promise<{ code: number; message: string }> {
  return await http.post<{ code: number; message: string }>('/user/register', {
    ...data
  });
}

/**
 * 登录
 * @param data 数据
 * @returns
 */
export async function userLogin(
  data: userAccount
): Promise<{ code: number; token: string; message: string }> {
  return await http.post<{ code: number; token: string; message: string }>('/user/login', {
    ...data
  });
}

/**
 * 用户分页
 * @param currentPage 当前页
 * @param pageSize 页数量
 * @returns
 */
export async function getUserList(
  page: number,
  pageSize: number
): Promise<{ code: number; data: userListPagination }> {
  const res = await http.post<{ code: number; data: userListPagination }>('/user/getUserList', {
    page,
    pageSize
  });
  return res;
}

/**
 * 更新用户
 * @param data 角色的数据
 * @returns
 */
export async function updateUser(data: userList): Promise<{ code: number; message: string }> {
  return await http.post<{ code: number; message: string }>('/user/updateUser', {
    ...data
  });
}

/**
 * 删除用户
 * @param data 角色的数据
 * @returns
 */
export async function deleteUser(id: number): Promise<{ code: number; message: string }> {
  return await http.post<{ code: number; message: string }>('/user/updateUser', {
    id,
    is_deleted: 1
  });
}
