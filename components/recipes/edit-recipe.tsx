"use client";

import { Input, Textarea } from "@heroui/input";
import { Form } from "@heroui/form";
import { useActionState, useEffect, useState } from "react";
import { Button } from "@heroui/button";
import { addToast } from "@heroui/toast";
import { useRouter } from "next/navigation";

import FormError from "../ui/form-error";
import ImagePicker from "../ui/image-picker";

import { IRecipe } from "@/interfaces/recipe.interface";
import { editRecipe, FormState } from "@/actions/recipe-actions";
import Submit from "@/components/ui/submit";

interface EditRecipeProps {
  recipe: IRecipe;
  redirectUrl: string;
}

const EditRecipe: React.FC<EditRecipeProps> = ({ recipe, redirectUrl }) => {
  const initialState: FormState = {
    errors: {},
    response: "",
  };

  const initialInstructions = recipe.instructions.map(
    (instruction) => instruction.text,
  );

  const [state, formAction] = useActionState(editRecipe, initialState);

  const [instructions, setInstructions] =
    useState<string[]>(initialInstructions);
  const router = useRouter();

  const handleInstructionChange = (idx: number, value: string) => {
    const updated = [...instructions];

    updated[idx] = value;
    setInstructions(updated);
  };

  const addInstruction = () => setInstructions([...instructions, ""]);
  const removeInstruction = (idx: number) =>
    setInstructions(instructions.filter((_, i) => i !== idx));

  useEffect(() => {
    if (state?.response) {
      addToast({
        title: "Recipe edited successfully",
        color: "success",
      });
      router.push(`/${redirectUrl}/${recipe.id}`);
    }
  }, [state]);

  return (
    <div className="flex items-center justify-center">
      <Form action={formAction} className="w-full max-w-xs">
        <input name="id" type="hidden" value={recipe.id} />
        <input name="currentImage" type="hidden" value={recipe.image} />
        <input
          name="currentImagePublicId"
          type="hidden"
          value={recipe.imagePublicId}
        />
        <Input
          isRequired
          defaultValue={recipe.title}
          errorMessage="Please enter a recipe title"
          label="Title"
          labelPlacement="outside"
          name="title"
          placeholder="Recipe title"
        />
        <FormError error={state.errors.title} />
        <Textarea
          isRequired
          className="max-w-xs"
          defaultValue={recipe.description}
          errorMessage="Please enter a recipe description"
          label="Description"
          labelPlacement="outside"
          name="description"
          placeholder="Recipe description"
        />
        <FormError error={state.errors.description} />
        <div className="mb-4 w-full">
          <p className="block font-medium mb-1">Recipe steps</p>
          <FormError error={state.errors.instructions} />
          {instructions.map((text, idx) => (
            <div key={idx} className="mb-4">
              <Textarea
                className="flex-1 mb-2"
                labelPlacement="outside"
                name={`instruction-${idx}`}
                placeholder={`Step ${idx + 1}`}
                value={text}
                onChange={(e) => handleInstructionChange(idx, e.target.value)}
              />
              {instructions.length > 1 && (
                <Button
                  color="danger"
                  variant="bordered"
                  onPress={() => removeInstruction(idx)}
                >
                  - Remove
                </Button>
              )}
            </div>
          ))}
          <Button color="secondary" variant="bordered" onPress={addInstruction}>
            + Add instruction
          </Button>
        </div>
        <ImagePicker currentImageUrl={recipe.image} />
        <FormError error={state.errors.image} />
        <Submit />
      </Form>
    </div>
  );
};

export default EditRecipe;
