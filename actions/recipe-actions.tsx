"use server";

import { revalidatePath } from "next/cache";

import {
  IAddRecipePayload,
  IUpdateRecipePayload,
} from "@/interfaces/recipe.interface";
import { deleteImage, uploadImage } from "@/lib/cloudinary";
import { addRecipe, removeRecipe, updateRecipe } from "@/lib/recipes";

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
  let imagePublicId;

  try {
    const { url, publicId } = await uploadImage(image);

    imageUrl = url;
    imagePublicId = publicId;
  } catch (error) {
    throw new Error(`Image upload failed: ${error}`);
  }

  const payload: IAddRecipePayload = {
    title,
    description,
    image: imageUrl,
    imagePublicId,
    instructions: instructions.map((text, idx) => ({
      step: idx,
      text,
    })),
  };

  try {
    response = await addRecipe(payload);
  } catch (error) {
    throw new Error(`Adding recipe failed: ${error}`);
  }

  revalidatePath("/recipes");

  return { errors, response };
};

export const editRecipe = async (prevState: FormState, formData: FormData) => {
  const id = formData.get("id") as string;
  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  const image = formData.get("image") as File;
  const currentImage = formData.get("currentImage") as string;
  const currentImagePublicId = formData.get("currentImagePublicId") as string;
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

  let imageUrl = currentImage;
  let imagePublicId = currentImagePublicId;

  if (image && image instanceof File && image.size > 0) {
    try {
      if (currentImagePublicId) {
        await deleteImage(currentImagePublicId);
      }
      const { url, publicId } = await uploadImage(image);

      imageUrl = url;
      imagePublicId = publicId;
    } catch (error) {
      throw new Error(`Image upload failed: ${error}`);
    }
  }

  const payload: IUpdateRecipePayload = {
    id,
    title,
    description,
    image: imageUrl,
    imagePublicId,
    instructions: instructions.map((text, idx) => ({
      step: idx,
      text,
    })),
  };

  try {
    response = await updateRecipe(payload);
  } catch (error) {
    throw new Error(`Recipe edit failed: ${error}`);
  }

  revalidatePath(`/recipes/${id}`);

  return { errors, response };
};

export const deleteRecipe = async (id: string) => {
  let response = "";

  try {
    response = await removeRecipe(id);
  } catch (error) {
    throw new Error(`Recipe deletion failed: ${error}`);
  }

  revalidatePath("/recipes");

  return response;
};
