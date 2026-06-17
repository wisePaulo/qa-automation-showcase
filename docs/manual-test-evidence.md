# Manual Test Evidence Pack

Public-safe manual QA evidence examples for portfolio use.

These examples are intentionally fictional. They show how I structure test thinking without exposing employer code, private endpoints, customer records, screenshots, logs or internal product details.

## Keywords

Manual Testing, QA Analyst, Test Case Design, Test Scenarios, Regression Testing, Smoke Testing, Exploratory Testing, Bug Report, Defect Tracking, Jira, Xray, Evidence, Expected Result, Actual Result, Root Cause Analysis, Retest, API Testing, SQL Validation, Release Risk.

## Sample Manual Test Scenario

**Feature:** Public demo checkout  
**Goal:** Validate that a visitor can complete a checkout flow and receive a confirmation.  
**Type:** Smoke + regression candidate  
**Priority:** High  
**Environment:** Public demo environment  
**Data:** Fictional product and fictional user details

### Steps

1. Open the public demo storefront.
2. Search for an item named `automation kit`.
3. Add the first available item to the basket.
4. Confirm the basket summary.
5. Submit the demo checkout form.
6. Verify the confirmation state.

### Expected Result

- Basket total is visible and consistent.
- Checkout action completes without user-facing errors.
- Confirmation status is displayed.
- Evidence is attached: screenshot, timestamp, environment and notes.

### Actual Result

Pass in the public demo example.

### Evidence Notes

- Screenshot: `public-checkout-confirmation.png`
- Report: `manual-smoke-cycle.md`
- Risk note: checkout flows should remain in smoke/regression because they represent high-value user paths.

## Sample Bug Report

**Title:** Basket total does not update after quantity change  
**Severity:** Major  
**Priority:** High  
**Area:** Checkout / Basket  
**Type:** Functional defect  
**Detected by:** Manual exploratory test  
**Environment:** Public demo browser session

### Steps To Reproduce

1. Add one item to the basket.
2. Increase quantity from 1 to 2.
3. Observe item subtotal and basket total.

### Expected Result

The basket total should update immediately after quantity changes.

### Actual Result

The item subtotal updates, but the basket total remains unchanged until page refresh.

### Impact

Users may see inconsistent pricing before checkout. This can reduce trust and create support risk.

### Evidence

- Screenshot before quantity change.
- Screenshot after quantity change.
- Browser console status.
- Network request summary.

### Retest Notes

After fix, retest quantity increase, quantity decrease, item removal and checkout submission.

## How I Use Evidence

Good QA evidence should help the team move faster. I try to make every report clear enough that a developer can reproduce it, a product owner can understand risk, and QA can retest without guessing.

