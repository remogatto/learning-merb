require 'spec'
require 'selenium'

class Dashboard
  def initialize(browser)
    @browser = browser
  end
  
  def goto
    @browser.open 'http://localhost:4000/grid/'
  end
  
  def add_recipe(text)
    @browser.click 'new'
    @browser.type 'name', text
    @browser.click 'save'
    sleep(2) # FIXME: find a better way to handle wait for load
  end
end

Before do
  @browser = Selenium::SeleniumDriver.new("localhost", 4444, "*chrome", "http://localhost", 15000)
  @browser.start
end

After do
  @browser.stop
end

Given /^I am on grid page$/ do
  @page = Dashboard.new(@browser)
  @page.goto
end

When /^I add a (.*)$/ do |recipe|
  @page.add_recipe(recipe)
end

Then /^I should see the (.*) on the grid$/ do |recipe|
  @browser.get_text("//table//div[contains(@class, 'col-name')]").should match(/#{recipe}/)
end
