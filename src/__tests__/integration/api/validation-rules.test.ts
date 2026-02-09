import { GET, POST } from '@/app/api/loans/validation-rules/route';

jest.mock('@/lib/utils/api', () => ({
  successResponse: jest.fn((data) => Response.json(data)),
  errorResponse: jest.fn((message, status) => Response.json({ error: message }, { status })),
}));

describe('/api/loans/validation-rules - GET', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('returns validation rules on success', async () => {
    const response = await GET();
    expect(response.status).toBe(200);

    const data = await response.json();
    expect(data).toHaveProperty('personalInfo');
    expect(data).toHaveProperty('financialInfo');
    expect(data).toHaveProperty('loanDetails');
  });

  it('returns 405 for POST requests', async () => {
    const response = await POST();
    expect(response.status).toBe(405);
  });
});
