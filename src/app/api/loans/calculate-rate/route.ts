import { NextRequest } from 'next/server';
import { calculateRateSchema } from '@/lib/validation/schemas';
import { successResponse, errorResponse } from '@/lib/utils/api';
import { createMockCalculateRateResponse } from '@/mocks/factories';
import { withRateLimit } from '@/lib/middleware/rate-limit';

/**
 * POST /api/loans/calculate-rate
 * Calculate loan interest rate and payment schedule
 *
 * Internal mock only - no external credit bureau calls
 */
export async function POST(request: NextRequest) {
  // Check rate limit
  const rateLimitResponse = withRateLimit(request);
  if (rateLimitResponse) {
    return rateLimitResponse;
  }

  try {
    // Parse request body
    const body = await request.json();

    // Validate request body
    const validationResult = calculateRateSchema.safeParse(body);
    if (!validationResult.success) {
      return errorResponse('Invalid request body', 400, validationResult.error.issues);
    }

    // Generate mock rate calculation response
    // TODO: Replace with actual rate calculation from loan products
    const rateResponse = createMockCalculateRateResponse(
      validationResult.data.loanAmount,
      validationResult.data.loanTerm,
      validationResult.data.creditScore
    );

    return successResponse(rateResponse);
  } catch (error) {
    console.error('Calculate rate error:', error);
    return errorResponse('Internal server error', 500);
  }
}

// Method not allowed for GET
export async function GET() {
  return errorResponse('Method not allowed', 405);
}
