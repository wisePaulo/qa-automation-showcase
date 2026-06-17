# Public Bug Report Example

This is a fictional, public-safe bug report. It is not based on a real company system.

## Summary

Basket total does not refresh after quantity update.

## Severity

Major

## Priority

High

## Preconditions

- Visitor is on a public demo storefront.
- Basket contains one item.

## Steps

1. Open the basket.
2. Change item quantity from `1` to `2`.
3. Observe item subtotal.
4. Observe basket total.

## Expected Result

Item subtotal and basket total update consistently after the quantity change.

## Actual Result

Item subtotal changes, but basket total stays with the previous amount until the page is refreshed.

## Evidence

- Screenshot before quantity change.
- Screenshot after quantity change.
- Browser console checked.
- Network call checked.

## Risk

Pricing inconsistency can reduce user trust and may create support or checkout risk.

## Retest Scope

- Increase quantity.
- Decrease quantity.
- Remove item.
- Add second item.
- Submit checkout after total update.

