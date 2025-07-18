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
  image: string;
  imagePublicId: string;
  instructions: IInstruction[];
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IAddRecipePayload {
  userId: string;
  title: string;
  description: string;
  image: string;
  imagePublicId: string;
  instructions: IAddInstructionPayload[];
}

export interface IAddInstructionPayload {
  step: number;
  text: string;
}

export interface IUpdateRecipePayload {
  id: string;
  title: string;
  description: string;
  image: string;
  imagePublicId: string;
  instructions: IAddInstructionPayload[];
}
