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
    @browser.type('q',text)   
    @browser.click 'btnG'
    @browser.wait_for_page_to_load
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

Given /^I click on New button$/ do
  @browser.click 'ext-gen24'
end

Given /^I put some text in recipe's name field$/ do
  @browser.type "ext-comp-1003", "testo"
end

When /^I click on Save button$/ do
  @browser.click 'save'
end

Then /^a new recipe should be created$/ do
  sleep(1)
  @browser.get_body_text.should match(/testo/)
end
