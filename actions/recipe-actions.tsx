"use server";

import { IAddRecipePayload } from "@/interfaces/recipe.interface";
import { addRecipe } from "@/lib/recipes";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export interface Errors {
  title?: string;
  description?: string;
}

export interface FormState {
  errors: Errors;
}

const isInvalidText = (text: string): boolean => {
  return !text || text.trim() === "";
};

export const createRecipe = async (
  prevState: FormState,
  formData: FormData,
) => {
  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  console.log("form data", formData);

  const errors: Errors = {};

  if (isInvalidText(title)) {
    errors.title = "Title is required";
  }

  if (isInvalidText(description)) {
    errors.description = "Description is required";
  }

  if (Object.keys(errors).length > 0) {
    return { errors };
  }

  const payload: IAddRecipePayload = { title, description };

  await addRecipe(payload);
  revalidatePath("/recipes");
  redirect("/recipes");
};
