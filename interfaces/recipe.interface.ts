export interface IInstruction {
  id: string;
  step: number;
  text: string;
  recipeId: string;
}

export interface IRecipe {
  id: string;
  title: string;
  description: string;
  image?: string;
  instructions: IInstruction[];
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IAddRecipePayload {
  title: string;
  description: string;
  instructions: IAddInstructionPayload[];
}

export interface IAddInstructionPayload {
  step: number;
  text: string;
}

export interface IUpdateRecipePayload extends IAddRecipePayload {
  id: string;
}
