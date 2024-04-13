import http from '~/server';
import type { ArticleListPagination, AuditArticleStatus } from '~/types/article';
/**
 *
 * @returns
 */
export async function getAuditArticleList(
  page: number,
  pageSize: number
): Promise<{
  code: number;
  data: ArticleListPagination;
  message: string;
}> {
  return await http.post<{ code: number; data: ArticleListPagination; message: string }>(
    '/article/getAuditArticleList',
    {
      page,
      pageSize
    }
  );
}

/**
 * 添加角色
 * @param data AuditArticleStatus
 * @returns
 */
export async function setAuditArticle(
  data: AuditArticleStatus
): Promise<{ code: number; message: string }> {
  return await http.post<{ code: number; message: string }>('/article/setAuditArticle', {
    ...data
  });
}

/**
 * 获取个人文章列表
 * @param page 当前页
 * @param pageSize 页码大小
 * @returns
 */
export async function getMyArticle(
  page: number,
  pageSize: number
): Promise<{ code: number; data: ArticleListPagination; message: string }> {
  return await http.post<{ code: number; data: ArticleListPagination; message: string }>(
    '/article/getMyArticle',
    {
      page,
      pageSize
    }
  );
}

/**
 * 获取个人文章列表
 * @param page 当前页
 * @param pageSize 页码大小
 * @returns
 */
export async function deleteMyArticle(id: number): Promise<{
  code: number;
  message: string;
}> {
  return await http.post<{ code: number; message: string }>('/article/updateArticle', {
    id,
    is_deleted: 1
  });
}

/**
 * 获取举报列表
 * @param page 当前页
 * @param pageSize 页码大小
 * @returns
 */
export async function getRejectReasonList(id: number): Promise<{
  code: number;
  data: any[];
  message: string;
}> {
  return await http.post<{ code: number; data: any[]; message: string }>(
    '/article/getRejectReasonList',
    {
      id
    }
  );
}
