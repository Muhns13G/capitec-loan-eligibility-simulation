import { NextRequest } from 'next/server';
import { loanApplicationSchema } from '@/lib/validation/schemas';
import { successResponse, errorResponse } from '@/lib/utils/api';
import { createMockEligibilityResponse } from '@/mocks/factories';
import { withRateLimit } from '@/lib/middleware/rate-limit';

/**
 * POST /api/loans/eligibility
 * Check loan eligibility based on application data
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
    const validationResult = loanApplicationSchema.safeParse(body);
    if (!validationResult.success) {
      return errorResponse('Invalid request body', 400, validationResult.error.issues);
    }

    // Generate mock eligibility response
    // TODO: Replace with actual eligibility calculation logic
    const eligibilityResponse = createMockEligibilityResponse(validationResult.data);

    return successResponse(eligibilityResponse);
  } catch {
    return errorResponse('Internal server error', 500);
  }
}

// Method not allowed for GET
export async function GET() {
  return errorResponse('Method not allowed', 405);
}
