import http from '~/api';
import type { TabsList, TabsListPagination } from '~/types/tabs';

/**
 * 标签分页
 * @param currentPage 当前页
 * @param pageSize 页数量
 * @returns
 */
export async function getTabsList(
  page: number,
  pageSize: number
): Promise<{ code: number; data: TabsListPagination }> {
  const res = await http.post<{ code: number; data: TabsListPagination }>('/tabs/getTabsList', {
    page,
    pageSize
  });
  return res;
}

/**
 * 添加标签
 * @param tab_name
 * @returns
 */
export async function addTabs(tabName: string): Promise<{ code: number; message: string }> {
  return await http.post<{ code: number; message: string }>('/tabs/addTabs', {
    tab_name: tabName
  });
}

/**
 * 更新标签
 * @param data 角色的数据
 * @returns
 */
export async function updateTabs(data: TabsList): Promise<{ code: number; message: string }> {
  return await http.post<{ code: number; message: string }>('/tabs/updateTabs', {
    ...data
  });
}

/**
 * 删除标签
 * @param data 角色的数据
 * @returns
 */
export async function deleteTabs(data: TabsList): Promise<{ code: number; message: string }> {
  return await http.post<{ code: number; message: string }>('/tabs/updateTabs', {
    id: data.id,
    is_deleted: 1
  });
}

/**
 * 获取所有的标签
 * @param data 数据
 * @returns
 */
export async function getAllTabs(): Promise<{ code: number; data: any[]; message: string }> {
  return await http.post<{ code: number; data: any[]; message: string }>('/tabs/getAllTabs');
}
