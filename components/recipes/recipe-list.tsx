import { IRecipe } from "@/interfaces/recipe.interface";
import RecipeCard from "./recipe-card";
import Empty from "../ui/empty";

type RecipeListProps = {
  recipes: IRecipe[];
};

const RecipeList: React.FC<RecipeListProps> = ({ recipes }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    {recipes.length === 0 ? (
      <Empty message="No recipes found" />
    ) : (
      recipes.map((recipe) => <RecipeCard key={recipe.id} recipe={recipe} />)
    )}
  </div>
);

export default RecipeList;
