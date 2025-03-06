import { useRecipeStore } from "./recipeStore";
import { Link } from "react-router-dom";
import DeleteRecipeButton from "./DeleteRecipeButton";
import { FaHeart } from 'react-icons/fa';

const FavoritesList = () => {
  const recipes = useRecipeStore((state) => state.recipes);
  const favorites = useRecipeStore((state) => state.favorites);
  const removeFavorite = useRecipeStore((state) => state.removeFavorite);

  const favoriteRecipes = recipes.filter(recipe => 
    favorites.includes(recipe.id)
  );

  return (
    <div className="container mx-auto px-4">
      <h2 className="text-2xl font-bold mb-4">My Favorite Recipes</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {favoriteRecipes.map((recipe) => (
          <div key={recipe.id} 
               className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-xl font-semibold text-gray-800">
                  {recipe.title}
                </h3>
                <button 
                  onClick={() => removeFavorite(recipe.id)}
                  className="text-red-500 hover:text-red-600 transition-colors duration-200"
                >
                  <FaHeart />
                </button>
              </div>
              <p className="text-gray-600 mb-4">{recipe.description}</p>
              <div className="flex justify-between items-center">
                <Link 
                  to={`/details/${recipe.id}`}
                  className="text-blue-500 hover:text-blue-600"
                >
                  Edit
                </Link>
                <DeleteRecipeButton id={recipe.id} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FavoritesList; 