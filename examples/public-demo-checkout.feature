Feature: Public demo checkout
  Public-safe BDD sample for a fictional storefront.

  Background:
    Given the public demo catalog is available
    And the visitor starts with an empty basket

  Scenario: Complete a checkout with evidence
    When the visitor searches for "automation kit"
    And the visitor adds the first available item to the basket
    And the visitor confirms the basket summary
    And the visitor submits the demo checkout form
    Then the confirmation page should display a successful order status
    And the test evidence should include a screenshot and trace

