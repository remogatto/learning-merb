Feature: Add new recipe
  In order to populate recipe db
  As a restful_chef user
  I want to add a new recipe

  Scenario: Add new recipe
    Given I am on grid page
    When I click on New button
    Then I should see an empty form
