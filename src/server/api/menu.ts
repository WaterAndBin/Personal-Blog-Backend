import http from '~/server';
import type { AddMenu } from '~/types/menu';
import type { roleList } from '~/types/role';

/**
 * 获取所有角色
 * @param data 角色的数据
 * @returns
 */
export async function getMenu(): Promise<{ code: number; data: roleList[]; message: string }> {
  return await http.get<{ code: number; data: roleList[]; message: string }>('/menu/getMenu');
}

/**
 * 添加角色
 * @param role_name 角色名字
 * @returns
 */
export async function addMenu(data: AddMenu): Promise<{ code: number; message: string }> {
  return await http.post<{ code: number; message: string }>('/menu/addMenu', {
    ...data
  });
}
