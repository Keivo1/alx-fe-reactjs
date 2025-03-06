import { useRecipeStore } from "./recipeStore";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const RecipeDetails = () => {
  const [newTitle, setNewTitle] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const { id } = useParams();
  const navigate = useNavigate();

  const recipes = useRecipeStore((state) => state.recipes);
  const updateRecipe = useRecipeStore((state) => state.updateRecipe);
  const recipe = recipes.find((recipe) => recipe.id === parseInt(id));

  useEffect(() => {
    if (recipe) {
      setNewTitle(recipe.title);
      setNewDescription(recipe.description);
    }
  }, [recipe]);

  if (!recipe) {
    console.log("There is no recipe with this Id");
    return <div>Recipe not found</div>;
  }

  if (!recipe.title || !recipe.description) {
    console.log("Recipe details are not available");
    return <div>Recipe details are not available</div>;
  }

  const onSubmit = (event) => {
    event.preventDefault();
    updateRecipe({
      id : parseInt(id),
      title : newTitle,
      description: newDescription
    });
    alert("Your recipe has been updated");
    navigate("/");
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <input
          type="text"
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
          className="border border-white p-2 my-4 block w-full "
          placeholder="Title"
        />
        <textarea
          value={newDescription}
          onChange={(e) => setNewDescription(e.target.value)}
          className="border mb-4 border-white p-2 h-52 block w-full "
          placeholder="Description"
        />
        <button type="submit">Save changes</button>
      </form>
    </div>
  );
};

export default RecipeDetails;
