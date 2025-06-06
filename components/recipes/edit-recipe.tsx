"use client";

import { Input, Textarea } from "@heroui/input";
import { Form } from "@heroui/form";
import { editRecipe, FormState } from "@/actions/recipe-actions";
import { useActionState, useEffect, useState } from "react";
import { Button } from "@heroui/button";
import { addToast } from "@heroui/toast";
import { useRouter } from "next/navigation";
import { IRecipe } from "@/interfaces/recipe.interface";
import Submit from "@/components/ui/submit";
import FormError from "../ui/form-error";
import ImagePicker from "../ui/image-picker";

interface EditRecipeProps {
  recipe: IRecipe;
}

const EditRecipe: React.FC<EditRecipeProps> = ({ recipe }) => {
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
      router.push(`/recipes/${recipe.id}`);
    }
  }, [state]);

  return (
    <div className="flex items-center justify-center">
      <Form className="w-full max-w-xs" action={formAction}>
        <input type="hidden" name="id" value={recipe.id} />
        <input type="hidden" name="currentImage" value={recipe.image} />
        <input
          type="hidden"
          name="currentImagePublicId"
          value={recipe.imagePublicId}
        />
        <Input
          name="title"
          label="Title"
          isRequired
          errorMessage="Please enter a recipe title"
          labelPlacement="outside"
          placeholder="Recipe title"
          defaultValue={recipe.title}
        />
        <FormError error={state.errors.title} />
        <Textarea
          className="max-w-xs"
          name="description"
          label="Description"
          isRequired
          errorMessage="Please enter a recipe description"
          labelPlacement="outside"
          placeholder="Recipe description"
          defaultValue={recipe.description}
        />
        <FormError error={state.errors.description} />
        <div className="mb-4 w-full">
          <label className="block font-medium mb-1">Recipe steps</label>
          <FormError error={state.errors.instructions} />
          {instructions.map((text, idx) => (
            <div key={idx} className="mb-4">
              <Textarea
                className="flex-1 mb-2"
                name={`instruction-${idx}`}
                value={text}
                labelPlacement="outside"
                placeholder={`Step ${idx + 1}`}
                onChange={(e) => handleInstructionChange(idx, e.target.value)}
              />
              {instructions.length > 1 && (
                <Button
                  variant="bordered"
                  color="danger"
                  onPress={() => removeInstruction(idx)}
                >
                  - Remove
                </Button>
              )}
            </div>
          ))}
          <Button variant="bordered" color="secondary" onPress={addInstruction}>
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
