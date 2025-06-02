"use client";

import { Input, Textarea } from "@heroui/input";
import { Form } from "@heroui/form";
import { createRecipe, FormState } from "@/actions/recipe-actions";
import { useActionState } from "react";
import Submit from "@/components/ui/submit";

const AddRecipe: React.FC = () => {
  const initialState: FormState = {
    errors: {},
  };

  const [state, formAction] = useActionState(createRecipe, initialState);

  return (
    <div className="flex items-center justify-center">
      <Form className="w-full max-w-xs" action={formAction}>
        <Input
          name="title"
          label="Title"
          isRequired
          errorMessage="Please enter a recipe title"
          labelPlacement="outside"
          placeholder="Recipe title"
        />
        {state.errors.title && (
          <span className="text-red-500 text-xs">{state.errors.title}</span>
        )}
        <Textarea
          className="max-w-xs"
          name="description"
          label="Description"
          isRequired
          errorMessage="Please enter a recipe description"
          labelPlacement="outside"
          placeholder="Recipe description"
        />
        {state.errors.description && (
          <span className="text-red-500 text-xs">
            {state.errors.description}
          </span>
        )}
        <Submit />
      </Form>
    </div>
  );
};

export default AddRecipe;
