export interface MenuList {
  data: MenuTree[];
  code: number;
}

export interface MenuTree {
  id: number;
  menu_name: string;
  menu_path: string;
  menu_parent: number;
  status: number;
  is_deleted: number;
  created_id: number;
  created_time: string;
  updated_id: number;
  updated_time: string;
  icon: string;
  children?: MenuTree[];
}

export interface AddMenu {
  menu_name: string;
  menu_path: string;
  menu_parent: number;
  icon: string;
}
