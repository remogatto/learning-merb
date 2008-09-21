class Recipe
  include DataMapper::Resource

  property :id, Integer, :serial => true
  property :name, String
  property :level, String

  has n, :ingredients
end
