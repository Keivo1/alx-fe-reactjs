import { useNavigate } from "react-router-dom"
import { useRecipeStore } from "./recipeStore"




export default function DeleteRecipeButton({id}) {
    const navigate = useNavigate()
    const deleteRecipe = useRecipeStore((state)=>state.deleteRecipe)
    const recipes = useRecipeStore((state)=>state.recipes)
    const rescipe = recipes.find(recipe=>recipe.id===parseInt(id))
    
    
    const onDelete = () => {
        deleteRecipe(rescipe.id)
        if(location.pathname === "/" || location.pathname !== ""){
        navigate('/')
    }
    }
 
  return (
    <button className="" onClick={onDelete}>
      Delete
    </button>
  )
}
