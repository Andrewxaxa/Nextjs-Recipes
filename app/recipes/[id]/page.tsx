import { Metadata } from "next";
import { notFound } from "next/navigation";

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
  const { id } = await params;
  const recipe = await getRecipe(id);

  if (!recipe) {
    notFound();
  }

  return <RecipeDetails recipe={recipe} />;
};

export default RecipeDetailsPage;
