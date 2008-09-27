require File.join(File.dirname(__FILE__), '..', 'spec_helper.rb')

describe Recipes  do

  before do
    @recipe = mock('recipe', :valid? => true)
    @property = mock('property')
    @property.stub!(:name).and_return(:id, :name, :level)
    Recipe.stub!(:properties).and_return([@property, @property, @property])
  end

  describe 'index action' do

    before do
      @recipe.stub!(:length)
      Recipe.stub!(:all).and_return([@recipe])
    end

    it 'should fetch all recipes' do
      Recipe.should_receive(:all).and_return([@recipe])
      dispatch_to(Recipes, :index) do |controller|
        controller.stub!(:display)
      end
    end

    it 'should display all recipes' do
      dispatch_to(Recipes, :index) do |controller|
        controller.should_receive(:display)
      end
    end

  end

  describe 'create action' do

    before do
      @recipe.stub!(:save)
      Recipe.stub!(:new).and_return(@recipe)
    end

    it 'should create a new record' do
      @recipe = mock('recipe', :save => nil)
      Recipe.should_receive(:new).with('name' => 'New recipe', 'level' => 'medium').and_return(@recipe)
      dispatch_to(Recipes, :create, :name => 'New recipe', :level => 'medium') do |controller|
        controller.stub!(:display)
      end
    end

    it 'should respond with success' do
      dispatch_to(Recipes, :create) do |controller|
        controller.should_receive(:display).with(:success => true)
      end
    end

  end

  describe 'update action' do

    it 'should update the given record' do
      Recipe.should_receive(:get!).with('1').and_return(@recipe)
      @recipe.should_receive(:update_attributes).with('name' => 'updated name')
      dispatch_to(Recipes, :update, :id => '1', :name => 'updated name') do |controller|
        controller.stub!(:display)
      end
    end

    it 'should return a json object as response on success' do
      Recipe.should_receive(:get!).with('1').and_return(@recipe)
      @recipe.should_receive(:update_attributes).with('name' => 'updated name')
      dispatch_to(Recipes, :update, :id => '1', :name => 'updated name', :format => :json).body.should == { 
        :success => true 
      }.to_json
    end

    it 'should return a json object as response on error' do
      Recipe.should_receive(:get!).with('1').and_return(@recipe)
      @recipe.stub!(:update_attributes)
      @recipe.stub!(:valid?).and_return(false)
      @recipe.stub!(:errors).and_return({:name => ['error msg']})
      dispatch_to(Recipes, :update, :id => '1', :format => :json).body.should == { 
        :success => false, :errors => [{:id => 'name', :msg => ['error msg']}] 
      }.to_json
    end

  end

  describe 'delete action' do

    it 'should delete the given record' do
      Recipe.should_receive(:get!).with('1').and_return(@recipe)
      @recipe.should_receive(:destroy)
      dispatch_to(Recipes, :delete, :id => '1') do |controller|
        controller.stub!(:display)
      end
    end

  end

end
