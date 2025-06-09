import Empty from "../ui/empty";

import RecipeCard from "./recipe-card";

import { IRecipe } from "@/interfaces/recipe.interface";

type RecipeListProps = {
  recipes: IRecipe[];
  redirectUrl: string;
};

const RecipeList: React.FC<RecipeListProps> = ({ recipes, redirectUrl }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    {recipes.length === 0 ? (
      <Empty message="No recipes found" />
    ) : (
      recipes.map((recipe) => (
        <RecipeCard key={recipe.id} recipe={recipe} redirectUrl={redirectUrl} />
      ))
    )}
  </div>
);

export default RecipeList;
