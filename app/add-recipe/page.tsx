import { Metadata } from "next";
import AddRecipe from "@/components/recipes/AddRecipe";

export const metadata: Metadata = {
  title: "Add recipe",
};

const AddRecipePage: React.FC = () => {
  return <AddRecipe />;
};

export default AddRecipePage;
