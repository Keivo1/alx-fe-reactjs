import { useState } from 'react';
import { useRecipeStore } from './recipeStore';



const AddRecipeForm = () => {
  const addRecipe = useRecipeStore(state => state.addRecipe);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');


  const handleSubmit = (event) => {
    event.preventDefault();
    if( title.trim() === "" || description.trim() === ""){
      alert("Please enter a title and descriptionfor the recipe");
      return
     }
    addRecipe({ id: Date.now(), title, description });
    setTitle('');
    setDescription('');

  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className='border border-white p-2 my-4 block w-full '
        placeholder="Title"
      />
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className='border mb-4 border-white p-2 h-52 block w-full '
        placeholder="Description"
      />
      <button type="submit">Add Recipe</button>
    </form>
  );
};

export default AddRecipeForm;   