/* 角色 */

/**
 * 获取角色列表
 */
export interface RoleListPagination {
  currentPage: number; // 当前页
  list: roleList[];
  pageSize: 10; // 页的总数
  total: 1; // 总的数据
}

/**
 * 角色列表
 */
export interface RoleList {
  id: number; // 主键 id
  role_name: string; // 角色的名字
  is_deleted: number; // 是否禁用
  created_id: number; // 创建人的id
  created_time: string; // 创建时间
  updated_id: string; // 更新人的id
  updated_time: string; // 更新的时间
  status: number; //状态
}
