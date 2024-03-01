import http from '~/server';
import type { AddMenu, MenuTree } from '~/types/menu';

/**
 * 获取所有的菜单 包含 status == 1
 * @returns
 */
export async function getAllMenu(): Promise<{ code: number; data: MenuTree[]; message: string }> {
  return await http.get<{ code: number; data: MenuTree[]; message: string }>('/menu/getAllMenu');
}

/**
 * 获取菜单
 * @returns
 */
export async function getMenu(): Promise<{ code: number; data: MenuTree[]; message: string }> {
  return await http.get<{ code: number; data: MenuTree[]; message: string }>('/menu/getMenu');
}

/**
 * 添加角色
 * @param data AddMenu
 * @returns
 */
export async function addMenu(data: AddMenu): Promise<{ code: number; message: string }> {
  return await http.post<{ code: number; message: string }>('/menu/addMenu', {
    ...data
  });
}

/**
 * 修改菜单
 * @param data MenuTree
 * @returns
 */
export async function updateMenu(data: MenuTree): Promise<{ code: number; message: string }> {
  const timerData = Object.assign({}, data);
  delete timerData.children;
  return await http.post<{ code: number; message: string }>('/menu/updateMenu', {
    ...timerData
  });
}
