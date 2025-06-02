import { getRecipe } from "@/lib/recipes";
import { Metadata } from "next";
import RecipeDetails from "@/components/recipes/Recipe";

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

  return <RecipeDetails recipe={recipe} />;
};

export default RecipeDetailsPage;
