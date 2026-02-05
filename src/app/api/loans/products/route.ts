import { successResponse } from '@/lib/utils/api';
import { MOCK_PRODUCTS } from '@/mocks/products';

/**
 * GET /api/loans/products
 * Get available loan products
 *
 * Internal mock data only - no external API calls
 */
export async function GET() {
  try {
    return successResponse({ products: MOCK_PRODUCTS });
  } catch {
    return Response.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// Method not allowed for POST
export async function POST() {
  return Response.json({ error: 'Method not allowed' }, { status: 405 });
}
