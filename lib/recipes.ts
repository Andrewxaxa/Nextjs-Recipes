import { MessageResponse } from "@/interfaces/message.interface";
import {
  IAddRecipePayload,
  IInstruction,
  IRecipe,
} from "@/interfaces/recipe.interface";
import { createId } from "@paralleldrive/cuid2";
import sql from "better-sqlite3";
const db = sql("app.db");

export const getRecipes = async (): Promise<IRecipe[]> => {
  await new Promise((resolve) => setTimeout(resolve, 2000));

  const recipes = db.prepare("SELECT * FROM recipes ").all() as IRecipe[];

  for (const recipe of recipes) {
    const instructions = db
      .prepare(
        "SELECT * FROM instructions WHERE recipeId = ? ORDER BY step ASC",
      )
      .all(recipe.id) as IInstruction[];
    recipe.instructions = instructions;
  }

  return recipes;
};

export const getRecipe = async (id: string): Promise<IRecipe> => {
  await new Promise((resolve) => setTimeout(resolve, 2000));

  const recipe = db
    .prepare("SELECT * FROM recipes WHERE id = ?")
    .get(id) as IRecipe;

  const instructions = db
    .prepare("SELECT * FROM instructions WHERE recipeId = ? ORDER BY step ASC")
    .all(id) as IInstruction[];

  recipe.instructions = instructions;

  return recipe;
};

export const addRecipe = async (
  payload: IAddRecipePayload,
): Promise<MessageResponse> => {
  await new Promise((resolve) => setTimeout(resolve, 2000));

  const { title, description } = payload;
  const id = createId();
  const createdAt = new Date().toISOString();
  const updatedAt = createdAt;

  db.prepare(
    `
      INSERT INTO recipes VALUES (
        @id,
        @title,
        @description,
        @createdAt,
        @updatedAt
      );
    `,
  ).run({ id, title, description, createdAt, updatedAt });

  return { message: "New recipe added" };
};
