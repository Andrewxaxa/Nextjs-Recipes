import { Metadata } from "next";
import { notFound } from "next/navigation";
import { currentUser } from "@clerk/nextjs/server";

import { getRecipe } from "@/lib/recipes";
import RecipeDetails from "@/components/recipes/recipe";

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

  return (
    <RecipeDetails
      recipe={recipe}
      redirectUrl="my-recipes"
      userId={userObj?.id}
    />
  );
};

export default RecipeDetailsPage;
