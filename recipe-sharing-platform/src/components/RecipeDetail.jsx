import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

const RecipeDetail = () => {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);

  useEffect(() => {
    fetch("/data.json")
      .then((response) => response.json())
      .then((data) => {
        const selectedRecipe = data.find((item) => item.id === parseInt(id));
        setRecipe(selectedRecipe);
      })
      .catch((error) => console.error("Error loading recipe details:", error));
  }, [id]);

  if (!recipe) {
    return <div className="text-center text-xl mt-10">Loading recipe...</div>;
  }

  return (
    <div className="container mx-auto p-6 flex flex-col items-center">
      <div className="bg-white rounded-lg shadow-lg p-6 max-w-3xl w-full">
        <img src={recipe.image} alt={recipe.title} className="w-full h-64 object-cover rounded-md" />
        <h1 className="text-4xl font-bold mt-4 text-center">{recipe.title}</h1>
        <p className="text-gray-700 mt-2 text-center">{recipe.summary}</p>
        <h2 className="text-2xl font-semibold mt-6 border-b pb-2">Ingredients</h2>
        <ul className="list-disc list-inside text-gray-600 mt-2 space-y-1">
          {recipe.ingredients?.map((ingredient, index) => (
            <li key={index} className="text-lg">{ingredient}</li>
          ))}
        </ul>
        <h2 className="text-2xl font-semibold mt-6 border-b pb-2">Instructions</h2>
        <p className="text-gray-600 mt-2 leading-relaxed">{recipe.instructions}</p>
        <div className="mt-6 text-center">
          <Link to="/" className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-lg">Back to Home</Link>
        </div>
      </div>
    </div>
  );
};

export default RecipeDetail;