Feature: Add new recipe
  In order to populate recipe db
  As a restful_chef user
  I want to add a new recipe

  Scenario: Add new recipe
    Given I am on grid page
    When I add a new recipe
    Then I should see the new recipe on the grid
