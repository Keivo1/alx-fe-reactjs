import { useEffect } from 'react';
import { useRecipeStore } from './recipeStore';
import { Link } from "react-router-dom";
import { FaHeart } from 'react-icons/fa';

const RecommendationsList = () => {
  const { recommendations, generateRecommendations, removeFavorite } = useRecipeStore();

  useEffect(() => {
    generateRecommendations();
  }, [generateRecommendations]);

  if (recommendations.length === 0) {
    return (
      <div className="text-center py-10">
        <p className="text-gray-500 text-lg">
          No recommendations available. Try adding some favorites first!
        </p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4">
      <h2 className="text-2xl font-bold mb-4">Recommended Recipes</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {recommendations.map((recipe) => (
          <div 
            key={recipe.id} 
            className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
          >
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-xl font-semibold text-gray-800">
                  {recipe.title}
                </h3>
                <button 
                  onClick={() => removeFavorite(recipe.id)}
                  className="text-red-500 hover:text-red-600 transition-colors duration-200"
                >
                  <FaHeart className="text-2xl" />
                </button>
              </div>
              <p className="text-gray-600 mb-4 line-clamp-3">{recipe.description}</p>
              <div className="flex justify-between items-center">
                <Link 
                  to={`/details/${recipe.id}`}
                  className="text-blue-500 hover:text-blue-600"
                >
                  View Details
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecommendationsList; 