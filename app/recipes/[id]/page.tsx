import { getRecipe } from "@/lib/recipes";
import RecipeDetails from "@/components/recipes/Recipe";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Recipe details",
};

type RecipeDetailsPageProps = {
  params: { id: string };
};

const RecipeDetailsPage: React.FC<RecipeDetailsPageProps> = async ({
  params,
}) => {
  const { id } = await params;
  const recipe = await getRecipe(id);

  console.log("recipe", recipe);

  return <RecipeDetails recipe={recipe} />;
};

export default RecipeDetailsPage;
