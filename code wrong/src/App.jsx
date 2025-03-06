import { useState } from 'react'
import RecipeList from './components/RecipeList'
import AddRecipeForm from './components/AddRecipeForm'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <RecipeList />
        <AddRecipeForm />
      </div>
    </>
  )
}

export default App
