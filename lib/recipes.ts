import {
  IAddRecipePayload,
  IInstruction,
  IRecipe,
  IUpdateRecipePayload,
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
): Promise<string> => {
  await new Promise((resolve) => setTimeout(resolve, 2000));

  const { title, description, instructions, image, imagePublicId } = payload;
  const id = createId();
  const createdAt = new Date().toISOString();
  const updatedAt = createdAt;

  db.prepare(
    `
      INSERT INTO recipes VALUES (
        @id,
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
