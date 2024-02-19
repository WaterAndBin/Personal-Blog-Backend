export interface MenuList {
  list: MenuTree[];
  size: number;
}

export interface MenuTree {
  created_at?: string;
  icon?: string | number;
  menu_id: number;
  menu_name: string;
  parent_id?: number;
  path: string;
  sort?: number;
  status?: number;
  updated_at?: string;
  children: MemuTree[];
  active?: number;
  type?: number;
}

export interface AddMenu {
  menu_name: string;
  parent_id: number;
  path: string;
  sort: number;
}
