import { successResponse } from '@/lib/utils/api';
import { MOCK_VALIDATION_RULES } from '@/mocks/products';

/**
 * GET /api/loans/validation-rules
 * Get validation rules for form fields
 *
 * Internal mock data only - no external API calls
 */
export async function GET() {
  try {
    return successResponse(MOCK_VALIDATION_RULES);
  } catch {
    return Response.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// Method not allowed for POST
export async function POST() {
  return Response.json({ error: 'Method not allowed' }, { status: 405 });
}
