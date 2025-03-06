import AddRecipeForm from "./components/AddRecipeForm";
import RecipeList from "./components/RecipeList";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import RecipeDetails from "./components/EditRecipeForm";
import SearchBar from "./components/SearchBar";
import FavoritesList from "./components/FavoritesList";
import RecommendationsList from "./components/RecommendationsList";
const App = () => {
  return (
    <div className="app">
      <BrowserRouter>
        <SearchBar/>
        <h1>Recipe Book</h1>
        <Routes>
          <Route path="/" element={<AddRecipeForm />} />
          <Route path="/recommendations" element={<RecommendationsList />} />
          <Route path="/details/:id" element={<RecipeDetails />} />
          <Route path="/favorites" element={<FavoritesList />} />
        </Routes>
        <RecipeList />
      </BrowserRouter>
    </div>
  );
};

export default App;
