import { getRecipe } from "@/lib/recipes";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import EditRecipe from "@/components/recipes/EditRecipe";

export const metadata: Metadata = {
  title: "Recipe details",
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

  return <EditRecipe recipe={recipe} />;
};

export default RecipeEditPage;
