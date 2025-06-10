import { Metadata } from "next";
import { notFound } from "next/navigation";
import { currentUser } from "@clerk/nextjs/server";

import { getRecipe, isFavorite } from "@/lib/recipes";
import RecipeDetails from "@/components/recipes/recipe-details";

export const metadata: Metadata = {
  title: "Recipe details",
};

type RecipeDetailsPageProps = {
  params: Promise<{ id: string }>;
};

const RecipeDetailsPage: React.FC<RecipeDetailsPageProps> = async ({
  params,
}) => {
  const userObj = await currentUser();
  const { id: recipeId } = await params;
  const recipe = await getRecipe(recipeId);

  if (!recipe) {
    notFound();
  }

  let isFav = false;

  if (userObj?.id) {
    isFav = await isFavorite(userObj?.id, recipe.id);
  }

  return (
    <RecipeDetails
      isFav={isFav}
      recipe={recipe}
      redirectUrl="my-recipes"
      userId={userObj?.id}
    />
  );
};

export default RecipeDetailsPage;
