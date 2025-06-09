import { createId } from "@paralleldrive/cuid2";
import sql from "better-sqlite3";

import {
  IAddRecipePayload,
  IInstruction,
  IRecipe,
  IUpdateRecipePayload,
} from "@/interfaces/recipe.interface";
const db = sql("app.db");

export const getRecipes = async (q = ""): Promise<IRecipe[]> => {
  await new Promise((resolve) => setTimeout(resolve, 2000));

  let recipes: IRecipe[];

  if (q.trim()) {
    recipes = db
      .prepare("SELECT * FROM recipes WHERE title LIKE ? OR description LIKE ?")
      .all(`%${q}%`, `%${q}%`) as IRecipe[];
  } else {
    recipes = db.prepare("SELECT * FROM recipes").all() as IRecipe[];
  }

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

export const getUserRecipes = async (userId: string): Promise<IRecipe[]> => {
  await new Promise((resolve) => setTimeout(resolve, 2000));

  const recipes = db
    .prepare("SELECT * FROM recipes WHERE userId = ?")
    .all(userId) as IRecipe[];

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
): Promise<string> => {
  await new Promise((resolve) => setTimeout(resolve, 2000));

  const { userId, title, description, instructions, image, imagePublicId } =
    payload;
  const id = createId();
  const createdAt = new Date().toISOString();
  const updatedAt = createdAt;

  db.prepare(
    `
      INSERT INTO recipes VALUES (
        @id,
        @userId,
        @title,
        @description,
        @image,
        @imagePublicId,
        @createdAt,
        @updatedAt
      );
    `,
  ).run({
    id,
    userId,
    title,
    description,
    image,
    imagePublicId,
    createdAt,
    updatedAt,
  });

  if (instructions && instructions.length > 0) {
    const insertInstruction = db.prepare(
      `
        INSERT INTO instructions VALUES (
          @id,
          @step,
          @text,
          @recipeId
        );
      `,
    );

    for (const instruction of instructions) {
      insertInstruction.run({
        id: createId(),
        step: instruction.step,
        text: instruction.text,
        recipeId: id,
      });
    }
  }

  return "New recipe added";
};

export const updateRecipe = async (
  payload: IUpdateRecipePayload,
): Promise<string> => {
  await new Promise((resolve) => setTimeout(resolve, 2000));

  const { id, title, description, image, imagePublicId, instructions } =
    payload;
  const updatedAt = new Date().toISOString();

  db.prepare(
    `
      UPDATE recipes
      SET title = @title,
          description = @description,
          image = @image,
          imagePublicId = @imagePublicId,
          updatedAt = @updatedAt
      WHERE id = @id;
    `,
  ).run({
    id,
    title,
    description,
    image,
    imagePublicId,
    updatedAt,
  });

  db.prepare(`DELETE FROM instructions WHERE recipeId = ?;`).run(id);

  if (instructions && instructions.length > 0) {
    const insertInstruction = db.prepare(
      `
        INSERT INTO instructions VALUES (
          @id,
          @step,
          @text,
          @recipeId
        );
      `,
    );

    for (const instruction of instructions) {
      insertInstruction.run({
        id: createId(),
        step: instruction.step,
        text: instruction.text,
        recipeId: id,
      });
    }
  }

  return "Recipe updated";
};

export const removeRecipe = async (id: string): Promise<string> => {
  await new Promise((resolve) => setTimeout(resolve, 2000));

  db.prepare("DELETE FROM instructions WHERE recipeId = ?;").run(id);

  db.prepare("DELETE FROM recipes WHERE id = ?;").run(id);

  return "Recipe deleted";
};

export const addFavorite = async (
  userId: string,
  recipeId: string,
): Promise<void> => {
  db.prepare(
    `INSERT OR IGNORE INTO favorites (userId, recipeId) VALUES (?, ?);`,
  ).run(userId, recipeId);
};

export const removeFavorite = async (
  userId: string,
  recipeId: string,
): Promise<void> => {
  db.prepare(`DELETE FROM favorites WHERE userId = ? and recipeId = ?;`).run(
    userId,
    recipeId,
  );
};

export const getFavoriteRecipes = async (
  userId: string,
): Promise<IRecipe[]> => {
  const recipes = db
    .prepare(
      `
      SELECT * from recipes
      INNER JOIN favorites ON recipes.id = favorites.recipeId
      WHERE favorites.userId = ?
    `,
    )
    .all(userId) as IRecipe[];

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

export const isFavorite = (userId: string, recipeId: string): boolean => {
  const row = db
    .prepare(`SELECT 1 FROM favorites WHERE userId = ? AND recipeId = ?`)
    .get(userId, recipeId);

  return !!row;
};
