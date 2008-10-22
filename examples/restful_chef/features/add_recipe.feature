Feature: Add new recipe
  In order to populate recipe db
  As a restful_chef user
  I want to add a new recipe

  Scenario: Add new recipe
    Given I am on grid page
    And I click on New button
    And I put some text in recipe's name field
    When I click on Save button
    Then a new recipe should be created
