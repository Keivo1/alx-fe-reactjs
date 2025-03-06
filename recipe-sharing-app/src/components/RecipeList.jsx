import { useRecipeStore } from "./recipeStore";
import { Link } from "react-router-dom";
import DeleteRecipeButton from "./DeleteRecipeButton";
import { FaHeart, FaRegHeart } from 'react-icons/fa';

const RecipeList = () => {
  const recipes = useRecipeStore((state) => state.recipes);
  const filteredRecipes = useRecipeStore((state) => state.filteredRecipes);
  const searchTerm = useRecipeStore((state) => state.searchTerm);
  const favorites = useRecipeStore((state) => state.favorites);
  const addFavorite = useRecipeStore((state) => state.addFavorite);
  const removeFavorite = useRecipeStore((state) => state.removeFavorite);

  const displayRecipes = searchTerm ? filteredRecipes : recipes;

  const toggleFavorite = (recipeId) => {
    if (favorites.includes(recipeId)) {
      removeFavorite(recipeId);
    } else {
      addFavorite(recipeId);
    }
  };

  return (
    <div className="container mx-auto px-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {displayRecipes.map((recipe) => (
          <div key={recipe.id} 
               className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-xl font-semibold text-gray-800">{recipe.title}</h3>
                <button 
                  onClick={() => toggleFavorite(recipe.id)}
                  className="text-red-500 hover:text-red-600 transition-colors duration-200"
                >
                  {favorites.includes(recipe.id) ? (
                    <FaHeart className="text-2xl" />
                  ) : (
                    <FaRegHeart className="text-2xl" />
                  )}
                </button>
              </div>
              
              <p className="text-gray-600 mb-4 line-clamp-3">{recipe.description}</p>
              
              <div className="flex justify-between items-center mt-4">
                <Link 
                  to={`/details/${recipe.id}`}
                  className="inline-block bg-blue-500 text-black px-4 py-2 rounded-md hover:bg-blue-600 transition-colors duration-200"
                >
                  Edit
                </Link>
                <DeleteRecipeButton id={recipe.id} />
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {displayRecipes.length === 0 && (
        <div className="text-center py-10">
          <p className="text-gray-500 text-lg">
            No recipes found{searchTerm ? ` matching "${searchTerm}"` : ''}.
          </p>
        </div>
      )}
    </div>
  );
};

export default RecipeList;
