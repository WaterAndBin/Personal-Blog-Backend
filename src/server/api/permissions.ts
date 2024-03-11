/* 权限 */
import http from '~/server';
import type { MenuPermissionsListPagination } from '~/types/permissions';

/**
 * 菜单权限列表
 * @param currentPage 当前页
 * @param pageSize 页数量
 * @returns
 */
export async function getMenuPermissionsList(
  page: number,
  pageSize: number
): Promise<{ code: number; data: any }> {
  const res = await http.post<{ code: number; data: MenuPermissionsListPagination }>(
    '/permissions/getMenuPermissionsList',
    {
      page,
      pageSize
    }
  );
  return res;
}

/**
 * 菜单权限列表
 * @param currentPage 当前页
 * @param pageSize 页数量
 * @returns
 */
export async function setMenuPermissions(
  roleId: string,
  lists: number[]
): Promise<{ code: number; data: any }> {
  const res = await http.post<{ code: number; data: MenuPermissionsListPagination }>(
    '/permissions/setMenuPermissions',
    {
      role_id: roleId,
      lists: JSON.stringify(lists)
    }
  );
  return res;
}
