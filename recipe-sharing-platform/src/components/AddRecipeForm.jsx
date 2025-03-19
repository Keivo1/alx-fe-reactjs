import { useState } from "react";

const AddRecipeForm = ({ onAddRecipe }) => {
  const [title, setTitle] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [steps, setSteps] = useState("");
  const [errors, setErrors] = useState({});

  const validate = () => {
    let tempErrors = {};
    if (!title.trim()) tempErrors.title = "Title is required.";
    if (!ingredients.trim()) tempErrors.ingredients = "Ingredients are required.";
    if (!steps.trim()) tempErrors.steps = "Preparation steps are required.";

    const ingredientsArray = ingredients.split(",").map((item) => item.trim());
    if (ingredientsArray.length < 2) tempErrors.ingredients = "Please enter at least two ingredients.";

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    onAddRecipe({ title, ingredients: ingredients.split(","), steps });
    setTitle("");
    setIngredients("");
    setSteps("");
    setErrors({});
  };

  return (
    <div className="max-w-lg mx-auto bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-4">Add a New Recipe</h2>
      {Object.values(errors).map((error, index) => (
        <p key={index} className="text-red-500 text-sm mb-2">{error}</p>
      ))}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium">Recipe Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Enter recipe title"
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Ingredients (comma-separated)</label>
          <textarea
            value={ingredients}
            onChange={(e) => setIngredients(e.target.value)}
            className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="e.g., eggs, milk, flour"
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Preparation Steps</label>
          <textarea
            value={steps}
            onChange={(e) => setSteps(e.target.value)}
            className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Describe the preparation steps"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition"
        >
          Add Recipe
        </button>
      </form>
    </div>
  );
};

export default AddRecipeForm;