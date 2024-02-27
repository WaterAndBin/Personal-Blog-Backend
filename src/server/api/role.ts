import http from '~/server';
import type { roleList, roleListPagination } from '~/types/role';

/**
 * 角色分页
 * @param currentPage 当前页
 * @param pageSize 页数量
 * @returns
 */
export async function getRoleList(
  page: number,
  pageSize: number
): Promise<{ code: number; data: roleListPagination }> {
  const res = await http.post<{ code: number; data: roleListPagination }>('/role/getRoleList', {
    page,
    pageSize
  });
  return res;
}

/**
 * 添加角色
 * @param role_name 角色名字
 * @returns
 */
export async function addRole(roleName: string): Promise<{ code: number; message: string }> {
  return await http.post<{ code: number; message: string }>('/role/addRole', {
    role_name: roleName
  });
}

/**
 * 更新角色
 * @param data 角色的数据
 * @returns
 */
export async function updateRole(data: roleList): Promise<{ code: number; message: string }> {
  return await http.post<{ code: number; message: string }>('/role/updateRole', {
    ...data
  });
}
