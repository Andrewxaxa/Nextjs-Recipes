"use server";

import { IAddRecipePayload } from "@/interfaces/recipe.interface";
import { addRecipe } from "@/lib/recipes";
import { revalidatePath } from "next/cache";

export interface Errors {
  title?: string;
  description?: string;
  instructions?: string;
}

export interface FormState {
  errors: Errors;
  response?: string;
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
  const instructions: string[] = [];
  for (const [key, value] of formData.entries()) {
    if (
      key.startsWith("instruction-") &&
      typeof value === "string" &&
      value.trim() !== ""
    ) {
      instructions.push(value);
    }
  }

  const errors: Errors = {};
  let response = "";

  if (isInvalidText(title)) {
    errors.title = "Title is required";
  }

  if (isInvalidText(description)) {
    errors.description = "Description is required";
  }

  if (instructions.length === 0) {
    errors.instructions = "Add at least one instruction to the recipe";
  }

  if (Object.keys(errors).length > 0) {
    return { errors };
  }

  const payload: IAddRecipePayload = {
    title,
    description,
    instructions: instructions.map((text, idx) => ({
      step: idx,
      text,
    })),
  };

  response = await addRecipe(payload);
  console.log("response", response);

  revalidatePath("/recipes");
  return { errors, response };
};
