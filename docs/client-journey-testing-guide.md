# Capitec Loan Eligibility Simulator - Client Journey Testing Guide

**Document Version:** 1.0
**Last Updated:** February 2025
**Target Audience:** Recruiters, QA Testers, Stakeholders

---

## Table of Contents

1. [Test Environment Setup](#test-environment-setup)
2. [Test Case 1: Loan Rejected Application](#test-case-1-loan-rejected-application)
3. [Test Case 2: Loan Approved Application](#test-case-2-loan-approved-application)
4. [Validation Checkpoints](#validation-checkpoints)
5. [Common Issues & Troubleshooting](#common-issues--troubleshooting)
6. [Test Results Checklist](#test-results-checklist)

---

## Test Environment Setup

### Prerequisites

1. **Application Access:**
   - URL: `http://localhost:3000` (development) or staging URL when deployed
   - Browser: Google Chrome (recommended) or Firefox
   - Screen Resolution: 1920x1080 (desktop)

2. **Clear Browser Data:**
   - Open Developer Tools (F12)
   - Go to Application tab > Local Storage
   - Clear `loan-application-draft` entry
   - This ensures a fresh test run

3. **Browser DevTools Setup:**
   - Open Chrome DevTools (F12)
   - Navigate to Console tab to monitor for errors
   - Ensure no errors appear during testing

---

## Test Case 1: Loan Rejected Application

**Scenario:** User with low credit profile completes the form but is rejected due to eligibility criteria.

### User Profile
- **Name:** Test User - Low Credit
- **Age:** 28
- **Employment Status:** Employed
- **Employment Duration:** 6 months
- **Income Profile:** Low disposable income

### Step-by-Step Instructions

#### Step 1: Landing Page
1. Open the application URL in your browser
2. **Expected:** Homepage loads with "Check Your Loan Eligibility" card
3. Click "Start Application" button
4. **Expected:** Redirects to `http://localhost:3000/apply`

---

#### Step 2: Personal Information
**Fill in the following:**

| Field | Value | Notes |
|-------|-------|-------|
| Age | `28` | Must be between 18-65 |
| Employment Status | `Employed` | From dropdown |
| Employment Duration (months) | `6` | Just above minimum (3 months) |

**Validation:**
- Verify Age input accepts `28`
- Verify Employment Duration accepts `6`
- Click "Continue to Employment"
- **Expected:** No errors, moves to next step

---

#### Step 3: Employment Details
**Fill in the following:**

| Field | Value |
|-------|-------|
| Employer Name | `Small Startup Co.` |
| Job Title | `Junior Assistant` |
| Industry | `Retail` |

**Validation:**
- All fields populated
- Click "Continue to Financial Info"
- **Expected:** No errors, moves to next step

---

#### Step 4: Financial Information ⚠️ KEY STEP FOR REJECTION
**Fill in the following:**

| Field | Value | Critical Note |
|-------|-------|---------------|
| Monthly Income (after tax) | `7,500` | **Below R10,000 threshold** |
| Monthly Expenses | `6,000` | High expenses |
| Existing Monthly Debt | `1,500` | **Significant debt burden** |

**Expected Calculations:**
```
Disposable Income = 7,500 - 6,000 - 1,500 = R0
```
- **This will FAIL** the disposable income check (requires R1,000+)
- The "Estimated Disposable Income" box should show **R 0.00**

**Validation:**
- Verify all currency fields format correctly with "R" symbol
- Verify disposable income shows **R 0.00**
- Click "Continue to Loan Details"
- **Expected:** No errors, moves to next step

---

#### Step 5: Loan Details
**Fill in the following:**

| Field | Value |
|-------|-------|
| Requested Loan Amount | `50,000` |
| Loan Term (months) | `24` |
| Loan Purpose | `Debt Consolidation` |

**Quick Estimate Preview:**
- Loan Amount: R 50,000.00
- Term: 24 months
- Estimated Rate: 12.5%
- **Est. Monthly Payment:** ~R 2,365.37

**Validation:**
- Verify currency formatting (e.g., "50,000" not "50.00000")
- Verify monthly payment shows correctly (R 2,365.37)
- Click "Review & Submit"
- **Expected:** No errors, moves to review step

---

#### Step 6: Review & Submit
1. Review all entered data
2. Verify the following fields display correctly:
   - ✓ Age: 28
   - ✓ Employment Duration: 6 months
   - ✓ Monthly Income: R 7,500.00
   - ✓ Disposable Income: R 0.00
   - ✓ Loan Amount: R 50,000.00

3. Click "Submit Application" button

---

#### Step 7: Results Page - REJECTION ⛔
**Expected Behavior:**

1. **Loading Screen:**
   - Spinner animation displays
   - "Processing" header with bouncing dots
   - Duration: 2-3 seconds

2. **Results Display:**
   - **Decision:** `DECLINED` or `NOT ELIGIBLE` (red/orange indicator)
   - **Credit Score:** Shows a score below 500 (e.g., 420-480 range)
   - **Reason for Decline:** One or more of:
     - "Insufficient disposable income"
     - "Credit score below minimum threshold"
     - "Debt-to-income ratio too high"

3. **Recommendations Section:**
   - Should display improvement tips:
     - "Improve credit score by paying bills on time"
     - "Reduce monthly expenses"
     - "Reduce existing debt payments"
     - "Build longer employment history"

4. **Action Buttons:**
   - "Start New Application" → Clears form, returns to step 1
   - "Try Again" → Preserves data, allows edits

**Console Verification:**
- Open DevTools Console
- Verify NO red error messages
- Look for API success responses in Network tab (optional)

**✅ TEST CASE 1 COMPLETE** - Record results in checklist below

---

## Test Case 2: Loan Approved Application

**Scenario:** User with good credit profile completes the form and receives loan approval.

### User Profile
- **Name:** Test User - Good Credit
- **Age:** 35
- **Employment Status:** Employed
- **Employment Duration:** 48 months
- **Income Profile:** Strong disposable income

### Step-by-Step Instructions

#### Step 1: Landing Page
1. Open the application URL (or click "Start New Application" from previous test)
2. **Expected:** Homepage loads
3. Click "Start Application" button
4. **Expected:** Redirects to `http://localhost:3000/apply`

---

#### Step 2: Personal Information
**Fill in the following:**

| Field | Value | Notes |
|-------|-------|-------|
| Age | `35` | Prime age bracket (25-65) |
| Employment Status | `Employed` | Stable employment |
| Employment Duration (months) | `48` | 4 years - **Strong stability** |

**Validation:**
- Verify Age input accepts `35`
- Verify Employment Duration accepts `48`
- Click "Continue to Employment"
- **Expected:** No errors, moves to next step

---

#### Step 3: Employment Details
**Fill in the following:**

| Field | Value |
|-------|-------|
| Employer Name | `Established Corp Ltd.` |
| Job Title | `Senior Manager` |
| Industry | `Finance` |

**Validation:**
- All fields populated
- Click "Continue to Financial Info"
- **Expected:** No errors, moves to next step

---

#### Step 4: Financial Information ✅ KEY STEP FOR APPROVAL
**Fill in the following:**

| Field | Value | Critical Note |
|-------|-------|---------------|
| Monthly Income (after tax) | `35,000` | **Strong income** |
| Monthly Expenses | `12,000` | Reasonable expenses |
| Existing Monthly Debt | `3,000` | Low debt burden |

**Expected Calculations:**
```
Disposable Income = 35,000 - 12,000 - 3,000 = R20,000
```
- **This will PASS** the disposable income check (requires R1,000+)
- The "Estimated Disposable Income" box should show **R 20,000.00**

**Validation:**
- Verify all currency fields format correctly with "R" symbol
- Verify disposable income shows **R 20,000.00**
- Click "Continue to Loan Details"
- **Expected:** No errors, moves to next step

---

#### Step 5: Loan Details
**Fill in the following:**

| Field | Value |
|-------|-------|
| Requested Loan Amount | `100,000` |
| Loan Term (months) | `36` |
| Loan Purpose | `Home Improvement` |

**Quick Estimate Preview:**
- Loan Amount: R 100,000.00
- Term: 36 months
- Estimated Rate: 12.5%
- **Est. Monthly Payment:** ~R 3,342.14

**Validation:**
- Verify currency formatting (e.g., "100,000" shows as "100,000")
- Verify monthly payment shows correctly (R 3,342.14)
- Click "Review & Submit"
- **Expected:** No errors, moves to review step

---

#### Step 6: Review & Submit
1. Review all entered data
2. Verify the following fields display correctly:
   - ✓ Age: 35
   - ✓ Employment Duration: 48 months
   - ✓ Monthly Income: R 35,000.00
   - ✓ Disposable Income: R 20,000.00
   - ✓ Loan Amount: R 100,000.00

3. Click "Submit Application" button

---

#### Step 7: Results Page - APPROVAL ✅
**Expected Behavior:**

1. **Loading Screen:**
   - Spinner animation displays
   - "Processing" header with bouncing dots
   - Duration: 2-3 seconds

2. **Results Display:**
   - **Decision:** `APPROVED` (green indicator)
   - **Credit Score:** Shows a high score (e.g., 750-850 range)
   - **Maximum Approved Amount:** R 100,000.00 or higher
   - **Recommended Term:** 36 months
   - **Final Interest Rate:** Calculated rate (e.g., 11.75-13.5%)

3. **Loan Summary Card:**
   - Approved Amount: R 100,000.00
   - Monthly Installment: R 3,342.14
   - Total Repayment: R 120,317.04
   - Interest Rate: [calculated rate]%
   - Term: 36 months

4. **Payment Breakdown (Chart):**
   - Visual pie chart showing:
     - Principal portion
     - Interest portion
   - Verify chart renders correctly with proper proportions

5. **Amortization Section:**
   - Table shows month-by-month breakdown
   - Verify first and last month entries display:
     - Month 1: Principal R 2,249.30, Interest R 1,092.84, Balance R 97,750.70
     - Month 36: Principal R 3,306.48, Interest R 35.66, Balance R 0.00

6. **Affordability Analysis:**
   - Disposable Income: R 20,000.00
   - Monthly Payment: R 3,342.14
   - **Payment Ratio:** 16.7% (well below 30% threshold - Good!)

7. **Action Buttons:**
   - "Download Schedule (CSV)" → Downloads amortization schedule
   - "Start New Application" → Clears form, returns to step 1
   - "Share Results" → Opens share options (Email, Print, etc.)

**Test "Share by Email" Feature:**
1. Click "Share Results" button
2. Click "Email" option
3. Verify email body contains:
   - Loan Amount: "R 100,000.00" (correct SA formatting)
   - Monthly Payment: "R 3,342.14"
4. Verify NO formatting errors (e.g., no "50.00000")

**Console Verification:**
- Open DevTools Console
- Verify NO red error messages
- Look for API success responses in Network tab (optional)

**✅ TEST CASE 2 COMPLETE** - Record results in checklist below

---

## Validation Checkpoints

### Common Verifications for Both Tests

| Checkpoint | What to Verify | Pass/Fail |
|------------|----------------|-----------|
| **Homepage Navigation** | "Start Application" button opens form wizard | ☐ |
| **Progress Bar** | Shows correct step indicator (1/5, 2/5, etc.) | ☐ |
| **Back Button** | Allows navigation to previous steps | ☐ |
| **Auto-Save** | Refreshing browser retains entered data | ☐ |
| **Currency Formatting** | All monetary values show "R" with 2 decimals | ☐ |
| **Validation Errors** | Invalid fields show error messages | ☐ |
| **Loading Animation** | Spinner displays on submit | ☐ |
| **Results Page** | Loads without errors | ☐ |
| **Console Errors** | NO errors in DevTools Console | ☐ |
| **Responsive Design** | Try mobile view (phone icon in DevTools) | ☐ |

### Unique Verifications - Test 1 (Rejection)

| Checkpoint | What to Verify | Pass/Fail |
|------------|----------------|-----------|
| **Disposable Income** | Shows R 0.00 (below minimum R1,000) | ☐ |
| **Decision Display** | Shows DECLINED/NOT ELIGIBLE clearly | ☐ |
| **Rejection Reasons** | Lists valid reasons for decline | ☐ |
| **Recommendations** | Shows improvement tips | ☐ |
| **Try Again Button** | Allows editing previous data | ☐ |

### Unique Verifications - Test 2 (Approval)

| Checkpoint | What to Verify | Pass/Fail |
|------------|----------------|-----------|
| **Disposable Income** | Shows R 20,000.00 (above minimum R1,000) | ☐ |
| **Decision Display** | Shows APPROVED clearly (green) | ☐ |
| **Loan Summary** | Shows all calculated values correctly | ☐ |
| **Payment Chart** | Pie chart renders with correct data | ☐ |
| **Amortization Table** | Shows full monthly breakdown | ☐ |
| **Download CSV** | Successfully downloads schedule | ☐ |
| **Share Email** | Email body has correct currency formatting | ☐ |
| **Affordability Ratio** | Shows payment percentage < 30% | ☐ |

---

## Common Issues & Troubleshooting

### Issue 1: Currency Formatting Errors
**Symptom:** Loan amount shows "50.00000" instead of "50,000"
**Resolution:**
- This was FIXED in Sprint 13
- Should display "50,000" (South African number format)
- Contact developer if issue persists

### Issue 2: Results Page Blank/Loading
**Symptom:** Results page stays on loading screen or shows error
**Resolution:**
- Check DevTools Console for errors
- Verify localStorage hasn't been cleared during submission
- Check Network tab for API responses
- Refresh and try again

### Issue 3: Form Validation Not Working
**Symptom:** Can proceed with invalid data
**Resolution:**
- Verify real-time validation is enabled
- Check for JavaScript errors in Console
- Try different browser

### Issue 4: Progress Bar Not Updating
**Symptom:** Step indicator doesn't change
**Resolution:**
- Verify clicking "Continue" advances the step
- Check for console errors
- Refresh page to try again

### Issue 5: Monthly Payment Shows Wrong Value
**Symptom:** Quick estimate shows R 2.37 instead of R 2,365.37
**Resolution:**
- This was FIXED in Sprint 13
- Should show correct calculation
- Verify requested amount and term are entered correctly

---

## Test Results Checklist

### Test Execution Record

**Test Environment:**
- URL: `_______________________________________________________`
- Browser: `_____________________`
- Date: `_____________________`
- Tester: `_____________________`

---

#### Test Case 1: Loan Rejected

| Step | Pass | Fail | Notes |
|------|------|------|-------|
| 1 | ☐ | ☐ | | |
| 2: Personal Info | ☐ | ☐ | | |
| 3: Employment Details | ☐ | ☐ | | |
| 4: Financial Info | ☐ | ☐ | | |
| 5: Loan Details | ☐ | ☐ | | |
| 6: Review & Submit | ☐ | ☐ | | |
| 7: Results (Rejection) | ☐ | ☐ | | |
| **Overall Result** | ☐ | ☐ | | |

**Issues Found:**
```

```

---

#### Test Case 2: Loan Approved

| Step | Pass | Fail | Notes |
|------|------|------|-------|
| 1 | ☐ | ☐ | | |
| 2: Personal Info | ☐ | ☐ | | |
| 3: Employment Details | ☐ | ☐ | | |
| 4: Financial Info | ☐ | ☐ | | |
| 5: Loan Details | ☐ | ☐ | | |
| 6: Review & Submit | ☐ | ☐ | | |
| 7: Results (Approval) | ☐ | ☐ | | |
| **Overall Result** | ☐ | ☐ | | |

**Issues Found:**
```

```

---

### Final Assessment

**Bug Severity Scale:**
- 🔴 **Critical:** Blocks basic functionality, cannot proceed
- 🟠 **High:** Major feature broken or data loss
- 🟡 **Medium:** Minor issues, workaround available
- 🟢 **Low:** Cosmetic/UX issue, no functional impact

**Critical Bugs Reported:**
1. `___________________________________________________________`
2. `___________________________________________________________`

**High Priority Issues:**
1. `___________________________________________________________`
2. `___________________________________________________________`

**Medium/Low Priority Issues:**
1. `___________________________________________________________`
2. `___________________________________________________________`

**Overall Assessment:**
☐ **Application Ready for Production** - All critical tests pass
☐ **Needs Minor Fixes** - Minor issues found, ready after fixes
☐ **Needs Major Fixes** - Significant issues, requires development work
☐ **Not Ready** - Critical blockers found

**Recommendations:**
```

```

---

## Additional Notes

### What NOT to Test (External Constraints)

The following items require external resources and cannot be tested in the current environment:

1. **Firefox/Safari/Edge Browsers** - Requires browser installations
2. **iOS/Android Mobile Devices** - Requires hardware testing
3. **Production Lighthouse Audit** - Requires production server deployment
4. **Actual Credit Bureau Integration** - Uses mock data only (by design)
5. **Real Loan Disbursement** - This is a simulation/demo only

### Feedback for Development Team

When reporting issues, please include:
1. Screenshot of the issue
2. Steps to reproduce
3. Expected vs. actual behavior
4. Browser and version
5. Console error messages (if any)
6. Network tab responses (if API-related)

---

## Appendix: Keyboard Shortcuts

| Shortcut | Action |
|----------|--------|
| `Tab` | Move to next field |
| `Shift + Tab` | Move to previous field |
| `Enter` | Submit form (Submit button) |
| `Escape` | Cancel/close modals |
| `Ctrl/Cmd + Enter` | Submit/Continue |

---

**End of Testing Guide**

For questions or issues, please contact the development team or project lead.
