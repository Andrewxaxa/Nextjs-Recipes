import { getRecipes } from "@/lib/recipes";
import { Metadata } from "next";
import RecipeList from "@/components/recipes/recipe-list";

export const metadata: Metadata = {
  title: "Recipes list",
};

const RecipesPage: React.FC = async () => {
  const recipes = await getRecipes();

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6 text-center">Recipes</h1>
      <RecipeList recipes={recipes} />
    </div>
  );
};

export default RecipesPage;
