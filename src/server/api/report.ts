import http from '~/server';
import type { AuditArticleStatus } from '~/types/article';

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
    '/report/getRejectReasonList',
    {
      id
    }
  );
}

/**
 * 处理被举报数据
 * @param data article_id rejectType rejectReason
 * @returns
 */
export async function handleRejectReasonList(
  data: AuditArticleStatus
): Promise<{ code: number; data: any; message: string }> {
  return await http.post<{ code: number; data: any; message: string }>(
    '/report/handleRejectReasonList',
    {
      ...data
    }
  );
}
