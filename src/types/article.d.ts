/**
 * 文章列表分页
 */
export interface ArticleListPagination {
  currentPage: number;
  pageSize: number;
  total: number;
  list: ArticleList[];
}

/**
 * 文章列表
 */
export interface ArticleList {
  id: number;
  article_title: string;
  article_cover: string;
  article_content: string;
  author_id: number;
  created_time: string;
  updated_time: string;
  tabs_id: string | number[];
  status: number;
  is_deleted: number;
  type: number;
  auditors: number;
  review_time: string;
  reject_reason: string;
  reject_type: number;
}
