import { Metadata } from "next";
import { notFound } from "next/navigation";

import { getRecipe } from "@/lib/recipes";
import EditRecipe from "@/components/recipes/edit-recipe";

export const metadata: Metadata = {
  title: "Edit recipe",
};

type RecipeEditPageProps = {
  params: Promise<{ id: string }>;
};

const RecipeEditPage: React.FC<RecipeEditPageProps> = async ({ params }) => {
  const { id } = await params;
  const recipe = await getRecipe(id);

  if (!recipe) {
    notFound();
  }

  return <EditRecipe recipe={recipe} redirectUrl="my-recipes" />;
};

export default RecipeEditPage;
