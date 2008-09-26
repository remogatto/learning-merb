class Recipes < Application

  provides :json

  def index
    display Recipe.all
  end

  def create
    Recipe.new(get_params).save
    display :success => true  
  end

  def update
    @recipe = Recipe.get!(params[:id])
    @recipe.update_attributes(get_params)
    if @recipe.valid?
      display :success => true
    else      
      display({ :success => false, :errors => [{ :id => 'name', :msg => 'nome ricetta non valido' }] })
    end
  end

  def delete
    Recipe.get!(params[:id]).destroy
    display :success => true
  end

  private

  # Fetch all params that are related with model properties except the id.
  def get_params
    params.dup.delete_if do |key, value|
      key == 'id' or not Recipe.properties.collect { |prop| prop.name }.include?(key.to_sym)
    end
  end

end
