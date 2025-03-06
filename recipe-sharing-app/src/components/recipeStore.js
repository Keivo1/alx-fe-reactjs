import { create } from "zustand";

export const useRecipeStore = create((set) => ({
  recipes: [],
  searchTerm: '',
  favorites: [],
  recommendations: [],
  setSearchTerm: (term) => set((state) => {
    const filtered = state.recipes.filter(recipe => 
      recipe.title.toLowerCase().includes(term.toLowerCase())
    );
    return { 
      searchTerm: term,
      filteredRecipes: filtered 
    };
  }),
  filteredRecipes: [],
  addRecipe: (newRecipe) =>
    set((state) => {
      const added = [...state.recipes, newRecipe];
      return { 
        recipes: added,
        filteredRecipes: added.filter(recipe => 
          recipe.title.toLowerCase().includes(state.searchTerm.toLowerCase())
        )
      };
    }),
  setRecipes: (recipes) => set({ recipes }),
  updateRecipe : (newRecipe) => set((state)=>{
    const index = state.recipes.findIndex(recipe => recipe.id === newRecipe?.id);
    if (index===-1){
       console.log("No available index")
    }
    console.log(index)
    const updatedRecipes = [...state.recipes];
    updatedRecipes[index] = newRecipe;
    console.log(updatedRecipes)
    return { recipes: updatedRecipes };
  }),
  deleteRecipe: (id) => set((state) => {{
    const eliminate = state.recipes.filter(recipe => recipe.id !== id)
   return { recipes: [...eliminate]}
  }}),
  addFavorite: (recipeId) => 
    set((state) => ({
      favorites: [...state.favorites, recipeId]
    })),
  removeFavorite: (recipeId) => 
    set((state) => ({
      favorites: state.favorites.filter(id => id !== recipeId)
    })),
  generateRecommendations: () => 
    set((state) => {
      const recommendedRecipes = state.recipes.filter(recipe => 
        !state.favorites.includes(recipe.id) && 
        state.favorites.some(favId => {
          const favRecipe = state.recipes.find(r => r.id === favId);
          return favRecipe && favRecipe.title.toLowerCase().includes(recipe.title.toLowerCase());
        })
      );
      return { recommendations: recommendedRecipes.slice(0, 3) };
    })
}));
