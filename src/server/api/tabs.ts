import http from '~/server';
import type { tabsList, tabsListPagination } from '~/types/tabs';

/**
 * 标签分页
 * @param currentPage 当前页
 * @param pageSize 页数量
 * @returns
 */
export async function getTabsList(
  page: number,
  pageSize: number
): Promise<{ code: number; data: tabsListPagination }> {
  const res = await http.post<{ code: number; data: tabsListPagination }>('/tabs/getTabsList', {
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
export async function updateTabs(data: tabsList): Promise<{ code: number; message: string }> {
  return await http.post<{ code: number; message: string }>('/tabs/updateTabs', {
    ...data
  });
}

/**
 * 删除标签
 * @param data 角色的数据
 * @returns
 */
export async function deleteTabs(data: tabsList): Promise<{ code: number; message: string }> {
  return await http.post<{ code: number; message: string }>('/tabs/updateTabs', {
    id: data.id,
    is_deleted: 1
  });
}
