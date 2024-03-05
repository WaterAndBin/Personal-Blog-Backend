/* 权限 */

/**
 * 菜单权限列表
 */
export interface menuPermissionsListPagination {
  currentPage: number; // 当前页
  list: menuPermissionsList[];
  pageSize: 10; // 页的总数
  total: 1; // 总的数据
}

/**
 * 菜单权限列表
 */
export interface menuPermissionsList {
  created_id: number;
  created_time: string;
  lists: number[];
  role_id: number;
  role_name: string;
  updated_id: number;
  updated_time: string;
}
