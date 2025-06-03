"use server";

import { IAddRecipePayload } from "@/interfaces/recipe.interface";
import { uploadImage } from "@/lib/cloudinary";
import { addRecipe } from "@/lib/recipes";
import { revalidatePath } from "next/cache";

export interface Errors {
  title?: string;
  description?: string;
  instructions?: string;
  image?: string;
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
  const image = formData.get("image") as File;
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

  if (!image || !(image instanceof File) || image.size === 0) {
    errors.image = "Image is required";
  }

  if (instructions.length === 0) {
    errors.instructions = "Add at least one instruction to the recipe";
  }

  if (Object.keys(errors).length > 0) {
    return { errors };
  }

  let imageUrl;

  try {
    imageUrl = await uploadImage(image);
  } catch (error) {
    throw new Error("Image upload failed");
  }

  const payload: IAddRecipePayload = {
    title,
    description,
    image: imageUrl,
    instructions: instructions.map((text, idx) => ({
      step: idx,
      text,
    })),
  };

  response = await addRecipe(payload);

  revalidatePath("/recipes");
  return { errors, response };
};
