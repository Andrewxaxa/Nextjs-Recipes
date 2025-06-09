import { Metadata } from "next";
import { currentUser } from "@clerk/nextjs/server";

import { getUserRecipes } from "@/lib/recipes";
import RecipeList from "@/components/recipes/recipe-list";
import UserNotFound from "@/components/ui/user-not-found";

export const metadata: Metadata = {
  title: "My Recipes",
};

const MyRecipesPage: React.FC = async () => {
  const userObj = await currentUser();
  const userId = userObj?.id;

  if (!userId) {
    return <UserNotFound title="My recipes" />;
  }

  const recipes = await getUserRecipes(userId);

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6 text-center">Recipes</h1>
      <RecipeList recipes={recipes} redirectUrl="my-recipes" />
    </div>
  );
};

export default MyRecipesPage;
