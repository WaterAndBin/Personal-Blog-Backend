import http from '~/server';
import type { ArticleListPagination } from '~/types/article';

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
