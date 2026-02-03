import type { ErrorResponse } from '@/types/loan';
import type { ZodSchema } from 'zod';

export function successResponse<T>(data: T, status = 200) {
  return Response.json({ success: true, data }, { status });
}

export function errorResponse(message: string, status = 400, details?: unknown) {
  const error: ErrorResponse = { error: message };
  if (details) {
    error.details = details as ErrorResponse['details'];
  }
  return Response.json(error, { status });
}

export function validateRequestBody<T>(schema: ZodSchema<T>, body: unknown): T | null {
  const result = schema.safeParse(body);
  if (!result.success) {
    return null;
  }
  return result.data;
}
