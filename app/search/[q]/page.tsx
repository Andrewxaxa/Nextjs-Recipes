import { Metadata } from "next";

import RecipeList from "@/components/recipes/recipe-list";
import { getRecipes } from "@/lib/recipes";

export const metadata: Metadata = {
  title: "Search recipes",
};

interface SearchProps {
  params: Promise<{ q: string }>;
}

const SearchPage: React.FC<SearchProps> = async ({ params }) => {
  const { q } = await params;
  const recipes = await getRecipes(q);

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6 text-center">
        Search for &quot;{q}&quot; recipes:
      </h1>
      <RecipeList recipes={recipes} redirectUrl="recipes" />
    </div>
  );
};

export default SearchPage;
