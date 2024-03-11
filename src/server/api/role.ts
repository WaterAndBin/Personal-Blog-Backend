import http from '~/server';
import type { RoleList, RoleListPagination } from '~/types/role';

/**
 * 角色分页
 * @param currentPage 当前页
 * @param pageSize 页数量
 * @returns
 */
export async function getRoleList(
  page: number,
  pageSize: number
): Promise<{ code: number; data: RoleListPagination }> {
  const res = await http.post<{ code: number; data: RoleListPagination }>('/role/getRoleList', {
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
export async function updateRole(data: RoleList): Promise<{ code: number; message: string }> {
  return await http.post<{ code: number; message: string }>('/role/updateRole', {
    ...data
  });
}

/**
 * 删除角色
 * @param data 角色的数据
 * @returns
 */
export async function deleteRole(data: RoleList): Promise<{ code: number; message: string }> {
  return await http.post<{ code: number; message: string }>('/role/updateRole', {
    id: data.id,
    is_deleted: 1
  });
}

/**
 * 获取所有角色
 * @param data 角色的数据
 * @returns
 */
export async function getAllRole(): Promise<{ code: number; data: RoleList[]; message: string }> {
  return await http.get<{ code: number; data: RoleList[]; message: string }>('/role/getAllRole');
}
