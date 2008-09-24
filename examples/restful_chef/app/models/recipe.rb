class Recipe
  include DataMapper::Resource

  property :id, Integer, :serial => true
  property :name, String
  property :difficulty, Integer

  has n, :ingredients
end
