"use client";

import { Input, Textarea } from "@heroui/input";
import { Form } from "@heroui/form";
import { useActionState, useEffect, useState } from "react";
import { Button } from "@heroui/button";
import { addToast } from "@heroui/toast";
import { useRouter } from "next/navigation";

import FormError from "../ui/form-error";
import ImagePicker from "../ui/image-picker";

import Submit from "@/components/ui/submit";
import { createRecipe, FormState } from "@/actions/recipe-actions";

const AddRecipe: React.FC = () => {
  const initialState: FormState = {
    errors: {},
    response: "",
  };

  const [state, formAction] = useActionState(createRecipe, initialState);

  const [instructions, setInstructions] = useState<string[]>([""]);
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
        title: "Recipe added successfully",
        color: "success",
      });
      router.push("/recipes");
    }
  }, [state]);

  return (
    <div className="flex items-center justify-center">
      <Form action={formAction} className="w-full max-w-xs">
        <Input
          isRequired
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
        <ImagePicker />
        <FormError error={state.errors.image} />
        <Submit />
      </Form>
    </div>
  );
};

export default AddRecipe;
