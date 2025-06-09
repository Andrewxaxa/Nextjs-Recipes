import { Metadata } from "next";
import { currentUser } from "@clerk/nextjs/server";

import { getFavoriteRecipes } from "@/lib/recipes";
import RecipeList from "@/components/recipes/recipe-list";

export const metadata: Metadata = {
  title: "Favorite recipes",
};

const FavoriteRecipesPage: React.FC = async () => {
  const userObj = await currentUser();
  const userId = userObj?.id;

  if (!userId) {
    return null;
  }

  const recipes = await getFavoriteRecipes(userId);

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6 text-center">Favorite recipes</h1>
      <RecipeList recipes={recipes} redirectUrl="recipes" />
    </div>
  );
};

export default FavoriteRecipesPage;
